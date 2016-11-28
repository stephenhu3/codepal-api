package com.codepal.api.core;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.Test;

import java.sql.Timestamp;
import java.util.UUID;

import io.dropwizard.jackson.Jackson;

import static io.dropwizard.testing.FixtureHelpers.fixture;
import static org.assertj.core.api.Assertions.assertThat;


public class SnippetTest {

    private static final ObjectMapper MAPPER = Jackson.newObjectMapper();


    @Test
    public void serializesToJSON() throws Exception {
        final Snippet snippet = new Snippet(
            UUID.fromString("f1e53d8d-ac3f-45c1-881f-2abb162d9e2c"),
            "01318170671172102",
            "NewEntry.java",
            "java",
            "cHVibGljIGNsYXNzIEhlbGxvV29ybGQNCnsNCglwdWJsaWMgc3RhdGljIHZvaWQgbWFpbihTdHJpbmdbXS"
                    + "BhcmdzKSB7DQoJCVN5c3RlbS5vdXQucHJpbnRsbigiSGVsbG8gV29ybGQhIik7DQoJfQ0KfQ==",
            new Timestamp(1479936089835L),
            new Timestamp(1479936089835L),
            true
        );

        final String expected = MAPPER.writeValueAsString(
                MAPPER.readValue(fixture("fixtures/snippet.json"), Snippet.class));

        assertThat(MAPPER.writeValueAsString(snippet)).isEqualTo(expected);
    }

    @Test
    public void deserializesFromJSON() throws Exception {
        final Snippet snippet = new Snippet(
            UUID.fromString("f1e53d8d-ac3f-45c1-881f-2abb162d9e2c"),
            "01318170671172102",
            "NewEntry.java",
            "java",
            "cHVibGljIGNsYXNzIEhlbGxvV29ybGQNCnsNCglwdWJsaWMgc3RhdGljIHZvaWQgbWFpbihTdHJpbmdbXS"
                + "BhcmdzKSB7DQoJCVN5c3RlbS5vdXQucHJpbnRsbigiSGVsbG8gV29ybGQhIik7DQoJfQ0KfQ==",
            new Timestamp(1479936089835L),
            new Timestamp(1479936089835L),
            true
        );

        assertThat(MAPPER.readValue(fixture("fixtures/snippet.json"), Snippet.class))
                .isEqualTo(snippet);
    }
}
