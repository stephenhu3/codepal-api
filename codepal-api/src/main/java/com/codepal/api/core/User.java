package com.codepal.api.core;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.validator.constraints.NotEmpty;

public class User {
    @JsonProperty
    @NotEmpty
    private String userId;
    @JsonProperty
    @NotEmpty
    private String username;
    @JsonProperty
    @NotEmpty
    private String accessToken;
    @JsonProperty
    @NotEmpty
    private String settings;

    public User() {}

    public User(String userId, String username, String accessToken, String settings) {
        this.userId = userId;
        this.username = username;
        this.accessToken = accessToken;
        this.settings = settings;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getSettings() {
        return settings;
    }

    public void setSettings(String settings) {
        this.settings = settings;
    }
}
