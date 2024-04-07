# fintech application that manages accounts and financial transactions.

This document provides an overview of the Node.js Express project, including technologies used and instructions for running the project, running tests, viewing documentation.

## Technologies Used

- Node.js
- Express
- Prisma (ORM)
- postgress (RDMS)
- swagger (API documentation)
- express-validator (validating data)
- jsonwebtoken (authentication)
- bcrypt (hashing)
- typescript
- jest (unit test)
- supertest (unit test)

## How to Run

1. Clone the repository:

```sh
   -> git clone https://github.com/MostafaMagdSalama/fintech-app.git
```

2. install dependencies

```sh
 -> npm install
```

3. add .env file

```sh
DATABASE_URL= DB_URL
TOKEN_SECRET= secret

```

4. migrate tables

```sh
-> prisma migrate dev --name init
install prisma cli for migration
```

5. run project

```sh
-> npm run dev
```

6. run tests

```sh
-> npm run test
note: Tests fail when running concurrently with the application.
because both use same server provider
should seperate the server provider
```

7. run docs

```sh
after run application open
http://localhost:8000/docs/
on the browserm swagger ui will open with api documention
```

## APIs documentation

### `@POST /login` User Login Endpoint

- Request Body:
  email (string): The user's email address used for login.
  password (string): The user's password.

- Successful Login:
  Status Code: 200 OK
  Response Body:
  JWT Token: The generated JSON Web Token for authentication.

- Unsuccessful Login:
  Status Code: 401 Unauthorized
  Response Body (Optional):

- data validation
  validate email formate
  validate password length to be not less than 6

- Additional Considerations:
  > Security:
  > Implement password hashing and salting to protect credentials.
  > Set a reasonable expiration time for JWT tokens.

### `@POST /signup` User signup Endpoint

- Request Body:
  email (string)
  password (string)
  name (string)
  phone (string)

- Successful signup:
  Status Code: 201 OK
  Response Body:
  created user data

- Unsuccessful Login:
  Status Code: 400 bad request

- data validation
  validate name check if the name string value
  validate email formate
  validate password length to be not less than 6
  validate phone with egyption formate
- Additional Considerations:
  > Security:
  > Implement password hashing and salting to protect credentials.
  > save password hashed not in plain formate
  > jwt secret must be hidden from any source outside system

### `@POST /account/open` create user account Endpoint

- Request Body:
  empty request body

- Successful open:
  Status Code: 201 OK
  Response Body:
  created account data

- Unsuccessful open (create):
  Status Code: 400 bad request

- data validation
  no data validation

- Additional Considerations:
  > Security:
  > this is a proteded router, the user must be authenticated to create account

### `@POST /account/deposit` deposit transaction Endpoint

- Request Body:
  amout (number)
  accountId (uuid)

- Successful deposit transaction:
  Status Code: 201 OK
  Response Body:
  message:"Deposit successful"

- Unsuccessful open (create):
  Status Code: 400 bad request

- data validation
  validate if the amout numeric value
  and inside tranaction validate is the amout not negative
  validate if accountId is a valid uuid and not empty

- Additional Considerations:
  > Security:
  > I use UUIDs for all primary keys due to their inherent randomness
- **Note:**
  **This endpoint allows updating a user's balance by performing a secure two-step process within a database transaction. It takes the account ID and update amount as input. Within the transaction, it first adds a record to the transaction table logging the change, and then updates the user's balance in the account table. This transactional approach ensures data integrity by guaranteeing that both actions succeed or both fail, preventing inconsistencies in the database.**

  ### `@POST /account/withdraw` withdraw transaction Endpoint

- Request Body:
  amout (number)
  accountId (uuid)

- Successful withdraw transaction:
  Status Code: 201 OK
  Response Body:
  message:"Deposit successful"

- Unsuccessful open (create):
  Status Code: 400 bad request

- data validation
  validate if the amount numeric value
  and inside tranaction validate is the amount not negative
  and validate that amount not greater than balance
  validate if accountId is a valid uuid and not empty

- Additional Considerations:
  > Security:
  > I use UUIDs for all primary keys due to their inherent randomness
- **Note: duplicated**
  **This endpoint allows updating a user's balance by performing a secure two-step process within a database transaction. It takes the account ID and update amount as input. Within the transaction, it first adds a record to the transaction table logging the change, and then updates the user's balance in the account table. This transactional approach ensures data integrity by guaranteeing that both actions succeed or both fail, preventing inconsistencies in the database.**
- **Note:**
  **This service works, but it might have issues if many users try to do the same thing at once. To avoid problems, a future update could add a queuing system for requests. This would ensure everything happens in order, preventing race condition.**

### Documenting the remaining API endpoints in Swagger

> http://localhost:8000/docs/

![image](https://github.com/MostafaMagdSalama/fintech-app/assets/37047996/486d74dc-0dba-41b2-84d0-296a57096d30)
