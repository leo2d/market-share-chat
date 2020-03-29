# Market Share Chat

### A chat app build with NodeJs, Typescript and React

### Available features and flow:

- New users can sign up
- Registered users can log in and talk with other users in a chatroom and then log out
- Users can post messages as commands into the chatroom with the following format
``/stock=stock_code ``
- When a user post a valid command, a decoupled bot will call the [Stooq API]( https://stooq.com/ "Stooq") using the received _stock_code_ to get a CSV with quote informations
- The Bot will parse the received CSV file and then post a message to a RabbitMQ queue with the quote info.
- Then RabbitMQ will send the message to the subscriber( chat server) and the chat server will build a message and send to the chatroom using the following format: ``“{stock} quote is ${close value} per share”``. This message owner will be
the bot.
- Chat messages are limited to the last 50 messages. 


### Possible future features:
- Multiple chat rooms and an option to choose a room or create a new room
- Store room and chat data on DB (encrypt messages)
- Show online users on screen

### Known mistakes:
- Message Id is hardcoded
- Default room info is harcoded
- No unit tests

### To run this project, follow these steps :

- [Backend BOT Api]( https://github.com/leo2d/market-share-chat/tree/master/bot/README.md "Bot") 

- [Backend Chat Api]( https://github.com/leo2d/market-share-chat/tree/master/server/README.md "Api") 

- [FrontEnd Web]( https://github.com/leo2d/market-share-chat/blob/master/web/README.md "FrontEnd") 
