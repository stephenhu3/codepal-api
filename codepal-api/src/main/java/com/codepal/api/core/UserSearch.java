package com.codepal.api.core;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UserSearch {
    @JsonProperty(required=true)
    private String accessToken;

    @JsonProperty
    private String userId;

    public UserSearch() {}

    public UserSearch(String accessToken, String userId) {
        this.accessToken = accessToken;
        this.userId = userId;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
