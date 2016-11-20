package com.codepal.api.core;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Objects;

public class SnippetSearch {
    @JsonProperty
    private String uuid;

    @JsonProperty
    private String userId;

    public SnippetSearch() {}

    public SnippetSearch(String uuid, String userId) {
        this.uuid = uuid;
        this.userId = userId;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SnippetSearch)) {
            return false;
        }

        final SnippetSearch that = (SnippetSearch) o;

        return Objects.equals(this.uuid, that.uuid) &&
                Objects.equals(this.userId, that.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(uuid, userId);
    }
}
