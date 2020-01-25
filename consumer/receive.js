#!/usr/bin/env node

const amqp = require("amqplib/callback_api");

// Connect to the RabbitMQ Server
amqp.connect(process.env.RABBITMQ_URL, function(error0, connection) {
  if (error0) {
    throw error0;
  }

  // Create a channel
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }

    /*
     * Declare a queue.
     * Declaring a queue is idempotent - it will only be created if it doesn't exist already
     */
    channel.assertQueue(process.env.RABBITMQ_QUEUE, {
      durable: false
    });

    console.log(
      " [*] Waiting for messages in %s. To exit press CTRL+C",
      process.env.RABBITMQ_QUEUE
    );

    /*
     * We're about to tell the server to deliver us the messages from the queue.
     * Since it will push us messages asynchronously,
     * we provide a callback that will be executed when RabbitMQ pushes messages to our consumer
     */
    channel.consume(
      process.env.RABBITMQ_QUEUE,
      function(msg) {
        console.log(" [x] Received %s", msg.content.toString());
      },
      {
        noAck: true
      }
    );
  });
});
