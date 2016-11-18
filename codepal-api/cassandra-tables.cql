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



// snippets TBD
CREATE TABLE snippets (
	title text,
	content text,
	user_id	uuid,
	created_at timestamp 
);

