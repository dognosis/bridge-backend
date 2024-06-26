import { Socket } from "socket.io";
import { Server as SocketServer } from "socket.io";

let connection: SocketService | null = null;

export class SocketService {
  io: SocketServer | null;

  constructor() {
    this.io = null;
  }

  connect(server: any) {
    const io = new SocketServer(server, {
      cors: {
        origin: "*",
      },
    });

    io.on("connection", (socket: Socket) => {
      console.log(socket.id);
    });

    this.io = io;
  }

  emit(event: string, data: any) {
    if (this.io) {
      this.io.emit(event, data);
    }
  }

  static init(server: any) {
    if (!connection) {
      connection = new SocketService();
      connection.connect(server);
    }
  }
  static getConnection() {
    if (connection) {
      return connection;
    }
  }
}

export const emit = (event: string, data: any) => {
  const socketService = SocketService.getConnection();

  if (socketService) {
    socketService.emit(event, data);
  } else {
    console.warn("SocketIO not initated - dashboard was not notifed");
  }
};

export default {
  connect: SocketService.init,
};
