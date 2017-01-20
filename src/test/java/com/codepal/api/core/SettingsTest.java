package com.codepal.api.core;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.dropwizard.jackson.Jackson;
import org.junit.Test;

import static io.dropwizard.testing.FixtureHelpers.fixture;
import static org.assertj.core.api.Assertions.assertThat;


public class SettingsTest {

    private static final ObjectMapper MAPPER = Jackson.newObjectMapper();

    @Test
    public void serializesToJSON() throws Exception {
        final Settings settings = new Settings(
            "{\"theme\": \"ace/theme/twilight\", \"mode\": \"ace/mode/html\"}",
            "11157691283201007"
        );

        final String expected = MAPPER.writeValueAsString(
                MAPPER.readValue(fixture("fixtures/settings.json"), Settings.class));

        assertThat(MAPPER.writeValueAsString(settings)).isEqualTo(expected);
    }

    @Test
    public void deserializesFromJSON() throws Exception {
        final Settings settings = new Settings(
            "{\"theme\": \"ace/theme/twilight\", \"mode\": \"ace/mode/html\"}",
            "11157691283201007"
        );
        assertThat(MAPPER.readValue(fixture("fixtures/settings.json"), Settings.class))
                .isEqualTo(settings);
    }
}
