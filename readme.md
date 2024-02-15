 **# Notification Service Using RabbitMQ**

**## Overview**

This project demonstrates a simple notification service built using RabbitMQ, a popular message broker. It simulates the generation of notifications and publishes them to a RabbitMQ exchange, where other services or applications can consume them.

**## Key Features**

- **Asynchronous messaging with RabbitMQ:** Leverages RabbitMQ for reliable and scalable message delivery.
- **Producer:** Generates random user data (as a placeholder for notifications) and publishes it to the exchange.
- **Direct exchange:** Messages are routed to queues based on their routing keys, allowing for flexible message distribution.
- **Configurable:** Environment variables are used to adjust the RabbitMQ connection URL and exchange name.
- **Webhook endpoint:** Provides a basic endpoint to simulate receiving external notifications.
- **Consumer** consumes messages from the producer and uses them accordingly.

**## Getting Started**

1. **Prerequisites:**
    - Node.js and npm (or yarn)
    - RabbitMQ server (download and install from [https://www.rabbitmq.com/](https://www.rabbitmq.com/))
    - PM2 for Horizontal scaling
    - nginx for request load balancing in production(added nginx config file example)
       

2. **Installation:**
    ```bash
    npm install
    ```

3. **Environment Variables:**
    - Set the following environment variables:
      - `SERVER_NAME`: Optional, specifies the server name for logging.
      - `PORT`: Optional, specifies the port to listen on (defaults to 3000).
      - `IS_MAIN`: Set to `true` to check for the main process which   generates a random user and publishes.
      - `RABBITMQ_URL`: URL of the RabbitMQ server (defaults to `amqp://localhost`).
      - `EXCHANGE_NAME`: Name of the RabbitMQ exchange (defaults to `logExchange`).

4. **Running the Service:**
    ```bash
    pm2 start pm2.config.cjs // for API instance
    node consumer.js //to receive notifications and emulate microservice  server 
    ```

**## Usage**

- Access the webhook endpoint at `http://localhost:3000/webhook` (or the specified port) to simulate receiving a notification.
- Observe messages published to the RabbitMQ exchange in the console or RabbitMQ management UI.

**## Further Exploration**

- **Consume messages:** Implement a consumer service to receive and process messages from the RabbitMQ queue.
- **Real-world notifications:** Adapt the producer to generate actual notifications based on your application's logic.
- **Error handling:** Incorporate error handling to ensure message delivery and service resilience.
- **Scaling:** Explore scaling options for handling high-volume message flows.

**## Additional Notes**

- The `faker` and `nanoid` libraries are used to generate random user data for demonstration purposes.
- The `setTimeout` and `setInterval` functions simulate the periodic generation of notifications.
