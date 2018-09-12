define({ "api": [
  {
    "type": "GET",
    "url": "/v1/login",
    "title": "Login",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "json",
            "optional": false,
            "field": "jwt:",
            "description": "<p>&quot;xxxxx&quot;</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "type": "Object",
            "optional": false,
            "field": "error:",
            "description": "<p>Email and password not matched</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/authController.ts",
    "groupTitle": "Authentication related calls.",
    "name": "GetV1Login"
  },
  {
    "type": "POST",
    "url": "/v1/register",
    "title": "Register a new user",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userName",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "OK",
            "description": "<p>registration was successful</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "300": [
          {
            "group": "300",
            "type": "Object",
            "optional": false,
            "field": "error",
            "description": "<p>Error with database</p>"
          }
        ],
        "400": [
          {
            "group": "400",
            "type": "Object",
            "optional": false,
            "field": "error",
            "description": "<p>Duplicate email</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/authController.ts",
    "groupTitle": "Authentication related calls.",
    "name": "PostV1Register"
  },
  {
    "type": "GET",
    "url": "/v1/user/:id",
    "title": "GET user by ID",
    "group": "UserGroup",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>User's unique ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userName",
            "description": "<p>user name</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isAdmin",
            "description": "<p>Is this user a admin user</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/userController.ts",
    "groupTitle": "/user",
    "groupDescription": "<p>CRUD api for users.</p>",
    "name": "GetV1UserId"
  }
] });
