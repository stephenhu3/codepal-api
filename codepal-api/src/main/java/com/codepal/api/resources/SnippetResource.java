package com.codepal.api.resources;

import com.codepal.api.MainApplication;
import com.codepal.api.core.Snippet;
import com.codepal.api.core.UserSearch;
import com.datastax.driver.core.BoundStatement;
import com.datastax.driver.core.Cluster;
import com.datastax.driver.core.PreparedStatement;
import com.datastax.driver.core.ResultSet;
import com.datastax.driver.core.Row;
import com.datastax.driver.core.Session;
import com.datastax.driver.core.Statement;
import com.datastax.driver.core.querybuilder.QueryBuilder;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;

import static com.datastax.driver.core.querybuilder.QueryBuilder.eq;

@Path("/snippets")
public class SnippetResource {
    private static final Logger LOGGER = LoggerFactory.getLogger(SnippetResource.class);

    private static Cluster cluster = MainApplication.Cassandra.getCluster();
    private static Session session = MainApplication.Cassandra.getSession();

    public SnippetResource() {
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

    // Create a new snippet
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Snippet createSnippet(@Valid Snippet snippet) {
        String uuid = snippet.getUuid();
        String userId = snippet.getUserId();
        String title = snippet.getTitle();
        String content = snippet.getContent();
        String dateCreated = snippet.getDateCreated();
        String dateUpdated = snippet.getDateUpdated();
        boolean isPublic = snippet.isPublic();

        LOGGER.warn("uuid:" + uuid);
        LOGGER.warn("userId:" + userId);
        LOGGER.warn("title:" + title);
        LOGGER.warn("content:" + content);
        LOGGER.warn("dateCreated:" + dateCreated);
        LOGGER.warn("dateUpdated:" + dateUpdated);
        LOGGER.warn("isPublic:" + isPublic);

        PreparedStatement statement = session.prepare(
                "INSERT INTO snippets (uuid, userId, title, content, dateCreated, dateUpdated,"
                        + "isPublic) VALUES (?,?,?,?);"
        );

        BoundStatement boundStatement = new BoundStatement(statement);
        session.execute(boundStatement.bind(uuid, userId, title, content, dateCreated, dateUpdated,
                isPublic));
        return new Snippet(uuid, userId, title, content, dateCreated, dateUpdated, isPublic);
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
