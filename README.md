# TDD with NodeJs

## User Stories

### As user, i want to register my data in the system so that i can keep my data

Criteria acceptance:

- Save user data:
Given a user with his name and valid email
When the user send his data to the system
Then the system must save the user data

- Save user data: validate user data:
Given a user data with his name and invalid email
When the user send his data to the system
Then the system must return error validation message as
"the email must be like 'john.doe@mail.com'"

### As user, i want to see all the users data stored in the system so that i can consult it
- Show all users:
Given users in the system
When a user wants to see all the users in the system
Then the system must show all the users data

### As user, i want to update my name and email so that i can keep right information
- Update user data
Given a user with his name and valid email
When the user send his data to the system for update
Then the system must update only the user data

### As user, i want to delete my data from the system so that i can feel free to use the system
- Delete user data
Given a user registered in the system
When the user sends a request to delete his data
Then the system must delete the user data