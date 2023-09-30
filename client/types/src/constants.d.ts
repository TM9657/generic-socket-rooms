export declare const globalSelf: Window & typeof globalThis;
export declare const phxWindow: Window & typeof globalThis;
export declare const global: any;
export declare const DEFAULT_VSN = "2.0.0";
export declare const SOCKET_STATES: {
    connecting: number;
    open: number;
    closing: number;
    closed: number;
};
export declare const DEFAULT_TIMEOUT = 10000;
export declare const WS_CLOSE_NORMAL = 1000;
export declare const CHANNEL_STATES: {
    closed: string;
    errored: string;
    joined: string;
    joining: string;
    leaving: string;
};
export declare const CHANNEL_EVENTS: {
    close: string;
    error: string;
    join: string;
    reply: string;
    leave: string;
};
export declare const TRANSPORTS: {
    longpoll: string;
    websocket: string;
};
export declare const XHR_STATES: {
    complete: number;
};
