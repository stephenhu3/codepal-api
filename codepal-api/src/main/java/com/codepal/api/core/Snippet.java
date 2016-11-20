package com.codepal.api.core;

import com.fasterxml.jackson.annotation.JsonProperty;

import org.hibernate.validator.constraints.NotEmpty;

import java.util.Date;
import java.util.Objects;
import java.util.UUID;

public class Snippet {
    @JsonProperty
    private UUID uuid;
    @JsonProperty
    @NotEmpty
    private String userId;
    @JsonProperty
    @NotEmpty
    private String title;
    @JsonProperty
    @NotEmpty
    private String content;
    @JsonProperty
    private Date dateCreated;
    @JsonProperty
    private Date dateUpdated;
    @JsonProperty
    private boolean isPublic;

    public Snippet() {}

    public Snippet(UUID uuid, String userId, String title, String content, Date dateCreated,
                   Date dateUpdated, boolean isPublic) {
        this.uuid = uuid;
        this.userId = userId;
        this.title = title;
        this.content = content;
        this.dateCreated = dateCreated;
        this.dateUpdated = dateUpdated;
        this.isPublic = isPublic;
    }

    public UUID getUuid() {
        return uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Date getDateUpdated() {
        return dateUpdated;
    }

    public void setDateUpdated(Date dateUpdated) {
        this.dateUpdated = dateUpdated;
    }

    @JsonProperty(value="isPublic")
    public boolean isPublic() {
        return isPublic;
    }

    @JsonProperty(value="isPublic")
    public void setPublic(boolean isPublic) {
        this.isPublic = isPublic;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Snippet)) {
            return false;
        }

        final Snippet that = (Snippet) o;

        return Objects.equals(this.uuid, that.uuid) &&
                Objects.equals(this.userId, that.userId) &&
                Objects.equals(this.title, that.title) &&
                Objects.equals(this.content, that.content) &&
                Objects.equals(this.dateCreated, that.dateCreated) &&
                Objects.equals(this.dateUpdated, that.dateUpdated) &&
                Objects.equals(this.isPublic, that.isPublic);
    }

    @Override
    public int hashCode() {
        return Objects.hash(uuid, userId, title, content, dateCreated, dateUpdated, isPublic);
    }
}
