import { connect } from "amqplib";
import Producer from "./producer.js";
const producer = new Producer();
export const publishToQueue = (ch, queueName, data) => {

    return ch.sendToQueue( queueName, new Buffer.from(JSON.stringify(data)));
  }
  
async function consumeMessages() {
  const connection = await connect('amqp://localhost'); // Replace with your RabbitMQ connection details

  // Create a channel
  const channel = await connection.createChannel();

  // Define the exchange name and type
  const exchangeName = 'default_exchange';
  const exchangeType = 'direct';

  // Declare the exchange
  await channel.assertExchange(exchangeName, exchangeType, { durable: true });

  // Define the queue names and routing keys
  const queues = [
    { name: 'error', routingKey: 'error' },
    { name: 'info', routingKey: 'info' }
  ];

  // Create and bind each queue to the exchange with specific routing keys
  for (const queue of queues) {
    await channel.assertQueue(queue.name, { durable: true });
    await channel.bindQueue(queue.name, exchangeName, queue.routingKey);
  }

  console.log('Successfully created queues and exchange!');

  // Optionally, you can consume messages from the queues here:
  const consumePromises = queues.map(queue => {
    return new Promise((resolve, reject) => {
      channel.consume(queue.name, (msg) => {
        console.log(`Received message from queue ${queue.name}: ${msg.content.toString()}`);


              const data = JSON.parse(msg.content);
      sendWebhook(msg, channel)
        channel.ack(msg); // Acknowledge the message
      }, { noAck: false }); // Manually acknowledge messages to ensure reliable delivery
    });
  });

  await Promise.all(consumePromises); // Wait for all consumers to be set up

    // channel1.consume(q.queue, (msg) => {
    //   const data = JSON.parse(msg.content);
    //   sendWebhook(msg, channel)

    //   console.log(2);
    //   channel.ack(msg);
    // });
  }
  
  consumeMessages();
  

  export const sendWebhook = async (
    buffer,
    channel,deadChannel
  ) => {
    // TODO: Remove parsing, save as string on rabbit
    const content = JSON.parse(
      buffer.content.toString()
    )
  
    const [message] = Object.entries(content)[0]
  
    try {
      await axios.post("http://localhost:3000/webhook", { message },)
      channel.ack(buffer)
    } catch (e) {
      // console.error(e)
      // await producer.publishMessage("error", buffer,"errorExchange");
      await producer.publishMessage("error", message,"default_exchange");

      channel.ack(buffer)
    }
  }