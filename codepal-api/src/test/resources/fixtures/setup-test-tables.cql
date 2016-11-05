CREATE TABLE users (
	userId text,
	accessToken text,
	username text,
	settings text,
	PRIMARY KEY (userId)
);
CREATE INDEX accessToken ON codepal_test.users (accessToken);

INSERT INTO users (userId, accessToken, username, settings) VALUES ('11157691283201007', 'EAAM0pjh1ZBZA8BALYylXbNQMlYECRyO2gomKNiK5pgKH2gad1m7Xkkwa7NfUsbQvTdx0y8WZBOMJ3fFcPj4iZCd2v1FX8wmHDgKbbivypK8XZANrlIJXIkjjNDyVuMw9kjdjCwqrHzoeJDZCspiI8FMZC5a0GZBscvjVyZAHigAWPQAZDZD', 'TimeMuffin', '{\"theme\": \"ace/theme/twilight\", \"mode\": \"ace/mode/html\"}');
