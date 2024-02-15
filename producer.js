import { connect } from "amqplib";

//step 1 : Connect to the rabbitmq server
//step 2 : Create a new channel on that connection
//step 3 : Create the exchange
//step 4 : Publish the message to the exchange with a routing key
let rabbitMQConfig= {
    url: "amqp://localhost",
    exchangeName: "default_exchange",
  }
class Producer {
  channel;

  async createChannel() {
    const connection = await connect(rabbitMQConfig.url);
    this.channel = await connection.createChannel();
  }

  async publishMessage(routingKey, message,exchangeName) {
    if (!this.channel) {
      await this.createChannel();
    }

    await this.channel.assertExchange(exchangeName, "direct");

    const logDetails = {
      logType: routingKey,
      message: message,
      dateTime: new Date(),
    };
    await this.channel.publish(
      exchangeName,
      routingKey,
      Buffer.from(JSON.stringify(logDetails))
    );

    console.log(
      `The new ${routingKey} log is sent to exchange ${exchangeName}`
    );
  }
}

export default Producer;