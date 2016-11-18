package com.codepal.api.core;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Objects;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserSearch)) {
            return false;
        }

        final UserSearch that = (UserSearch) o;

        return Objects.equals(this.accessToken, that.accessToken) &&
                Objects.equals(this.userId, that.userId) &&
                Objects.equals(this.settings, that.settings);
    }

    @Override
    public int hashCode() {
        return Objects.hash(accessToken, userId, settings);
    }
}
