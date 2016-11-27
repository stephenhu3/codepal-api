package com.codepal.api.resources;

import com.codepal.api.MainApplication;
import com.codepal.api.core.Snippet;
import com.codepal.api.core.SnippetSearch;
import com.datastax.driver.core.BoundStatement;
import com.datastax.driver.core.Cluster;
import com.datastax.driver.core.PreparedStatement;
import com.datastax.driver.core.ResultSet;
import com.datastax.driver.core.Row;
import com.datastax.driver.core.Session;
import com.datastax.driver.core.Statement;
import com.datastax.driver.core.querybuilder.QueryBuilder;
import com.datastax.driver.core.utils.UUIDs;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Timestamp;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;

import static com.datastax.driver.core.querybuilder.QueryBuilder.eq;
import static com.datastax.driver.core.querybuilder.QueryBuilder.set;

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
        UUID uuid = UUIDs.random();
        String userId = snippet.getUserId();
        String title = snippet.getTitle();
        String language = snippet.getLanguage();
        String content = snippet.getContent();
        Timestamp currentTime = new Timestamp(System.currentTimeMillis());
        boolean isPublic = snippet.isPublic();

        LOGGER.warn("uuid:" + uuid);
        LOGGER.warn("userId:" + userId);
        LOGGER.warn("title:" + title);
        LOGGER.warn("language:" + language);
        LOGGER.warn("content:" + content);
        LOGGER.warn("dateCreated:" + currentTime);
        LOGGER.warn("dateUpdated:" + currentTime);
        LOGGER.warn("isPublic:" + isPublic);

        PreparedStatement statement = session.prepare(
                "INSERT INTO snippets (uuid, userId, title, language, content, dateCreated,"
                        + "dateUpdated, isPublic) VALUES (?,?,?,?,?,?,?,?);"
        );

        BoundStatement boundStatement = new BoundStatement(statement);
        session.execute(boundStatement.bind(uuid, userId, title, language,
                content, currentTime, currentTime, isPublic));
        return new Snippet(uuid, userId, title, language,
                content, currentTime, currentTime, isPublic);
    }

    // Get a specific snippet's contents
    @POST
    @Path("/search")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Snippet searchSnippetByUuid(SnippetSearch search) throws ParseException {
        UUID uuid = search.getUuid();
        Statement select;
        if (uuid != null) {
            select = QueryBuilder.select().all()
                    .from(session.getLoggedKeyspace(), "snippets")
                    .where(eq("uuid", uuid));
        } else {
            throw new WebApplicationException(404);
        }
        ResultSet rs = session.execute(select);
        Row row = rs.one();

        return new Snippet(
            row.getUUID("uuid"),
            row.getString("userId"),
            row.getString("title"),
            row.getString("language"),
            row.getString("content"),
            row.getTimestamp("dateCreated"),
            row.getTimestamp("dateUpdated"),
            row.getBool("isPublic")
        );
    }

    // Get list of snippets by a particular user
    @POST
    @Path("/user")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public List<Snippet> searchSnippetByUserId(SnippetSearch search) throws ParseException {
        String userId = search.getUserId();
        Statement select;
        if (userId != null) {
            select = QueryBuilder.select().all()
                    .from(session.getLoggedKeyspace(), "snippets")
                    .where(eq("userId", userId));
        } else {
            throw new WebApplicationException(404);
        }
        ResultSet rs = session.execute(select);
        List<Row> rows = rs.all();
        List<Snippet> results = new ArrayList<>();
        for (Row row : rows) {
            Snippet snippet = new Snippet(
                    row.getUUID("uuid"),
                    row.getString("userId"),
                    row.getString("title"),
                    row.getString("language"),
                    row.getString("content"),
                    row.getTimestamp("dateCreated"),
                    row.getTimestamp("dateUpdated"),
                    row.getBool("isPublic")
            );
            results.add(snippet);
        }
        return results;
    }

    // Update an existing snippet
    @POST
    @Path("/update")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Snippet updateSnippet(@Valid Snippet update) {
        UUID uuid = update.getUuid();
        String userId = update.getUserId();
        String title = update.getTitle();
        String language = update.getLanguage();
        String content = update.getContent();
        Timestamp currentTime = new Timestamp(System.currentTimeMillis());
        boolean isPublic = update.isPublic();

        Statement updateStatement = QueryBuilder.update(session.getLoggedKeyspace(), "snippets")
                .with(set("title", title))
                .and(set("language", language))
                .and(set("content", content))
                .and(set("dateUpdated", currentTime))
                .and(set("isPublic", isPublic))
                .where(eq("uuid", uuid));
        session.execute(updateStatement);
        return new Snippet(uuid, userId, title, language, content, currentTime, isPublic);
    }
}
