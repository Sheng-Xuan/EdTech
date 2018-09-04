define({ "api": [
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