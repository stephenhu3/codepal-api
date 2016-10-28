package com.codepal.api.resources;

import com.codepal.api.MainApplication;
import com.codepal.api.core.User;
import com.codepal.api.core.UserSearch;
import com.datastax.driver.core.*;
import com.datastax.driver.core.querybuilder.QueryBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import static com.datastax.driver.core.querybuilder.QueryBuilder.eq;

@Path("/users")
public class UserResource {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserResource.class);

    private static Cluster cluster = MainApplication.Cassandra.getCluster();
    private static Session session = MainApplication.Cassandra.getSession();

    public UserResource() {}

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public void createUser(User user) {
        String userId = user.getUserId();
        String username = user.getUsername();
        String accessToken = user.getAccessToken();
        String settings = user.getSettings();

        LOGGER.warn("userId:" + userId);
        LOGGER.warn("username:" + username);
        LOGGER.warn("accessToken:" + accessToken);
        LOGGER.warn("settings:" + settings);

        cluster = Cluster.builder().addContactPoint("localhost").build();
        session = cluster.connect("codepal");

        PreparedStatement statement = session.prepare(
                "INSERT INTO users (userId, accessToken, username, settings) VALUES (?,?,?,?);"
        );
        BoundStatement boundStatement = new BoundStatement(statement);
        session.execute(boundStatement.bind(userId, accessToken, username, settings));
        cluster.close();
    }

    @POST
    @Path("/search")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public UserSearch getUserId(UserSearch search) {
        String accessToken = search.getAccessToken();
        Statement select = QueryBuilder.select().all()
                .from("codepal", "users")
                .where(eq("accessToken", accessToken));
        ResultSet rs = session.execute(select);
        Row row = rs.one();
        cluster.close();
        return new UserSearch(row.getString("userId"), row.getString("accessToken"));
    }
}
