#CodePal Web Interface

RUNNING ON WEBSITE
-------------
http://stephenhu.me/codepal/index.html

RUNNING LOCALLY
-------------
Only Chrome is officially supported.
- karma.conf.js: config settings for karma test runner
- package.json: node json project file with all needed dependencies

- Download [this Chrome plugin](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en) to allow CORS through Chrome
- Once installed, click the CORS logo on the top right of the browser enable the option 'Enable cross-origin resource sharing'
- Run `npm install http-server -g` 
- Run `http-server` in the root of this project, and navigate to one of the endpoints the command specifies
 
Features and Modules
---
Golden Layout
- modular components for CodeEditor, youtube and StackOverflow

Youtube
- Search and display youtube videos from inside goldenLayout Components
- Play selected video

StackOverflow
- Search and display StackOverflow questions

CodeEditor
- 9 supported languages
    - Receive execution time and standard output when compiling and running
    - Custom syntax highlighting
    - Live syntax-checking for JavaScript
- Tab functionality
    - Create, delete and switch between different tabs
    - Each tab can have its own independent language mode
- Editor functionality
    - 20+ editor themes
    - [Keyboard shortcuts](https://github.com/ajaxorg/ace/wiki/Default-Keyboard-Shortcuts) for line operations, selection, go to, and find/replace
-  Download current tab contents as a local file
2. Get the karma cli package: npm install -g karma-cli

To run tests, go to root and type in 'karma start karma.conf.js'
To view coverage, after running tests, navigate to codepal/coverage and open up index.html

Project Structure
---
/css: custom css files

/html: contains html for all modules

/js
- initializeLandingPage.js:
    - initializeGoldenLayout.js:
        - creates a config 
        - instantiates a layout object with it
        - calls the following functions to register respective components to layout:
            - integrateCodeEditor(container): code for CodeEditor in js/integrateCodeEditor.js
            - integrateYoutube(container): code for Youtube in js/integrateYoutube.js and youtubeComponent.js
            - integrateStackOverflow(container): code for StackOverflow in js/integrateStackOverflow.js
        - finally initialize the layout created above by calling: 
            - myLayout.init();
    - /ace: contains all Ace Editor related JavaSccript files, including themes and syntax highlighting modes
    - /codeeditor : code editor related js files
    
/spec: all testing related files
- /fixtures: jasmine-jquery html fixture files
- /support: test js dependencies
- *[sSpec].js: testing files

karma.conf.js: config settings for karma test runner

youtubeKarma.conf.js: config settings for karma youtube component test runner

package.json: node json project file with all needed dependencies

RUNNING TESTS
-------------
1. Run `npm install` to get all required node packages for testing.
2. Get the karma cli package: `npm install -g karma-cli`

To run tests, go to root and run `karma start karma.conf.js` or `karma start youtubeKarma.conf.js` (for Youtube Component testing only)
To view coverage, after running tests, navigate to codepal/coverage and open up index.html

ISSUES
---
See [the issues page](https://github.com/stephenhu3/codepal/issues)

# CodePal REST API

# Running the Application

To run the example application run the following commands.
* Make sure your Cassandra cluster is running. If you're hosting a node locally, start it with the following command
    ```
    /usr/bin/cassandra
    ```
    
* Modify prod.yml with the connection settings for your Cassandra cluster located in the following directory
    ```
    codepal/codepal-api/prod.yml
    ```

* Perform a clean install and compile executable JAR (runs test suites as well). In the main directory...
    ```
    codepal/codepal-api/
    ```
    
* ...run the following command
    ```
    mvn clean install
    ```

* Deploy the server on your local machine
    ```
    java -jar target/codepal-api-1.0.1-SNAPSHOT.jar server prod.yml
    ```

* The domain is hosted at the following address
    ```
    http://localhost:8080
    ```

* Make HTTP POST requests to the respective endpoints detailed in the API reference below

# Testing the Application
The unit test suites run an embedded in-memory Cassandra cluster for the lifetime of the test, so make sure Cassandra 3.4+ is installed on the machine you're running the tests on.

* In the main directory...
    ```
    codepal/codepal-api/
    ```
    
* ...run the following command
    ```
    mvn test
    ```

# API Reference

* For all requests, the Content-Type should be set to "application/json"
* For all requests, the basic authentication field should contain userId in the username field, and accessToken in the password field


**POST {domain}/users**

*Creates a user (perform upon sign up)*

**Request:**
```json
{
  "userId": "sampleId",
  "username": "sampleUsername",
  "accessToken": "sampleToken",
  "settings": "sampleSettings"
}
```
    
**Response:**

HTTP 200 (Success, echoes the same input)
```json
{
  "userId": "sampleId7",
  "username": "sampleUsername7",
  "accessToken": "sampleToken7",
  "settings": "sampleSettings7"
}
```

HTTP 422 (Missing fields)
```json
{
  "errors": [
    "userId may not be empty",
    "settings may not be empty",
    "username may not be empty",
    "accessToken may not be empty"
  ]
}
```

HTTP 400 (Invalid fields)
```json
{
  "code": 400,
  "message": "Unable to process JSON"
}
```

HTTP 500 (Generic error for all requests)
```json
{
  "code": 500,
  "message": "There was an error processing your request. It has been logged (ID c5c2c97340d9da2c)."
}
```

**POST {domain}/users/search**

*Searches for user by access token (used for checking permissions) or userId (used for determining login vs. sign up flow)*

**Request:**

```json
{
  "userId": "sampleId"
}
```
or
```json
{
  "accessToken": "sampleToken"
}
```

**Response:**

HTTP 200 (Success, provides the settings, userId, and accessToken of the found user)
```json
{
  "accessToken": "sampleId7",
  "userId": "sampleToken7",
  "settings": "sampleSettings7"
}
```

HTTP 500 (error due to neither accessToken nor userId fields being filled for the request)
```json
{
  "code": 500,
  "message": "There was an error processing your request. It has been logged (ID c5c2c97340d9da2c)."
}
```

**POST {domain}/users/accesstokens**

*Updates a user's access token (perform upon login)*

**Request:**

```json
{
  "userId": "sampleId",
  "accessToken" : "newToken"
}
```

**Response:**

HTTP 200 (Success, echoes the input)
```json
{
  "userId": "sampleId",
  "accessToken" : "newToken"
}
```

HTTP 422 (Missing fields)
```json
{
  "errors": [
    "userId may not be empty",
    "accessToken may not be empty"
  ]
}
```

HTTP 500 (generic error)
```json
{
  "code": 500,
  "message": "There was an error processing your request. It has been logged (ID c5c2c97340d9da2c)."
}
```

**POST {domain}/users/settings**

*Updates a user's ace editor settings (perform when user updates their editor settings)*

**Request:**

```json
{
  "userId": "sampleId",
  "settings" : "newSettings"
}
```

**Response:**

HTTP 200 (Success, provides the settings, userId, and accessToken of the found user)
```json
{
  "userId": "sampleId",
  "settings" : "newSettings"
}
```

HTTP 422 (Missing fields)
```json
{
  "errors": [
    "userId may not be empty",
    "settings may not be empty"
  ]
}
```

HTTP 500 (generic error)
```json
{
  "code": 500,
  "message": "There was an error processing your request. It has been logged (ID c5c2c97340d9da2c)."
}
```
##Snippets
**POST {domain}/snippets**

*Create a new snippet*

**Request:**

```json
{
    "userId": "01908170678902102",
    "title": "NewEntry.java",
    "language": "java",
    "content": "cHVibGljIGNsYXNzIEhlbGxvV29ybGQNCnsNCglwdWJsaWMgc3RhdGljIHZvaWQgbWFpbihTdHJpbmdbXSBhcmdzKSB7DQoJCVN5c3RlbS5vdXQucHJpbnRsbigiSGVsbG8gV29ybGQhIik7DQoJfQ0KfQ==",
    "isPublic": true
}
```

**Response:**

HTTP 200 (Success, echoes created snippet, along with generated UUID, and timestamp (in milliseconds))
```json
{
  "uuid": "1bcd7d03-cccd-49ea-8dac-fc7bb14b3bca",
  "userId": "01908170678902102",
  "title": "NewEntry.java",
  "language": "java",
  "content": "cHVibGljIGNsYXNzIEhlbGxvV29ybGQNCnsNCglwdWJsaWMgc3RhdGljIHZvaWQgbWFpbihTdHJpbmdbXSBhcmdzKSB7DQoJCVN5c3RlbS5vdXQucHJpbnRsbigiSGVsbG8gV29ybGQhIik7DQoJfQ0KfQ==",
  "dateCreated": 1479618665729,
  "dateUpdated": 1479618665729,
  "isPublic": true
}
```


**POST {domain}/snippets/search**

*Get a snippet's contents:*

**Request:**

```json
{
    "uuid": "1bcd7d03-cccd-49ea-8dac-fc7bb14b3bca"
}
```

**Response:**

HTTP 200 (Success, contains snippet's fields)
```json
{
  "uuid": "1bcd7d03-cccd-49ea-8dac-fc7bb14b3bca",
  "userId": "01318170671172102",
  "title": "NewEntry.java",
  "language": "java",
  "content": "cHVibGljIGNsYXNzIEhlbGxvV29ybGQNCnsNCglwdWJsaWMgc3RhdGljIHZvaWQgbWFpbihTdHJpbmdbXSBhcmdzKSB7DQoJCVN5c3RlbS5vdXQucHJpbnRsbigiSGVsbG8gV29ybGQhIik7DQoJfQ0KfQ==",
  "dateCreated": 1479618665729,
  "dateUpdated": 1479618665729,
  "isPublic": true
}
```


**POST {domain}/snippets/user**

*Get all snippets by a particular user:*

**Request:**

```json
{
  "userId": "01318170671172102"
}

```

**Response:**

HTTP 200 (Success, get all user's snippets in JSON array)
```json
[
  {
    "uuid": "4b286e3f-dfa8-4fbd-a7dc-9fcacfd1036b",
    "userId": "01318170671172102",
    "title": "NewEntry.java",
    "language": "java",
    "content": "cHVibGljIGNsYXNzIEhlbGxvV29ybGQNCnsNCglwdWJsaWMgc3RhdGljIHZvaWQgbWFpbihTdHJpbmdbXSBhcmdzKSB7DQoJCVN5c3RlbS5vdXQucHJpbnRsbigiSGVsbG8gV29ybGQhIik7DQoJfQ0KfQ==",
    "dateCreated": 1480111119552,
    "dateUpdated": 1480111119552,
    "isPublic": true
  },
  {
    "uuid": "436115f8-988e-4737-b2f9-97ba8bf17719",
    "userId": "01318170671172102",
    "title": "NewEntry2.java",
    "language": "java",
    "content": "cHVibGljIGNsYXNzIEhlbGxvV29ybGQNCnsNCglwdWJsaWMgc3RhdGljIHZvaWQgbWFpbihTdHJpbmdbXSBhcmdzKSB7DQoJCVN5c3RlbS5vdXQucHJpbnRsbigiSGVsbG8gV29ybGQhIik7DQoJfQ0KfQ==",
    "dateCreated": 1480159064421,
    "dateUpdated": 1480159064421,
    "isPublic": true
  },
  {
    "uuid": "7cb73f17-90c5-454a-9e95-b7cb61ee3468",
    "userId": "01318170671172102",
    "title": "NewEntry3.java",
    "language": "java",
    "content": "cHVibGljIGNsYXNzIEhlbGxvV29ybGQNCnsNCglwdWJsaWMgc3RhdGljIHZvaWQgbWFpbihTdHJpbmdbXSBhcmdzKSB7DQoJCVN5c3RlbS5vdXQucHJpbnRsbigiSGVsbG8gV29ybGQhIik7DQoJfQ0KfQ==",
    "dateCreated": 1480159066028,
    "dateUpdated": 1480159066028,
    "isPublic": true
  }
]
```


**POST {domain}/snippets/update**

*Update a snippet with new values:*

**Request:**

```json
{
  "uuid": "436115f8-988e-4737-b2f9-97ba8bf17719",
  "title": "scramble.py",
  "userId": "01318170671172102",
  "language": "python",
  "content": "aW1wb3J0IHJhbmRvbQ0KDQpkZWYgc2NyYW1ibGUodGV4dCk6DQoJc2NyYW1ibGVkID0gIiINCgl3aGlsZSBsZW4odGV4dCkgPiAwOg0KCQlyYW5kb21JZHggPSByYW5kb20ucmFuZGludCgwLCBsZW4odGV4dCkgLSAxKQ0KCQlzY3JhbWJsZWQgKz0gIHRleHRbcmFuZG9tSWR4XQ0KCQl0ZXh0ID0gdGV4dFs6cmFuZG9tSWR4XSArIHRleHRbcmFuZG9tSWR4ICsgMTpdDQoJcmV0dXJuIHNjcmFtYmxlZA0KDQppZiBfX25hbWVfXyA9PSAiX19tYWluX18iOg0KCXByaW50IHNjcmFtYmxlKCIxMTE1NzY5MTI4MzIwMTAwNyIpDQo=",
  "isPublic": true
}
```

**Response:**

HTTP 200 (Success, updated snippet's values)
```json
{
  "uuid": "436115f8-988e-4737-b2f9-97ba8bf17719",
  "userId": "01318170671172102",
  "title": "scramble.py",
  "language": "python",
  "content": "aW1wb3J0IHJhbmRvbQ0KDQpkZWYgc2NyYW1ibGUodGV4dCk6DQoJc2NyYW1ibGVkID0gIiINCgl3aGlsZSBsZW4odGV4dCkgPiAwOg0KCQlyYW5kb21JZHggPSByYW5kb20ucmFuZGludCgwLCBsZW4odGV4dCkgLSAxKQ0KCQlzY3JhbWJsZWQgKz0gIHRleHRbcmFuZG9tSWR4XQ0KCQl0ZXh0ID0gdGV4dFs6cmFuZG9tSWR4XSArIHRleHRbcmFuZG9tSWR4ICsgMTpdDQoJcmV0dXJuIHNjcmFtYmxlZA0KDQppZiBfX25hbWVfXyA9PSAiX19tYWluX18iOg0KCXByaW50IHNjcmFtYmxlKCIxMTE1NzY5MTI4MzIwMTAwNyIpDQo=",
  "dateUpdated": 1480213015538,
  "isPublic": true
}
```
