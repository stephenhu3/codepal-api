package com.codepal.api.resources;

import com.codepal.api.core.Snippet;
import com.datastax.driver.core.ResultSet;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.cassandraunit.CassandraCQLUnit;
import org.cassandraunit.dataset.cql.ClassPathCQLDataSet;
import org.cassandraunit.utils.EmbeddedCassandraServerHelper;
import org.junit.BeforeClass;
import org.junit.ClassRule;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;

import java.io.IOException;

import io.dropwizard.jackson.Jackson;

import static io.dropwizard.testing.FixtureHelpers.fixture;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;

public class SnippetResourceTest {

    private static final ObjectMapper MAPPER = Jackson.newObjectMapper();
    private static SnippetResource snippetResource = new SnippetResource();

    @Rule
    public ExpectedException thrown = ExpectedException.none();

    @ClassRule
    public static CassandraCQLUnit cassandraCQLUnit = new CassandraCQLUnit(
            new ClassPathCQLDataSet("fixtures/setup-test-tables.cql", "codepal_test"),
            EmbeddedCassandraServerHelper.DEFAULT_CASSANDRA_YML_FILE, 100000L, 10000);

    @BeforeClass
    public static void setUp() throws Exception {
        snippetResource.setCluster(cassandraCQLUnit.getCluster());
        snippetResource.setSession(snippetResource.getCluster().connect("codepal_test"));
        verifyEmbeddedClusterPopulated();
    }

    public static void verifyEmbeddedClusterPopulated() throws Exception {
        ResultSet result = cassandraCQLUnit.session.execute("SELECT * FROM snippets WHERE uuid=8e803d9f-c1d2-41e0-af22-2e060d9bce6e");
        assertThat(result.iterator().next().getString("title"), is("helloworld.js"));
    }

    @Test
    public void createSnippetSuccess() throws IOException {
        Snippet request = MAPPER.readValue(
                fixture("fixtures/create-snippet-success-request.json"), Snippet.class);
        Snippet response = snippetResource.createSnippet(request);

        // check new snippet was created
        ResultSet result = cassandraCQLUnit.session.execute("SELECT * FROM snippets WHERE userId='01318170671172102'");
        assertThat(result.iterator().next().getString("title"), is("NewEntry.java"));
    }
}
