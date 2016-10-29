package com.codepal.api.core;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.validator.constraints.NotEmpty;

public class Settings {
    @JsonProperty
    @NotEmpty
    private String settings;

    @JsonProperty
    @NotEmpty
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
