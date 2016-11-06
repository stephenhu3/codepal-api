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

import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import static com.datastax.driver.core.querybuilder.QueryBuilder.eq;

@Path("/users")
public class UserResource {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserResource.class);

    private static Cluster cluster = MainApplication.Cassandra.getCluster();
    private static Session session = MainApplication.Cassandra.getSession();

    public UserResource() {
    }

    public Cluster getCluster() {
        return cluster;
    }

    public Session getSession() {
        return session;
    }

    public static void setCluster(Cluster newCluster) {
        cluster = newCluster;
    }

    public static void setSession(Session newSession) {
        session = newSession;
    }

    // Creates a user (perform upon sign up)
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public User createUser(@Valid User user) {
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
        return new User(userId, username, accessToken, settings);
    }

    // Updates a user's access token (perform upon login)
    @POST
    @Path("/accesstokens") // note path is case-sensitive
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public AccessToken updateAccessToken(@Valid AccessToken token) {
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
        return new AccessToken(accessToken, userId);
    }

    // Updates a user's ace editor settings (perform when user updates their editor settings)
    @POST
    @Path("/settings")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Settings updateSettings(@Valid Settings setting) {
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
        return new Settings(settings, userId);
    }

    // Searches for user by access token (used for checking permissions)
    // or userId (used for determining login vs. sign up flow)
    @POST
    @Path("/search")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public UserSearch searchUser(UserSearch search) {
        String accessToken = search.getAccessToken();
        String userId = search.getUserId();
        Statement select;
        if (accessToken != null) {
            select = QueryBuilder.select().all()
                    .from(session.getLoggedKeyspace(), "users")
                    .where(eq("accessToken", accessToken));
        } else if (userId != null) {
            select = QueryBuilder.select().all()
                    .from(session.getLoggedKeyspace(), "users")
                    .where(eq("userId", userId));
        } else {
            throw new WebApplicationException(404);
        }
        ResultSet rs = session.execute(select);
        Row row = rs.one();
        return new UserSearch(row.getString("accessToken"),
                row.getString("userId"),
                row.getString("settings"));
    }
}
