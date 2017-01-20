package com.codepal.api.core;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.Test;

import java.util.UUID;

import io.dropwizard.jackson.Jackson;

import static io.dropwizard.testing.FixtureHelpers.fixture;
import static org.assertj.core.api.Assertions.assertThat;


public class SnippetSearchTest {

    private static final ObjectMapper MAPPER = Jackson.newObjectMapper();


    @Test
    public void serializesToJSON() throws Exception {
        final SnippetSearch search = new SnippetSearch(
            UUID.fromString("f1e53d8d-ac3f-45c1-881f-2abb162d9e2c"),
            "01318170671172102"
        );

        final String expected = MAPPER.writeValueAsString(
                MAPPER.readValue(fixture("fixtures/snippetSearch.json"), SnippetSearch.class));

        assertThat(MAPPER.writeValueAsString(search)).isEqualTo(expected);
    }

    @Test
    public void deserializesFromJSON() throws Exception {
        final SnippetSearch search = new SnippetSearch(
                UUID.fromString("f1e53d8d-ac3f-45c1-881f-2abb162d9e2c"),
                "01318170671172102"
        );

        assertThat(MAPPER.readValue(fixture("fixtures/snippetSearch.json"), SnippetSearch.class))
                .isEqualTo(search);
    }
}
