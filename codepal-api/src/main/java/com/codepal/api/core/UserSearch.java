package com.codepal.api.core;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UserSearch {
    @JsonProperty
    private String accessToken;

    @JsonProperty
    private String userId;

    @JsonProperty
    private String settings;

    public UserSearch() {}

    public UserSearch(String accessToken, String userId, String settings) {
        this.accessToken = accessToken;
        this.userId = userId;
        this.settings = settings;
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

    public String getSettings() {
        return settings;
    }

    public void setSettings(String settings) {
        this.settings = settings;
    }
}
