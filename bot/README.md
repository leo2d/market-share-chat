# Market Share Chat - BOT

### Into the stack:

This project use some popular libraries:

- [TypeScript]( https://www.typescriptlang.org/ "TypeScript") - Used for provide types

- [InversifyJS]( http://inversify.io/ "InversifyJS") - Used for provide IoC with Dependency Injecton

- [inversify-express-utils]( https://github.com/inversify/inversify-express-utils "inversify-express-utils") - Used for decorate controllers and DI

- [Express]( https://expressjs.com/ "Express") - Used for build the servers

### How to run:

***Before runs make sure you have Node Js installed on your machine***

1. Clone this repository and navigate to the ***bot*** folder
2. Then run __yarn__ or __npm i__
3. Setup the RabbitMQ connection
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

            quoteQueue: 'proccessedSotckCodes'
          };

          export default rabbitMQConfig;

        
        ```
   
4. Finally you can run __yarn debug__ or __npm run debug__ to run in debug mode with nodemon or just __yarn start__ or __npm start__ to start the application
5. Optional: Change the app port
    1. For default this app will runs at port `3200` but you can change editting the value of the variable `port` in the **serverConfig.ts** file in src/config/serverConfig.ts.ts  
        For example: 
        ```javascript

        //serverConfig.ts
        
        export const port = 3200; // Note that this value only acepts positive integer numbers
        
        ```


