package com.codepal.api.resources;

import com.codepal.api.MainApplication;
import com.codepal.api.core.AccessToken;
import com.codepal.api.core.Settings;
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

    public UserResource() {
    }

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

        PreparedStatement statement = session.prepare(
                "INSERT INTO users (userId, accessToken, username, settings) VALUES (?,?,?,?);"
        );
        BoundStatement boundStatement = new BoundStatement(statement);
        session.execute(boundStatement.bind(userId, accessToken, username, settings));
    }

    @POST
    @Path("/accesstokens") // note path is case sensitive
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public void updateAccessToken(AccessToken token) {
        String accessToken = token.getAccessToken();
        String userId = token.getUserId();

        LOGGER.warn("accessToken:" + accessToken);
        LOGGER.warn("userId:" + userId);

        PreparedStatement statement = session.prepare(
                "UPDATE users SET accessToken = :accessToken WHERE userId = :userId;"
        );
        BoundStatement boundStatement = new BoundStatement(statement);
        session.execute(boundStatement.bind()
                .setString("accessToken", accessToken)
                .setString("userId", userId));
    }

    @POST
    @Path("/settings")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public void updateSettings(Settings setting) {
        String settings = setting.getSettings();
        String userId = setting.getUserId();

        LOGGER.warn("settings:" + settings);
        LOGGER.warn("userId:" + userId);

        PreparedStatement statement = session.prepare(
                "UPDATE users SET settings = :settings WHERE userId = :userId;"
        );
        BoundStatement boundStatement = new BoundStatement(statement);
        session.execute(boundStatement.bind()
                .setString("settings", settings)
                .setString("userId", userId));
    }

    // Return settings and userId
    @POST
    @Path("/search")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public UserSearch searchUser(AccessToken search) {
        String accessToken = search.getAccessToken();

        Statement select = QueryBuilder.select().all()
                .from("codepal", "users")
                .where(eq("accessToken", accessToken));
        ResultSet rs = session.execute(select);
        Row row = rs.one();
        return new UserSearch(row.getString("userId"),
                row.getString("accessToken"),
                row.getString("settings"));
    }
}
