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

    /*
     * Publish a message.
     * The message content is a byte array, so you can encode whatever you like there
     */
    const msg = "Hello World!";

    channel.sendToQueue(process.env.RABBITMQ_QUEUE, Buffer.from(msg));

    console.log(" [x] Sent %s", msg);
  });

  // Close the connection and exit
  setTimeout(function() {
    connection.close();
    process.exit(0);
  }, 500);
});
