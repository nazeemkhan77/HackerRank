## Keller Williams Lead/Architect Test:
This hackerrank test comprises two questions. You are required to attempt all questions in order to be considered for the next round.
1. A simple coding challenge
2. High-level design


### Coding Challenge
As part of this coding challenge, you need to develop a simple microservice that will be used to send messages (SMS & Tweets) and to fetch message history.
Out of scope: Authentication, Authorization, sorting, pagination, calls to external services
For data storage: Feel free to use either internal storage or file or in-memory DB


#### Requirements
> 1. Send one or more messages for a user (assume external integrations to send SMS & Tweets).
> 2. For messages with media just store its URL
> 3. Ability to fetch messages history for a user
> 4. A tweet can be a maximum of 100 characters and SMS can be maximum of 80 characters
> 5. Have basic error handling
> 6. Create appropriate unit tests (doesn't need to have 100% coverage)
> 7. ** Add verification instructions to the README **

Pre-requisites
> 1. brew install redis
> 2. brew services start redis

Sample Requests:
```javascript
  GET /user/<userid>/sms
```
> 2. POST /user/userid>/sms
  body: {"message": "this is a simple message"}
  content-type: applictation/json
  
> 1. GET /user/<userid>/tweet
> 2. POST /user/userid>/tweet
  body: {"message": "this is a simple tweet"}
  content-type: applictation/json
  

#### Project structure
/data/store.js => for file based storage
/test => for unit tests
/routes => routes go here

This sample app runs on port 3000 and can be verified by going to http://localhost:3000


### Verification instructions
Use this section to provide instructions to validate your work. Include sample requests..etc



