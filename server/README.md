# Market Share Chat - Chat API

### Into the stack:

This project use some popular libraries:

- [TypeScript]( https://www.typescriptlang.org/ "TypeScript") - Used for provide types

- [TypeORM]( https://typeorm.io/ "TypeORM") - Used for manage data with PostgreSQL

- [InversifyJS]( http://inversify.io/ "InversifyJS") - Used for provide IoC with Dependency Injecton

- [inversify-express-utils]( https://github.com/inversify/inversify-express-utils "inversify-express-utils") - Used for decorate controllers and DI

- [Express]( https://expressjs.com/ "Express") - Used for build the servers

- [SocketIO]( https://socket.io/ "SocketIO") - Used for build the chat

### How to run locally:

***Before runs make sure you have Node Js installed on your machine***

1. Clone this repository and navigate to the server folder
2. Then run __yarn__ or __npm i__
3. Creating the database: Connect to your PostgreSQL Server and then run the command for create the database.
        For example: 
        ```sql   
        CREATE DATABASE "market-chat-db"; --or whatever name you want
        ```
    
4. Setup the environment variables:
    1. Open the file **.env.dev** in _src/config_
    2. Then change the value of the following properties according to yours:  
    
            
        **IMPORTANT**: Every time you change the BOT address or port on BOT settings, you'll need to update the _BOT_API_ADDRESS_ in this *.env.dev* file. In the same way, every time you change the chat API address or _SERVER_PORT_ here you'll need to update that info in the frontend project. 
         
        ```env

        //.env.dev
        #server
        SERVER_PORT=3300

        #external services 
        BOT_API_ADDRESS=http://127.0.0.1:3200/api/

        #database 
        DATABASE_HOST=localhost
        DATABASE_USER=postgres
        DATABASE_PORT=5432
        DATABASE_PASSWORD=postgres
        #The name of database you created before
        DATABASE_DB=market-chat-db


        #rabbit Mq
        RABBITMQ_HOSTNAME=localhost
        RABBITMQ_PORT=5672
        RABBITMQ_USERNAME=rabbitmq
        RABBITMQ_PASSWORD=rabbitmq
        RABBITMQ_VHOST=/
        RABBITMQ_HEARTBEAT=60
        RABBITMQ_QUOTES_QUEUE=proccessedSotckCodes
        RABBITMQ_PER_FETCH=5


        #auth
        AUTH_EXPIRES_IN=3d
        #MD5 for market-share-chat
        AUTH_SECRET_KEY=663c49ee10402f47466f42b494d80b0e
        
        ```

    
5. Finally you can run __yarn debug__ or __npm run debug__ to run in debug mode with nodemon or just __yarn start__ or __npm start__ to start the application

***Optional:***

1. Setup default users:  
    After run the application, the ORM will create the tables on DB.  
    Then run the file **user.sql** ( _src/scripts/user.sql_ ) into your database to insert default users.  
        Afer Doing it you will have 2 users in your database:  
         
        

        pedro: {
          email: pedro@mail.com
          password: passpedro
        },
        
        james: {
          email: james@mail.com
          password: passjames
        }
        
        

    ***You can use these users to login on chat***

