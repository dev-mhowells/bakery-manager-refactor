# Bakery Manger

A full-stack MVP for an e-commerce system developed from scratch with a small team of 6 developers following Agile development methodology.The app allows wholesale clients to order from a bakery. The bakery’s dashboard allows management of incoming orders and uploading and editing stock which is displayed on the storefront. Wholesale clients are able to place orders, check-out and view invoices.

# To get the project set up: in both frontend and backend run

## Running the project

Clone the project to your local machine.

```
git clone https://github.com/dev-mhowells/bakery-manager-refactored
```

Run npm install for both the frontend and backend folders to install the dependencies.

```
npm install
```

You will need to create a firebase.config.js file in the src directory in the front end with your config set up for firebase storage. Here is an example of what the file should look like:

```
const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
```

You will also need to create a .env.development file in the backend and create the following environment variables set to correct data needed to connect to your MongoDB database:

```
MONGO_USERNAME=
PASSWORD=
DATABASE=
```

Run npm start in the backend and frontend respectively.

```
npm start
```

# The process behind creating Bakery Manager

###### And how it came to be what it is now

We began by using a whiteboarding tool to decide on an MVP which we wanted to have completed by the end of our first sprint. Then we planned out the database structure we wanted to use, wireframed out the pages we wanted, and started to think about how the front-end functionality would interact with the back-end and what kind of fetch requests we would want to make.

<img width="1099" alt="excalidraw" src="https://user-images.githubusercontent.com/106555227/217282376-014b9543-7b9f-4415-8669-b37a81c57311.png">

We assigned ourselves tasks using Trello and set out working on key features. We kept the board up to date to keep track of where we were with implementing features and testing.

###### _This is what the Trello board looked like on the final day of implementing features!!_

<img width="1401" alt="Screenshot 2023-02-07 at 15 08 49" src="https://user-images.githubusercontent.com/106555227/217283156-3ad05dc1-362b-4f5f-98f5-29ce055640db.png">
<img width="1456" alt="Screenshot 2023-02-07 at 15 08 59" src="https://user-images.githubusercontent.com/106555227/217283167-d437854c-45c7-4c8c-9432-8e825a5e6140.png">

## Features

By the deadline we had managed to iterate on our original MVP and ended up with a product which contained a number of features:

    - Sign up and login functionality
    - Tracking system for orders placed to the bakery
    - Inventory management system with create, read, update, delete functionality
    - Storefront and integrated basket system for wholesale users
    - Proof of concept for a checkout system
    - Invoice generation

## Some frontend screenshots

<img width="450" alt="截圖 2023-02-09 上午11 10 58" src="https://user-images.githubusercontent.com/114609139/217836349-d44952bb-4da9-4617-a1b6-6031f94c29ac.png">
<img width="450" alt="截圖 2023-02-09 上午11 11 11" src="https://user-images.githubusercontent.com/114609139/217836347-ad89fbd6-8505-4f1f-81ec-1ee0efc7e6a9.png">
<img width="450" alt="截圖 2023-02-09 上午11 11 54" src="https://user-images.githubusercontent.com/114609139/217836341-083d7b2e-a615-4b82-bb89-eadafd2fcb86.png">
<img width="450" alt="Screenshot 2023-02-09 at 11 28 42" src="https://user-images.githubusercontent.com/114609139/217832437-60e24a02-efeb-4bb8-b2cd-ed36ca7d0f0a.png">
<img width="450" alt="Screenshot 2023-02-09 at 11 27 11" src="https://user-images.githubusercontent.com/114609139/217836293-22b692d9-43f8-4a4f-9afd-236b695e9642.png">
<img width="450" alt="截圖 2023-02-09 上午11 18 04" src="https://user-images.githubusercontent.com/114609139/217836305-1c8b2e9f-6dbb-4de1-8af4-f7b82bc3bf8d.png">
<img width="450" alt="截圖 2023-02-09 上午11 17 46" src="https://user-images.githubusercontent.com/114609139/217836308-f7ec5d49-43ab-4711-a4c0-4832c6cc38b3.png">
<img width="450" alt="截圖 2023-02-09 上午11 16 19" src="https://user-images.githubusercontent.com/114609139/217836312-9fe35da3-4b2a-42f5-913d-d17f05510c2a.png">
<img width="450" alt="截圖 2023-02-09 上午11 16 10" src="https://user-images.githubusercontent.com/114609139/217836320-50d8010e-da2c-440a-9587-e5b05a6b2acb.png">

# Challenges

Due to the number of features we were hoping to implement, there were a lot of high-level decisions to be made. A lot of thought went into the design of database models and the ways in which they would relate to each other. For the initial sprint, decisions had to be made about how to organise them in such a way that they would make sense to build upon in subsequent sprints, but that equally we were sticking to the Agile philosophy and not overdeveloping the database beyond the functionality needed for that initial sprint.

Thanks to this planning stage, there was very little friction in subsequent sprints when building upon our initial MVP both in terms of features and the database structure.

# Lessons

One of the core takeaways from the project was learning to fix things as soon as a problem becomes apparent. Whatever level it may be, from the structure of the database all the way down to variable names, it became very apparent how much time can be saved by addressing issues big and small as soon as possible. While the temptation may be to continue building on the existing structure and come back to make changes later, there were no instances where this approach was more efficient than addressing issues as soon as they cropped up.
