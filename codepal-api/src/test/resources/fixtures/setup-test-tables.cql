CREATE TABLE users (
	userId text,
	accessToken text,
	username text,
	settings text,
	PRIMARY KEY (userId)
);
CREATE INDEX accessToken ON codepal_test.users (accessToken);

INSERT INTO users (userId, accessToken, username, settings) VALUES ('11157191283201007', 'EAAM0pjh1ZBZA8BALYylXbNQMlYECRyO2gomKNiK5pgKH2gad1m7Xkkwa7NfUsbQvTdx0y8WZBOMJ3fFcPj4iZCd2v1FX8wmHDgKbbivypK8XZANrlIJXIkjjNDyVuMw9kjdjCwqrHzoeJDZCspiI8FMZC5a0GZBscvjVyZAHigAWPQAZDZD', 'TimeMuffin', '{\"theme\": \"ace/theme/twilight\", \"mode\": \"ace/mode/html\"}');
INSERT INTO users (userId, accessToken, username, settings) VALUES ('01318170671172102', 'FmvWKsQZAvX4CgJIZQbA7mlegyZKDKj1HJM8gZijDIkZjMihxCa0liHblaM8yVEXrFDDZpg2pzXdkNMCHZBByuXABT1HddUp02jg39wbX8AFk2yabwc1kWAoBNfZfNLG5sOjAqdPQ05vrYCOpKyyi8KM7vRNcjEDomZZjiVsJIANCww8PAYZ', 'CoffeeCat', '{\"theme\": \"ace/theme/monokai\", \"mode\": \"ace/mode/python\"}');
INSERT INTO users (userId, accessToken, username, settings) VALUES ('19168015020712713', '2pH1jZNZZQyIlavi1dkg0pZj0WDdQlAXNZwkfNFmuADbyXmoCbMCXcrOADJCK1ew2GvAjBvBj88KjMAjwOZAX5YiEbNZHj7iKmiFy8JsiCDwdyvM8bq9ZCPXZyfZs4hBI8HdMaBYAz7lJEQkHgrcVogpMKyI3KNA2p5kZWFDVxLaTPsggU0R', 'DonutCarl', '{\"theme\": \"ace/theme/sharp\", \"mode\": \"ace/mode/java\"}');

CREATE TABLE snippets (
    uuid uuid,
    userId text,
	title text,
	language text,
    content text,
    dateCreated timestamp,
    dateUpdated timestamp,
    isPublic boolean,
    PRIMARY KEY (uuid)
);
CREATE INDEX userId ON codepal_test.snippets (userId);

INSERT INTO snippets (uuid, userId, title, language, content, dateCreated, dateUpdated, isPublic) VALUES (8e803d9f-c1d2-41e0-af22-2e060d9bce6e, '19168015020712713', 'helloworld.js', 'javascript', 'Y29uc29sZS5sb2coImhlbGxvIHdvcmxkIik=', '1479615183863', '1479615183863', true);
INSERT INTO snippets (uuid, userId, title, language, content, dateCreated, dateUpdated, isPublic) VALUES (7cb73f17-90c5-454a-9e95-b7cb61ee3468, '19168015020712713', 'scramble.py', 'python', 'aW1wb3J0IHJhbmRvbQ0KDQpkZWYgc2NyYW1ibGUodGV4dCk6DQoJc2NyYW1ibGVkID0gIiINCgl3aGlsZSBsZW4odGV4dCkgPiAwOg0KCQlyYW5kb21JZHggPSByYW5kb20ucmFuZGludCgwLCBsZW4odGV4dCkgLSAxKQ0KCQlzY3JhbWJsZWQgKz0gIHRleHRbcmFuZG9tSWR4XQ0KCQl0ZXh0ID0gdGV4dFs6cmFuZG9tSWR4XSArIHRleHRbcmFuZG9tSWR4ICsgMTpdDQoJcmV0dXJuIHNjcmFtYmxlZA0KDQppZiBfX25hbWVfXyA9PSAiX19tYWluX18iOg0KCXByaW50IHNjcmFtYmxlKCIxMTE1NzY5MTI4MzIwMTAwNyIpDQo=', '1480197600318', '1480197600318', true);

