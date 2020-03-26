# Market Share Chat - Chat API

### Into the stack:

This project use some popular libraries:

- [TypeScript]( https://www.typescriptlang.org/ "TypeScript") - Used for provide types

- [TypeORM]( https://typeorm.io/ "TypeORM") - Used for manage data with PostgreSQL

- [InversifyJS]( http://inversify.io/ "InversifyJS") - Used for provide IoC with Dependency Injecton

- [inversify-express-utils]( https://github.com/inversify/inversify-express-utils "inversify-express-utils") - Used for decorate controllers and DI

- [Express]( https://expressjs.com/ "Express") - Used for build the servers

- [SocketIO]( https://socket.io/ "SocketIO") - Used for build the chat

### How to run:

***Before runs make sure you have Node Js installed on your machine***

1. Clone this repository and navigate to the server folder
2. Then run __yarn__ or __npm i__
3. Setup the Database  
    1. You will need to create the database manualy, so connect to your PostgreSQL Server and then run the command for create the database.
        For example: 
        ```sql   
        CREATE DATABASE "market-chat-db"; --or whatever name you want
        ```
    2. Open the file **dbConfig.ts** in _src/config/db/dbConfig.ts_
    3. Change the value of the follow properties with your connection string:  
         
        ```javascript

        //dbConfig.ts
        
          import DbConfig from '../../constants/types/dbConfig';

          export const connectionConfig: DbConfig = {
            DATABASE_HOST: 'localhost',
            DATABASE_USER: 'postgres',
            DATABASE_PORT: 5432,
            DATABASE_PASSWORD: 'postgres',
            DATABASE_DB: 'market-chat-db', //the name of the database you created at the first step
          };

        
        ```
    4. Setup default users: Run the file **user.sql** ( _src/scripts/user.sql_ ) into your database.
        Afer Doing it you will have 2 users i your database: 
        ``` 
        pedro: {
          email: pedro@mail.com
          password: passpedro
        },
        james: {
          email: james@mail.com
          password: passjames
        }
        ```
        ***NOTE: You will use these users to login on chat***
    
4. Setup the RabbitMQ connection
    1. Open the file **queueConfig.ts** in _src/config/queue/queueConfig.ts_
    2. Change the value of the following properties according to your RabbitMQ: 
         
        ```javascript

        //queueConfig.ts
        
          import RabbitMQConfig from '../../constants/types/rabbitMQConfig';

          const rabbitMQConfig: RabbitMQConfig = {
            hostname: 'localhost',
            port: 5672,
            username: 'rabbitmq',
            password: 'rabbitmq',
            vhost: '/',
            heartbeat: 60,

            quoteQueue: 'proccessedSotckCodes',
            preFetchAmount: 5
          };

          export default rabbitMQConfig;

        
        ```
    
5. Change de BOT api address:
    1. Open the file **endpoints.ts** in _src/config/externals/endpoints.ts_
    2. Change the value of the following constant according to your BOT API: 
         
        ```javascript

        //endpoints.ts
        
          export const botApiAddress = 'http://127.0.0.1:3200/api/'; //change address and port here, but keep the '/api/'
        
        ```
6. Finally you can run __yarn debug__ or __npm run debug__ to run in debug mode with nodemon or just __yarn start__ or __npm start__ to start the application
7. Optional: Change the app port
    1. For default this app will runs at port `3300` but you can change editting the value of the variable `port` in the **serverConfig.ts** file in src/config/serverConfig.ts.ts  
        For example: 
        ```javascript

        //serverConfig.ts
        
        export const port = 3300; // Note that this value only acepts positive integer numbers
        
        ```

***IMPORTANT***: Every time you change the BOT address or port you'll need to update this info like showed on step 5. In the same way, every time you change the chat API address or port you'll need to update that info on the frontend project. 
