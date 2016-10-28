package com.codepal.api.core;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Settings {
    @JsonProperty(required=true)
    private String settings;

    @JsonProperty
    private String userId;

    public Settings() {}

    public Settings(String settings, String userId) {
        this.settings = settings;
        this.userId = userId;
    }

    public String getSettings() {
        return settings;
    }

    public void setSettings(String settings) {
        this.settings = settings;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
