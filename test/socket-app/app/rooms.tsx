"use client";
import { connect, join } from "@tm9657/socket-client"
import Channel from "@tm9657/socket-client/types/src/channel";
import Socket from "@tm9657/socket-client/types/src/socket";
import { useEffect, useState } from "react";
export default function Rooms() {
    const [token, setToken] = useState("");
    const [msg, setMsg] = useState("");
    const [receiver, setReceiver] = useState("");
    const [room, setRoom] = useState("");
    const [socket, setSocket] = useState<Socket | null>(null);
    const [roomRef, setRoomRef] = useState<Channel | null>(null);
    async function createSocket() {
        const socket = await connect("ws://localhost:4000/socket", token);
        setSocket(socket)
        return socket
    }

    async function joinRoom(socket: any, room: string, token: string){
        return await join(socket, room, token)
    }

    useEffect(() => {
        if(!roomRef) return;
        roomRef.on("pm", (payload: any, ref: any) => {
            console.dir({payload, ref})
        })
    },[roomRef])

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
          
            setRoomRef(room_ref);

        }} className="text-black bg-white">Create Room</button>
      </div>
      <input placeholder="message" className="text-black" onChange={(e) => {
            setMsg(e.target.value);
        }}></input>
        <input placeholder="receiver" className="text-black" onChange={(e) => {
            setReceiver(e.target.value);
        }}></input>
        <button onClick={async() => {
            if(!roomRef) return;
            roomRef.push("pm", {body: msg, receiver: receiver})
        }} className="text-black bg-white">Send</button>
    </div>
  );
}
