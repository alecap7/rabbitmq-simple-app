# RabbitMQ Simple App

This is a PoC for the RabbitMQ Message Broker

# Installation & usage

Install node dependencies

> npm install

Start the RabbitMQ Server

> sudo docker-compose up -d

Send a message

> npm run send

Receive messages

> npm run receive

Get queues status

> sudo docker exec rabbitmq-simple-app-server rabbitmqctl list_queues
