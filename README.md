# eric-tube
Social Video Stream Website Project

Social Video Stream Website Application Project is platform where you can watch,upload, and of course socialize with another user
this project is similiar with youtube ( yeah I got inspiration to develop this project beacuse of youtube :3 ). I hope this project can help you , who's still struggle with your project :3, and This project develop by used expressjs + reactjs.

# 

# HOW TO RUN

Firstly you have to install node modules in client and server directory separately

Server Node modules Install :
- cd eric-tube
- npm install

Next,install in client also:
- cd client/
- npm install

if you got error about bcrypt during install node modules, you have to install bcrypt module in server
- npm install --save bcrypt
- npm install

then dont forget to install ffmpeg in your operating system
- if you using windows , you can download in here https://www.ffmpeg.org/download.html#build-windows

- but if you using linux, you can download in here https://tracker.debian.org/pkg/ffmpeg

Then you go back to previous directory in server 
- cd ..

finally you can run the web app
- npm run dev


# Note 
Before you run the server you have to create a new file javascript named 'dev.js' to run 'npm run dev'
so go to directory server/config, and create 'dev.js' file in that directory.

copy this code to 'dev.js'

module.exports = {
      mongoURI:"yourDatabaseConnection"
}

and dont forget to create a mongoDB database to connect to the application
