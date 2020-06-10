# eric-tube
Social Video Stream Website for Final Exam Web Programming

# 

# HOW TO RUN

Firstly you have to install node module in client and server directory separately

Server Node Install :
1. cd eric-tube
2. npm install

Next,install in client also:
1. cd client/
2. npm install

Then you go back to previous directory or in server 
1. cd ..

finally you can run the web app
1. npm run dev

# Note 
Before you run the server you have to create a new file javascript named dev.js to run npm run dev
so go to directory server/config, and create dev.js file in that directory.

copy this code to dev.js
module.exports = {
      mongoURI:"yourDatabaseConnection"
}

and dont forget to create a mongoDB database to connect to the application
