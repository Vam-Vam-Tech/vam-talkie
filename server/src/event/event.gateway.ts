import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { EventService } from './event.service';

@WebSocketGateway({ transports: ['websocket'], namespace: 'events' })
export class EventGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly eventService: EventService) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`User ${client.id} connected`);
  }

  handleDisconnect(client: Socket) {
    console.log(`User ${client.id} is disconnected`);
  }

  @SubscribeMessage('joinConversation')
  async handleJoinConversation(
    client: Socket,
    data: { conversationId: number },
  ) {
    client.join(`conversation_${data.conversationId}`);
  }

  @SubscribeMessage('leaveConversation')
  async handleLeaveConversation(
    client: Socket,
    data: { conversationId: number },
  ) {
    client.leave(`conversation_${data.conversationId}`);
  }

  @SubscribeMessage('sendAudio')
  async handleSendAudio(
    client: any,
    data: { conversationId: number; audioData: ArrayBuffer },
  ) {
    const { conversationId, audioData } = data;

    client.to(`conversation_${conversationId}`).emit('receiveAudio', audioData);
  }
}
