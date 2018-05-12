# bid-master
A custom bid sheet calculator for a paint contractor. Made with angular and materialize.

## Requirements
* Node.js
* Angular 2+
* Angular CLI
* Typescript

## Setup
* Download or clone directory
* In the root directory, run 'npm install'
* Go to https://firebase.google.com/, create a project, and select 'Add Firebase to your web app'
* Create a file called 'api-keys.ts' in klabby-pro/src/app/
* Add
  ```
  export var masterFirebaseConfig = {
    apiKey: "xxxx",
    authDomain: "xxxx.firebaseapp.com",
    projectId: "xxxx"
    databaseURL: "https://xxxx.firebaseio.com",
    storageBucket: "xxxx.appspot.com",
    messagingSenderId: "xxxx"
  };
  ```
  to api-keys.ts, replacing values with those from Firebase
* Run 'ng serve' or 'npm start'
* Navigate to localhost:4200 in a browser

## Improvements
* Add form option for interior bids, separate firebase node
* Add more client info fields: address, phone, status(?)
* Implement validators
* Add bid detail buttons functionality
* Add confirm popup when trying to leave new bid screen


## Legal
Copyright (c) 2018 Copyright Ryan McAlpin, All Rights Reserved.<br>
This web app is licensed under the MIT license.
