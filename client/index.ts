import {Channel, LongPoll, Presence, Serializer, Socket} from "./src/phoenix"

export async function connect(endpoint: string, token: string) {
    let socket = new Socket(endpoint, {
        params: {token: token}
    })
    socket.connect({params: {token: token}})
    return socket;
}

export async function join(socket: Socket, channelName: string, token: string) {
    let channel = socket.channel(channelName, {params: {token: token}})
    channel.join()
    return channel;
}