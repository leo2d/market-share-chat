# Market Share Chat - BOT

### Into the stack:

This project use some popular libraries:

- [TypeScript]( https://www.typescriptlang.org/ "TypeScript") - Used for provide types

- [InversifyJS]( http://inversify.io/ "InversifyJS") - Used for provide IoC with Dependency Injecton

- [inversify-express-utils]( https://github.com/inversify/inversify-express-utils "inversify-express-utils") - Used for decorate controllers and DI

- [Express]( https://expressjs.com/ "Express") - Used for build the servers

### How to run locally:

***Before runs make sure you have Node Js installed on your machine***

1. Clone this repository and navigate to the ***bot*** folder
2. Then run __yarn__ or __npm i__
3. Setup the environment variables:
    1. Open the file **.env.dev** in _src/config_
    2. Then change the value of the following properties according to yours:  
        **IMPORTANT** : If you change the value of *SERVER_PORT*, you will also need to change the port in *BOT_API_ADDRESS* in chat api settings. 
         
        ```env

        //.env.dev
        
        #server
        SERVER_PORT=3200

        #stooq - this probably don't need to change
        STOOQ_API_BASE_URL=https://stooq.com

        #rabbit Mq
        RABBITMQ_HOSTNAME=localhost
        RABBITMQ_PORT=5672
        RABBITMQ_USERNAME=rabbitmq
        RABBITMQ_PASSWORD=rabbitmq
        RABBITMQ_VHOST=/
        RABBITMQ_HEARTBEAT=60
        RABBITMQ_QUOTES_QUEUE=proccessedSotckCodes

        
        ```
   
4. Finally you can run __yarn debug__ or __npm run debug__ to run in debug mode with nodemon or just __yarn start__ or __npm start__ to start the application

