define({ "api": [
  {
    "type": "POST",
    "url": "/v1/bug/",
    "title": "To send bug report from user to admin email",
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
            "field": "message",
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
            "field": "message",
            "description": ""
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
            "field": "error",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/authController.ts",
    "groupTitle": "Authentication related calls.",
    "name": "PostV1Bug"
  },
  {
    "type": "POST",
    "url": "/v1/forgotpassword/code",
    "title": "Request server to send reset password code to email",
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
            "field": "message",
            "description": ""
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
            "field": "error",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/authController.ts",
    "groupTitle": "Authentication related calls.",
    "name": "PostV1ForgotpasswordCode"
  },
  {
    "type": "POST",
    "url": "/v1/forgotpassword/newpassword",
    "title": "Set new password",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "key",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
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
            "field": "message",
            "description": ""
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
            "field": "error",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/authController.ts",
    "groupTitle": "Authentication related calls.",
    "name": "PostV1ForgotpasswordNewpassword"
  },
  {
    "type": "POST",
    "url": "/v1/forgotpassword/verification",
    "title": "Compare the code stored and user given",
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
            "field": "code",
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
            "type": "Object",
            "optional": false,
            "field": "key",
            "description": ""
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
            "field": "error",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/authController.ts",
    "groupTitle": "Authentication related calls.",
    "name": "PostV1ForgotpasswordVerification"
  },
  {
    "type": "POST",
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
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "remember",
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
    "name": "PostV1Login"
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
            "field": "username",
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
    "url": "/v1/categories",
    "title": "Get all categories",
    "group": "Category",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "Array",
            "description": "<p>of categoryObjects</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "Object",
            "optional": false,
            "field": "error",
            "description": "<p>No category found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/categoryController.ts",
    "groupTitle": "Authentication related calls.",
    "name": "GetV1Categories"
  },
  {
    "type": "DELETE",
    "url": "/v1/review/comment/:id",
    "title": "DELETE a comment by commentId",
    "group": "Comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "commentId",
            "description": "<p>comment id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "OK",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "json",
            "optional": false,
            "field": "error",
            "description": "<p>error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/commentController.ts",
    "groupTitle": "Comment related calls.",
    "name": "DeleteV1ReviewCommentId"
  },
  {
    "type": "DELETE",
    "url": "/v1/tool/comment/:id",
    "title": "DELETE a comment by commentId",
    "group": "Comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "commentId",
            "description": "<p>comment id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "OK",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "json",
            "optional": false,
            "field": "error",
            "description": "<p>error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/commentController.ts",
    "groupTitle": "Comment related calls.",
    "name": "DeleteV1ToolCommentId"
  },
  {
    "type": "GET",
    "url": "/v1/review/comments/:reviewId",
    "title": "GET comments to a review",
    "group": "Comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "reviewId",
            "description": "<p>review id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "comments",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "json",
            "optional": false,
            "field": "error",
            "description": "<p>error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/commentController.ts",
    "groupTitle": "Comment related calls.",
    "name": "GetV1ReviewCommentsReviewid"
  },
  {
    "type": "GET",
    "url": "/v1/tool/comments/:toolId",
    "title": "GET comments to a tool",
    "group": "Comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "toolId",
            "description": "<p>tool id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "comments",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "json",
            "optional": false,
            "field": "error",
            "description": "<p>error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/commentController.ts",
    "groupTitle": "Comment related calls.",
    "name": "GetV1ToolCommentsToolid"
  },
  {
    "type": "POST",
    "url": "/v1/review/comment/",
    "title": "Post comment to a tool",
    "group": "Comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "reviewId",
            "description": "<p>review id</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "comment",
            "description": "<p>comment content</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "message",
            "description": "<p>OK</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "json",
            "optional": false,
            "field": "error",
            "description": "<p>error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/commentController.ts",
    "groupTitle": "Comment related calls.",
    "name": "PostV1ReviewComment"
  },
  {
    "type": "POST",
    "url": "/v1/tool/comment/",
    "title": "Post comment to a tool",
    "group": "Comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "toolId",
            "description": "<p>tool id</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "comment",
            "description": "<p>comment content</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "message",
            "description": "<p>OK</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "json",
            "optional": false,
            "field": "error",
            "description": "<p>error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/commentController.ts",
    "groupTitle": "Comment related calls.",
    "name": "PostV1ToolComment"
  },
  {
    "type": "GET",
    "url": "/v1/review/:reviewId",
    "title": "Retrive a review with reviewId",
    "group": "Review",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "reviewId",
            "description": "<p>id of the review</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "html",
            "description": "<p>content of the review</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "json",
            "optional": false,
            "field": "error",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/reviewController.ts",
    "groupTitle": "Review related calls.",
    "name": "GetV1ReviewReviewid"
  },
  {
    "type": "GET",
    "url": "/v1/reviews/flow/:offset",
    "title": "Retrieve review flow",
    "group": "Review",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "offset",
            "description": "<p>offset of data</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "list",
            "description": "<p>of reviews info</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "json",
            "optional": false,
            "field": "error",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/reviewController.ts",
    "groupTitle": "Review related calls.",
    "name": "GetV1ReviewsFlowOffset"
  },
  {
    "type": "GET",
    "url": "/v1/reviews/new",
    "title": "Retrieve new reviews",
    "group": "Review",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "list",
            "description": "<p>of reviews info</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "json",
            "optional": false,
            "field": "error",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/reviewController.ts",
    "groupTitle": "Review related calls.",
    "name": "GetV1ReviewsNew"
  },
  {
    "type": "GET",
    "url": "/v1/reviews/:userId",
    "title": "Retrive reviews written by a user",
    "group": "Review",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "userId",
            "description": "<p>id of the author</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "list",
            "description": "<p>of reviews info</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "json",
            "optional": false,
            "field": "error",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/reviewController.ts",
    "groupTitle": "Review related calls.",
    "name": "GetV1ReviewsUserid"
  },
  {
    "type": "GET",
    "url": "/v1/reviews/visit/:reviewId",
    "title": "Increment count for visit on a review",
    "group": "Review",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "reviewId",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "list",
            "description": "<p>of reviews info</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "json",
            "optional": false,
            "field": "error",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/reviewController.ts",
    "groupTitle": "Review related calls.",
    "name": "GetV1ReviewsVisitReviewid"
  },
  {
    "type": "POST",
    "url": "/v1/review/create/:toolId",
    "title": "Create a review under Tool:toolId",
    "group": "Review",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>title of the review</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "content",
            "description": "<p>content of the review in html</p>"
          },
          {
            "group": "Parameter",
            "type": "string[]",
            "optional": false,
            "field": "images",
            "description": "<p>array of image names contained in the review</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "reviewId",
            "description": "<p>created review's id</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "json",
            "optional": false,
            "field": "error",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/reviewController.ts",
    "groupTitle": "Review related calls.",
    "name": "PostV1ReviewCreateToolid"
  },
  {
    "type": "DELETE",
    "url": "/v1/tool/:toolId",
    "title": "Delete a tool by toolId",
    "group": "Tool",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "toolId",
            "description": "<p>id of the tool</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "OK",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "json",
            "optional": false,
            "field": "error",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/toolController.ts",
    "groupTitle": "Tool related calls.",
    "name": "DeleteV1ToolToolid"
  },
  {
    "type": "GET",
    "url": "/v1/tool/myrating/:toolId",
    "title": "Get rating of the request owner",
    "group": "Tool",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "toolId",
            "description": "<p>tool id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "rating",
            "description": "<p>user's rating, if no rating return 0</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/toolController.ts",
    "groupTitle": "Tool related calls.",
    "name": "GetV1ToolMyratingToolid"
  },
  {
    "type": "GET",
    "url": "/v1/tool/reviews/:toolId",
    "title": "Retrive reviews under tool with toolId",
    "group": "Tool",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "toolId",
            "description": "<p>id of the tool</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "reviewList",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "json",
            "optional": false,
            "field": "error",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/toolController.ts",
    "groupTitle": "Tool related calls.",
    "name": "GetV1ToolReviewsToolid"
  },
  {
    "type": "GET",
    "url": "/v1/tool/search/:category/:keyword",
    "title": "Get a tool",
    "group": "Tool",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "category",
            "description": "<p>tool category, 0 indicates all.</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "keyword",
            "description": "<p>key word to search</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "tool",
            "description": "<p>object list</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "json",
            "optional": false,
            "field": "error",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/toolController.ts",
    "groupTitle": "Tool related calls.",
    "name": "GetV1ToolSearchCategoryKeyword"
  },
  {
    "type": "GET",
    "url": "/v1/tools/",
    "title": "Get all tools (admin api)",
    "group": "Tool",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "tools",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "type": "error",
            "optional": false,
            "field": "Unauthorized",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/toolController.ts",
    "groupTitle": "Tool related calls.",
    "name": "GetV1Tools"
  },
  {
    "type": "GET",
    "url": "/v1/tools/:id",
    "title": "Get all tools published by a user",
    "group": "Tool",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "tools",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "type": "error",
            "optional": false,
            "field": "Unauthorized",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/toolController.ts",
    "groupTitle": "Tool related calls.",
    "name": "GetV1ToolsId"
  },
  {
    "type": "GET",
    "url": "/v1/tools/recommended",
    "title": "Get recommended tool list",
    "group": "Tool",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "tool",
            "description": "<p>objects list</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "json",
            "optional": false,
            "field": "error",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/toolController.ts",
    "groupTitle": "Tool related calls.",
    "name": "GetV1ToolsRecommended"
  },
  {
    "type": "GET",
    "url": "/v1/tools/top/:category/",
    "title": "Get top tools under a category",
    "group": "Tool",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "category",
            "description": "<p>tool category, 0 indicates all.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "tool",
            "description": "<p>object list</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "json",
            "optional": false,
            "field": "error",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/toolController.ts",
    "groupTitle": "Tool related calls.",
    "name": "GetV1ToolsTopCategory"
  },
  {
    "type": "POST",
    "url": "/v1/tool/create",
    "title": "Create a tool",
    "group": "Tool",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>name of the tool</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "description",
            "description": "<p>description of the tool</p>"
          },
          {
            "group": "Parameter",
            "type": "string[]",
            "optional": false,
            "field": "images",
            "description": "<p>array of image names</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "toolId",
            "description": "<p>created tool's id</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "json",
            "optional": false,
            "field": "error",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/toolController.ts",
    "groupTitle": "Tool related calls.",
    "name": "PostV1ToolCreate"
  },
  {
    "type": "POST",
    "url": "/v1/tool/:id",
    "title": "Get a tool",
    "group": "Tool",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "id",
            "description": "<p>tool id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "tool",
            "description": "<p>object</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "json",
            "optional": false,
            "field": "error",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/toolController.ts",
    "groupTitle": "Tool related calls.",
    "name": "PostV1ToolId"
  },
  {
    "type": "POST",
    "url": "/v1/tool/myrating/",
    "title": "Post rating of the request owner",
    "group": "Tool",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "toolId",
            "description": "<p>tool id</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "score",
            "description": "<p>1-5</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "OK",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "json",
            "optional": false,
            "field": "error",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/toolController.ts",
    "groupTitle": "Tool related calls.",
    "name": "PostV1ToolMyrating"
  },
  {
    "type": "POST",
    "url": "/v1/image",
    "title": "Upload a image to the server",
    "group": "Upload",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>relative url of uploaded image</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "fileName",
            "description": "<p>new file name</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "json",
            "optional": false,
            "field": "error",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/imageController.ts",
    "groupTitle": "Upload",
    "name": "PostV1Image"
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
            "field": "username",
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
  },
  {
    "type": "GET",
    "url": "/v1/users/",
    "title": "GET all users (admin api)",
    "group": "UserGroup",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "users",
            "description": "<p>all users</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/userController.ts",
    "groupTitle": "/user",
    "groupDescription": "<p>CRUD api for users.</p>",
    "name": "GetV1Users"
  },
  {
    "type": "PUT",
    "url": "/v1/tool/recommended",
    "title": "Update a tool's recommendation status (admin api)",
    "group": "UserGroup",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "toolId",
            "description": ""
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "recommended",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "OK",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/toolController.ts",
    "groupTitle": "/user",
    "groupDescription": "<p>CRUD api for users.</p>",
    "name": "PutV1ToolRecommended"
  },
  {
    "type": "PUT",
    "url": "/v1/tool/status",
    "title": "Update a tool's status (admin api)",
    "group": "UserGroup",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "toolId",
            "description": ""
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "status",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "OK",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/toolController.ts",
    "groupTitle": "/user",
    "groupDescription": "<p>CRUD api for users.</p>",
    "name": "PutV1ToolStatus"
  },
  {
    "type": "PUT",
    "url": "/v1/user/group",
    "title": "Update a user's group (admin api)",
    "group": "UserGroup",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "userId",
            "description": ""
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "isAdmin",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "OK",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/userController.ts",
    "groupTitle": "/user",
    "groupDescription": "<p>CRUD api for users.</p>",
    "name": "PutV1UserGroup"
  },
  {
    "type": "PUT",
    "url": "/v1/user/password",
    "title": "Update user's password",
    "group": "UserGroup",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newPassword",
            "description": "<p>User's new password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "oldPassword",
            "description": "<p>User's old password</p>"
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
            "field": "status",
            "description": "<p>OK</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/userController.ts",
    "groupTitle": "/user",
    "groupDescription": "<p>CRUD api for users.</p>",
    "name": "PutV1UserPassword"
  },
  {
    "type": "PUT",
    "url": "/v1/user/status",
    "title": "Update a user's status (admin api)",
    "group": "UserGroup",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "userId",
            "description": ""
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "status",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "OK",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/controller/userController.ts",
    "groupTitle": "/user",
    "groupDescription": "<p>CRUD api for users.</p>",
    "name": "PutV1UserStatus"
  }
] });
