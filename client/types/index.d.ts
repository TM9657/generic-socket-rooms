import { Channel, Socket } from "./src/phoenix";
export declare function connect(endpoint: string, token: string): Promise<Socket>;
export declare function join(socket: Socket, channelName: string, token: string): Promise<Channel>;
