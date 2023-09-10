import {Kafka} from 'kafkajs';

const kafka = new Kafka({
  clientId: 'producer-client',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({groupId: 'kafka'});

/**
 * sends email to user
 */
export const run = async () => {
  await consumer.connect();

  await consumer.subscribe({
    topic: 'your-topic-name-here',
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({partition, message}) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value?.toString(),
      });
      console.log(
        'Message received successfully! Sending mail to the user........',
      );
    },
  });
};
