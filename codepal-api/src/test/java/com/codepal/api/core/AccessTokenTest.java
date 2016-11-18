package com.codepal.api.core;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.dropwizard.jackson.Jackson;
import org.junit.Test;

import static io.dropwizard.testing.FixtureHelpers.fixture;
import static org.assertj.core.api.Assertions.assertThat;


public class AccessTokenTest {

    private static final ObjectMapper MAPPER = Jackson.newObjectMapper();

    @Test
    public void serializesToJSON() throws Exception {
        final AccessToken accessToken = new AccessToken(
                "EAAM0pjh1ZBZA8BALYylXbNQMlYECRyO2gomKNiK5pgKH2gad1m7Xkk" +
                        "wa7NfUsbQvTdx0y8WZBOMJ3fFcPj4iZCd2v1FX8wmHDgKbb" +
                        "ivypK8XZANrlIJXIkjjNDyVuMw9kjdjCwqrHzoeJDZCspiI" +
                        "8FMZC5a0GZBscvjVyZAHigAWPQAZDZD",
                "11157691283201007"
        );

        final String expected = MAPPER.writeValueAsString(
                MAPPER.readValue(fixture("fixtures/accessToken.json"), AccessToken.class));

        assertThat(MAPPER.writeValueAsString(accessToken)).isEqualTo(expected);
    }

    @Test
    public void deserializesFromJSON() throws Exception {
        final AccessToken accessToken = new AccessToken(
                "EAAM0pjh1ZBZA8BALYylXbNQMlYECRyO2gomKNiK5pgKH2gad1m7Xkk" +
                        "wa7NfUsbQvTdx0y8WZBOMJ3fFcPj4iZCd2v1FX8wmHDgKbb" +
                        "ivypK8XZANrlIJXIkjjNDyVuMw9kjdjCwqrHzoeJDZCspiI" +
                        "8FMZC5a0GZBscvjVyZAHigAWPQAZDZD",
                "11157691283201007"
        );
        assertThat(MAPPER.readValue(fixture("fixtures/accessToken.json"), AccessToken.class))
                .isEqualTo(accessToken);
    }
}
