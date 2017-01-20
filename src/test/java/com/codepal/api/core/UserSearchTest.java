package com.codepal.api.core;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.dropwizard.jackson.Jackson;
import org.junit.Test;

import static io.dropwizard.testing.FixtureHelpers.fixture;
import static org.assertj.core.api.Assertions.assertThat;


public class UserSearchTest {

    private static final ObjectMapper MAPPER = Jackson.newObjectMapper();

    @Test
    public void serializesToJSON() throws Exception {
        final UserSearch search = new UserSearch(
                "EAAM0pjh1ZBZA8BALYylXbNQMlYECRyO2gomKNiK5pgKH2gad1m7Xkk" +
                        "wa7NfUsbQvTdx0y8WZBOMJ3fFcPj4iZCd2v1FX8wmHDgKbb" +
                        "ivypK8XZANrlIJXIkjjNDyVuMw9kjdjCwqrHzoeJDZCspiI" +
                        "8FMZC5a0GZBscvjVyZAHigAWPQAZDZD",
                "11157691283201007",
                "{\"theme\": \"ace/theme/twilight\", \"mode\": \"ace/mode/html\"}"
        );

        final String expected = MAPPER.writeValueAsString(
                MAPPER.readValue(fixture("fixtures/userSearch.json"), UserSearch.class));

        assertThat(MAPPER.writeValueAsString(search)).isEqualTo(expected);
    }

    @Test
    public void deserializesFromJSON() throws Exception {
        final UserSearch search = new UserSearch(
                "EAAM0pjh1ZBZA8BALYylXbNQMlYECRyO2gomKNiK5pgKH2gad1m7Xkk" +
                        "wa7NfUsbQvTdx0y8WZBOMJ3fFcPj4iZCd2v1FX8wmHDgKbb" +
                        "ivypK8XZANrlIJXIkjjNDyVuMw9kjdjCwqrHzoeJDZCspiI" +
                        "8FMZC5a0GZBscvjVyZAHigAWPQAZDZD",
                "11157691283201007",
                "{\"theme\": \"ace/theme/twilight\", \"mode\": \"ace/mode/html\"}"
        );
        assertThat(MAPPER.readValue(fixture("fixtures/userSearch.json"), UserSearch.class))
                .isEqualTo(search);
    }
}
