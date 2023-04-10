Arithmetic Calculator REST API

 Implement a Web platform to provide a simple calculator functionality (addition, subtraction,
multiplication, division, square root, and a random string generation) where each functionality will
have a separate cost per request.
 User’s will have a starting credit/balance. Each request will be deducted from the user’s balance.
If the user’s balance isn’t enough to cover the request cost, the request shall be denied.

Instructions

npm install

Running

npm run dev

Api endpoints

User endpoint

/user/ --> List all the user
/user/:id --> Search a user by Id

Login endpoint

/register/singup --> Create new user
/register/login --> Login user and create token
/register/logout --> Logout user and delete token
/register/refresh --> Verify the user's token

Operation endpoint

/operation/ --> List all operation
/operation/:type/:num --> Perform the requested operation
/operation/create --> Create new operation

Record endpoint

/record/ --> List all records
/record/:id --> List record by Id
/record/user/:id --> List all records of a user
