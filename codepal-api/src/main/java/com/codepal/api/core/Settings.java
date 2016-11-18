package com.codepal.api.core;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.validator.constraints.NotEmpty;

import java.util.Objects;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Settings)) {
            return false;
        }

        final Settings that = (Settings) o;

        return Objects.equals(this.settings, that.settings) &&
                Objects.equals(this.userId, that.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(settings, userId);
    }
}
