package com.codepal.api.resources;

import com.codepal.api.core.UserSearch;
import com.datastax.driver.core.ResultSet;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.dropwizard.jackson.Jackson;
import org.cassandraunit.CassandraCQLUnit;
import org.cassandraunit.dataset.cql.ClassPathCQLDataSet;
import org.cassandraunit.utils.EmbeddedCassandraServerHelper;
import org.junit.BeforeClass;
import org.junit.ClassRule;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;

import java.io.IOException;

import static io.dropwizard.testing.FixtureHelpers.fixture;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertTrue;

public class UserResourceTest {

    private static final ObjectMapper MAPPER = Jackson.newObjectMapper();
    private static UserResource userResource = new UserResource();

    @Rule
    public ExpectedException thrown = ExpectedException.none();

    @ClassRule
    public static CassandraCQLUnit cassandraCQLUnit = new CassandraCQLUnit(
            new ClassPathCQLDataSet("fixtures/setup-test-tables.cql","codepal_test"),
            EmbeddedCassandraServerHelper.DEFAULT_CASSANDRA_YML_FILE, 100000L, 10000);

    @BeforeClass
    public static void verifyEmbeddedClusterPopulated() throws Exception {
        ResultSet result = cassandraCQLUnit.session.execute("SELECT * FROM users WHERE userId='11157691283201007'");
        assertThat(result.iterator().next().getString("username"), is("TimeMuffin"));
    }

    @BeforeClass
    public static void setUp() {
        userResource.setCluster(cassandraCQLUnit.getCluster());
        userResource.setSession(userResource.getCluster().connect("codepal_test"));
    }

    @Test
    public void searchByAccessTokenSuccess() throws IOException {
        UserSearch searchByAccessToken = MAPPER.readValue(
                fixture("fixtures/search-by-access-token-success-request.json"), UserSearch.class);

        UserSearch actualResult = userResource.searchUser(searchByAccessToken);
        UserSearch expectedResult = MAPPER.readValue(
                fixture("fixtures/search-user-success-response.json"), UserSearch.class);

        assertTrue(actualResult.equals(expectedResult));
    }

    @Test
    public void searchByAccessTokenFail() throws IOException {
        UserSearch searchByAccessToken = MAPPER.readValue(fixture("fixtures/search-by-access-token-fail-request.json"),
                UserSearch.class);

        thrown.expect(NullPointerException.class);
        UserSearch actualResult = userResource.searchUser(searchByAccessToken);
    }

    @Test
    public void searchByUserIdSuccess() throws IOException {
        UserSearch searchByUserId = MAPPER.readValue(
                fixture("fixtures/search-by-userId-success-request.json"), UserSearch.class);

        UserSearch actualResult = userResource.searchUser(searchByUserId);
        UserSearch expectedResult = MAPPER.readValue(
                fixture("fixtures/search-user-success-response.json"), UserSearch.class);

        assertTrue(actualResult.equals(expectedResult));
    }

    @Test
    public void searchByUserIdFail() throws IOException {
        UserSearch searchByUserId = MAPPER.readValue(fixture("fixtures/search-by-userId-fail-request.json"),
                UserSearch.class);

        thrown.expect(NullPointerException.class);
        UserSearch actualResult = userResource.searchUser(searchByUserId);
    }
}
