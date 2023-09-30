export default class LongPoll {
    endPoint: any;
    token: any;
    skipHeartbeat: boolean;
    reqs: Set<any>;
    awaitingBatchAck: boolean;
    currentBatch: any;
    currentBatchTimer: any;
    batchBuffer: any[];
    onopen: (input?: any) => void;
    onerror: (input?: any) => void;
    onmessage: (input?: any) => void;
    onclose: (input?: any) => void;
    pollEndpoint: any;
    readyState: number;
    constructor(endPoint: any);
    normalizeEndpoint(endPoint: any): any;
    endpointURL(): any;
    closeAndRetry(code: any, reason: any, wasClean: any): void;
    ontimeout(): void;
    isActive(): boolean;
    poll(): void;
    send(body?: any): void;
    batchSend(messages?: any): void;
    close(code?: any, reason?: any, wasClean?: any): void;
    ajax(method: any, contentType: any, body: any, onCallerTimeout: any, callback: any): void;
    timeout(method: any, arg1: any, contentType: any, body: any, timeout: any, ontimeout: () => void, arg6: (resp: any) => void): any;
}
