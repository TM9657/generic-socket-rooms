declare const _default: {
    HEADER_LENGTH: number;
    META_LENGTH: number;
    KINDS: {
        push: number;
        reply: number;
        broadcast: number;
    };
    encode(msg: any, callback: any): any;
    decode(rawPayload: any, callback: any): any;
    binaryEncode(message: any): ArrayBufferLike;
    binaryDecode(buffer: any): any;
    decodePush(buffer: any, view: any, decoder: any): {
        join_ref: any;
        ref: any;
        topic: any;
        event: any;
        payload: any;
    };
    decodeReply(buffer: any, view: any, decoder: any): {
        join_ref: any;
        ref: any;
        topic: any;
        event: string;
        payload: {
            status: any;
            response: any;
        };
    };
    decodeBroadcast(buffer: any, view: any, decoder: any): {
        join_ref: any;
        ref: any;
        topic: any;
        event: any;
        payload: any;
    };
};
export default _default;
