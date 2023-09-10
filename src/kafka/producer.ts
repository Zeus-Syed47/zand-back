import { Kafka } from 'kafkajs'

const kafka = new Kafka({
    clientId: 'producer-client',
    brokers: ['localhost:9092'],
  })

const producer = kafka.producer()

/**
 * inform clients to send mail
 * @param email 
 */
export const runProd  = async (email) => {
    await producer.connect();

    await producer.send({
        topic: 'your-topic-name-here',
        messages: [
            { value: `send mail to ${email}`}
        ]
    })
    console.log('Message sent successfully!')
}