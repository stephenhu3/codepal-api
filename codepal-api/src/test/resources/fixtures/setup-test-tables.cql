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
