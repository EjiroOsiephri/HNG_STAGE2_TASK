HNG_STAGE2_TASK
Backend Stage 2 Task: User Authentication & Organisation
Using your most comfortable backend framework of your choice, adhere to the following acceptance criteria:

Acceptance Criteria
Database Connection: Connect your application to a Postgres database server. (Optional: you can choose to use any ORM of your choice if you want or not).

User Model: Create a User model using the properties below. Note that userId and email must be unique.

json
Copy code
{
    "userId": "string", // must be unique
    "firstName": "string", // must not be null
    "lastName": "string", // must not be null
    "email": "string", // must be unique and must not be null
    "password": "string", // must not be null
    "phone": "string"
}
Provide validation for all fields. When there’s a validation error, return status code 422 with payload:
json
Copy code
{
    "errors": [
        {
            "field": "string",
            "message": "string"
        }
    ]
}
User Authentication:

User Registration: Implement an endpoint for user registration. Hash the user’s password before storing it in the database.
Successful response: Return the payload with a 201 success status code.
User Login: Implement an endpoint for user login. Use the JWT token returned to access protected endpoints.
Organisation:

A user can belong to one or more organisations.
An organisation can contain one or more users.
On every registration, an organisation must be created. The name property of the organisation takes the user’s first name and appends “Organisation” to it. For example, if the user’s first name is John, the organisation name becomes "John's Organisation".
Organisation Model
json
Copy code
{
    "orgId": "string", // Unique
    "name": "string", // Required and cannot be null
    "description": "string"
}
Endpoints
[POST] /auth/register: Registers a user and creates a default organisation.

Register request body:
json
Copy code
{
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "password": "string",
    "phone": "string"
}
Successful response:
json
Copy code
{
    "status": "success",
    "message": "Registration successful",
    "data": {
        "accessToken": "eyJh...",
        "user": {
            "userId": "string",
            "firstName": "string",
            "lastName": "string",
            "email": "string",
            "phone": "string"
        }
    }
}
Unsuccessful registration response:
json
Copy code
{
    "status": "Bad request",
    "message": "Registration unsuccessful",
    "statusCode": 400
}
[POST] /auth/login: Logs in a user. When you log in, you can select an organisation to interact with.

Login request body:
json
Copy code
{
    "email": "string",
    "password": "string"
}
Successful response:
json
Copy code
{
    "status": "success",
    "message": "Login successful",
    "data": {
        "accessToken": "eyJh...",
        "user": {
            "userId": "string",
            "firstName": "string",
            "lastName": "string",
            "email": "string",
            "phone": "string"
        }
    }
}
Unsuccessful login response:
json
Copy code
{
    "status": "Bad request",
    "message": "Authentication failed",
    "statusCode": 401
}
[GET] /api/users/
: A user gets their own record or user records in organisations they belong to or created [PROTECTED].

Successful response:
json
Copy code
{
    "status": "success",
    "message": "<message>",
    "data": {
        "userId": "string",
        "firstName": "string",
        "lastName": "string",
        "email": "string",
        "phone": "string"
    }
}
[GET] /api/organisations: Gets all your organisations the user belongs to or created. If a user is logged in properly, they can get all their organisations. They should not get another user’s organisation [PROTECTED].

Successful response:
json
Copy code
{
    "status": "success",
    "message": "<message>",
    "data": {
        "organisations": [
            {
                "orgId": "string",
                "name": "string",
                "description": "string"
            }
        ]
    }
}
[GET] /api/organisations/
: The logged-in user gets a single organisation record [PROTECTED].

Successful response:
json
Copy code
{
    "status": "success",
    "message": "<message>",
    "data": {
        "orgId": "string", // Unique
        "name": "string", // Required and cannot be null
        "description": "string"
    }
}
[POST] /api/organisations: A user can create their new organisation [PROTECTED].

Request body:
json
Copy code
{
    "name": "string", // Required and cannot be null
    "description": "string"
}
Successful response:
json
Copy code
{
    "status": "success",
    "message": "Organisation created successfully",
    "data": {
        "orgId": "string",
        "name": "string",
        "description": "string"
    }
}
Unsuccessful response:
json
Copy code
{
    "status": "Bad Request",
    "message": "Client error",
    "statusCode": 400
}
[POST] /api/organisations/
/users: Adds a user to a particular organisation.

Request body:
json
Copy code
{
    "userId": "string"
}
Successful response:
json
Copy code
{
    "status": "success",
    "message": "User added to organisation successfully"
}
Unit Testing
Write appropriate unit tests to cover:

Token Generation: Ensure token expires at the correct time and correct user details are found in token.
Organisation: Ensure users can’t see data from organisations they don’t have access to.
End-to-End Test Requirements for the Register Endpoint
The goal is to ensure the POST /auth/register endpoint works correctly by performing end-to-end tests. The tests should cover successful user registration, validation errors, and database constraints.

Directory Structure:
The test file should be named auth.spec.ext (ext is the file extension of your chosen language) inside a folder named tests. For example, tests/auth.spec.ts assuming you’re using TypeScript.

Test Scenarios:

It Should Register User Successfully with Default Organisation:
Ensure a user is registered successfully when no organisation details are provided.
Verify the default organisation name is correctly generated (e.g., "John's Organisation" for a user with the first name "John").
Check that the response contains the expected user details and access token.
It Should Log the user in successfully:
Ensure a user is logged in successfully when a valid credential is provided and fails otherwise.
Check that the response contains the expected user details and access token.
It Should Fail If Required Fields Are Missing:
Test cases for each required field (firstName, lastName, email, password) missing.
Verify the response contains a status code of 422 and appropriate error messages.
It Should Fail if there’s Duplicate Email or UserID:
Attempt to register two users with the same email.
Verify the response contains a status code of 422 and appropriate error messages.
