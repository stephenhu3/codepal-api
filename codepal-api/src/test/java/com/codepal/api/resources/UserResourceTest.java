package com.codepal.api.resources;

import com.datastax.driver.core.ResultSet;
import org.cassandraunit.CassandraCQLUnit;
import org.cassandraunit.dataset.cql.ClassPathCQLDataSet;
import org.cassandraunit.utils.EmbeddedCassandraServerHelper;
import org.junit.Before;
import org.junit.Rule;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;

public class UserResourceTest {

    @Rule
    public CassandraCQLUnit cassandraCQLUnit = new CassandraCQLUnit(
            new ClassPathCQLDataSet("fixtures/setup-test-tables.cql","codepal_test"),
            EmbeddedCassandraServerHelper.DEFAULT_CASSANDRA_YML_FILE, 100000L, 10000);

    @Before
    public void verifyEmbeddedClusterPopulated() throws Exception {
        ResultSet result = cassandraCQLUnit.session.execute("SELECT * FROM users WHERE userId='11157691283201007'");
        assertThat(result.iterator().next().getString("username"), is("TimeMuffin"));
    }
}
