"use client";
import { connect, join } from "@tm9657/socket-client"
import Socket from "@tm9657/socket-client/types/src/socket";
import { useState } from "react";
export default function Rooms() {
    const [token, setToken] = useState("");
    const [room, setRoom] = useState("");
    const [socket, setSocket] = useState<Socket | null>(null);
    async function createSocket() {
        const socket = await connect("ws://localhost:4000/socket", token);
        setSocket(socket)
        return socket
    }

    async function joinRoom(socket: any, room: string, token: string){
        return await join(socket, room, token)
    }


  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <input placeholder="token" className="text-black" onChange={(e) => {
            setToken(e.target.value);
        }}></input>

        <input placeholder="room" className="text-black" onChange={(e) => {
            setRoom(e.target.value);
        }}></input>
        <button onClick={async() => {
            let localSocket = socket;
            if(!socket) localSocket = await createSocket();
            const room_ref = await joinRoom(localSocket, room, token);
        }} className="text-black bg-white">Create Room</button>
      </div>
      <p>{token}</p>
    </div>
  );
}
