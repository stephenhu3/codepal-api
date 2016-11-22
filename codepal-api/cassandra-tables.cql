CREATE KEYSPACE codepal WITH replication = {
  'class': 'SimpleStrategy',
  'replication_factor': '1'
};

CREATE TABLE users (
	userId text,
	accessToken text,
	username text,
	settings text,
	PRIMARY KEY (userId)
);
CREATE INDEX accessToken ON codepal.users (accessToken);

CREATE TABLE snippets (
    uuid uuid,
    userId text,
	title text,
    content text,
    dateCreated timestamp,
    dateUpdated timestamp,
    isPublic boolean,
    PRIMARY KEY (uuid)
);
CREATE INDEX userId ON codepal.snippets (userId);
