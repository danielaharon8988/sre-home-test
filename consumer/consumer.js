const { Kafka } = require('kafkajs');

// create kafka client
const kafka = new Kafka({
  clientId: 'my-consumer',
  brokers: ['localhost:9092'],
});

// create consumer
const consumer = kafka.consumer({
  groupId: 'consumer-group',
});

async function start() {
  // connect
  await consumer.connect();

  // subscribe
  await consumer.subscribe({
    topic: 'mysql.appdb.users',
    fromBeginning: true,
  });

  // run
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const value = message.value.toString();

      console.log(`Topic: ${topic}`);
      console.log(`Partition: ${partition}`);
      console.log(`Message: ${value}`);
    },
  });
}

start().catch(console.error);
