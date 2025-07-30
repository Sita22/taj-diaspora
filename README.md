## Project name

TajDiaspora

## One liner

Connect tajiks abroad by creating a community for their city

## Project description

- The app allows users (Tajiks) to create an account, select their city and join the Tajik community in their city.
- It allows them to see different groups by topics (e.g. events, administrative topics, meetups, send stuff etc.)
- Users see a list of questions or topics people posted, the date and when it was updated last 
- By clicking on the question/topic they can see the details and comments 
- They can add their own questions and add comments

## MVP

- Start with one community (e.g. Berlin)
- See different groups
- See the list of questions/topics
- Click on the question/topic and see the details/comments

## Tech stack

**Front End:** React, Mobile First

**Back End:** Express, MongoDB

## Data sources

From a database with MongoDB and Mongoose

## Installation

Clone the repository

```
git clone git@github.com:Sita22/taj-diaspora.git
```

**Client part:** 

Install all the packages and depenedencies by running:

```
npm install
```

The client doesn't have authorisation/Login yet, so for the client to run, update the User Id (_id) to the Services/ApiClient.js file. 

Run the dev version: 
```
npm run dev
```

Build the app: 

```
npm run build
```

Create a new component: 
```
npm run cp [name of the component]
```

**Server part:**

Install all the packages and depenedencies by running:

```
npm install
```
Run the dev version: 
```
nodemon
```

To delete the mock data in database and create the mock data from scratch: 
```
node ./model/seed.js
```




