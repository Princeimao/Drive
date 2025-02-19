import amqp from "amqplib";
import { RABBITMQ_URI } from "../config/env";
import { IMessage } from "../interfaces/rabbitmq.interface";

// higher level function used as common producer to push message to queue
export const uploadProducer = async (queue: string, message: IMessage) => {
  try {
    if (!RABBITMQ_URI) {
      console.log("Rabbit mq connection uri not found");
      return;
    }
    const connection = amqp.connect(RABBITMQ_URI);
    const channel = (await connection).createChannel();

    (await channel).assertQueue(queue);

    (await channel).sendToQueue(queue, Buffer.from(JSON.stringify(message)));

    console.log("sended to queue ", queue, "message ", message);
  } catch (error) {
    console.log("something went wrong while uploading file to queue", error);
  }
};
