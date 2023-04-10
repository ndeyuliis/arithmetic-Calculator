Arithmetic Calculator REST API

Instructions

npm install

Running

npm run dev

Api endpoints

User endpoint
/user/ --> List all the user
/user/:id --> search a user by Id

Login endpoint
/register/singup --> create new user
/register/login --> login user and create token
/register/logout --> logout user and delete token
/register/refresh --> verify the user's token

Operation endpoint
/operation/ --> LIs all operation
/operation/:type/:num --> perform the requested operation
/operation/create --> create new operation

Record endpoint
/record/ --> Lis all records
/record/:id --> List record by Id
/record/user/:id --> List all records of a user
