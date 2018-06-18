## Description

Koa 2.0 GraphQL server written in TypeScript.

## Features

GraphQL server that can:
1. Able to Login and Register a user.
2. Able to create Comments and Posts. (Checks for authentication using JWT headers).
3. Able to create Permissions and Roles. (Checks for admin role on user).
4. Able to subscribe to posts to see new comments. 
5. Uses refresh tokens for user auth token re-access.
6. MongoDB for data persistence. 