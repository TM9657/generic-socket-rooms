import Channel from "./channel";
import LongPoll from "./longpoll";
import Timer from "./timer";
/** Initializes the Socket *
 *
 * For IE8 support use an ES5-shim (https://github.com/es-shims/es5-shim)
 *
 * @param {string} endPoint - The string WebSocket endpoint, ie, `"ws://example.com/socket"`,
 *                                               `"wss://example.com"`
 *                                               `"/socket"` (inherited host & protocol)
 * @param {Object} [opts] - Optional configuration
 * @param {Function} [opts.transport] - The Websocket Transport, for example WebSocket or Phoenix.LongPoll.
 *
 * Defaults to WebSocket with automatic LongPoll fallback.
 * @param {Function} [opts.encode] - The function to encode outgoing messages.
 *
 * Defaults to JSON encoder.
 *
 * @param {Function} [opts.decode] - The function to decode incoming messages.
 *
 * Defaults to JSON:
 *
 * ```javascript
 * (payload, callback) => callback(JSON.parse(payload))
 * ```
 *
 * @param {number} [opts.timeout] - The default timeout in milliseconds to trigger push timeouts.
 *
 * Defaults `DEFAULT_TIMEOUT`
 * @param {number} [opts.heartbeatIntervalMs] - The millisec interval to send a heartbeat message
 * @param {number} [opts.reconnectAfterMs] - The optional function that returns the millisec
 * socket reconnect interval.
 *
 * Defaults to stepped backoff of:
 *
 * ```javascript
 * function(tries){
 *   return [10, 50, 100, 150, 200, 250, 500, 1000, 2000][tries - 1] || 5000
 * }
 * ````
 *
 * @param {number} [opts.rejoinAfterMs] - The optional function that returns the millisec
 * rejoin interval for individual channels.
 *
 * ```javascript
 * function(tries){
 *   return [1000, 2000, 5000][tries - 1] || 10000
 * }
 * ````
 *
 * @param {Function} [opts.logger] - The optional function for specialized logging, ie:
 *
 * ```javascript
 * function(kind, msg, data) {
 *   console.log(`${kind}: ${msg}`, data)
 * }
 * ```
 *
 * @param {number} [opts.longpollerTimeout] - The maximum timeout of a long poll AJAX request.
 *
 * Defaults to 20s (double the server long poll timer).
 *
 * @param {(Object|function)} [opts.params] - The optional params to pass when connecting
 * @param {string} [opts.binaryType] - The binary type to use for binary WebSocket frames.
 *
 * Defaults to "arraybuffer"
 *
 * @param {vsn} [opts.vsn] - The serializer's protocol version to send on connect.
 *
 * Defaults to DEFAULT_VSN.
*/
export default class Socket {
    stateChangeCallbacks: any;
    channels: any;
    sendBuffer: any;
    ref: any;
    timeout: any;
    transport: any;
    establishedConnections: number;
    defaultEncoder: any;
    defaultDecoder: any;
    closeWasClean: boolean;
    binaryType: any;
    connectClock: number;
    encode: any;
    decode: any;
    conn: any;
    heartbeatIntervalMs: any;
    rejoinAfterMs: (tries: any) => any;
    reconnectAfterMs: (tries: any) => any;
    logger: any;
    longpollerTimeout: any;
    params: any;
    endPoint: string;
    vsn: any;
    heartbeatTimeoutTimer: any;
    heartbeatTimer: any;
    pendingHeartbeatRef: null;
    reconnectTimer: Timer;
    location: any;
    constructor(endPoint: any, opts?: any);
    /**
     * Returns the LongPoll transport reference
     */
    getLongPollTransport(): typeof LongPoll;
    /**
     * Disconnects and replaces the active transport
     *
     * @param {Function} newTransport - The new transport class to instantiate
     *
     */
    replaceTransport(newTransport: any): void;
    /**
     * Returns the socket protocol
     *
     * @returns {string}
     */
    protocol(): "wss" | "ws";
    /**
     * The fully qualified socket url
     *
     * @returns {string}
     */
    endPointURL(): any;
    /**
     * Disconnects the socket
     *
     * See https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent#Status_codes for valid status codes.
     *
     * @param {Function} callback - Optional callback which is called after socket is disconnected.
     * @param {integer} code - A status code for disconnection (Optional).
     * @param {string} reason - A textual description of the reason to disconnect. (Optional)
     */
    disconnect(callback?: any, code?: any, reason?: any): void;
    /**
     *
     * @param {Object} params - The params to send when connecting, for example `{user_id: userToken}`
     *
     * Passing params to connect is deprecated; pass them in the Socket constructor instead:
     * `new Socket("/socket", {params: {user_id: userToken}})`.
     */
    connect(params?: any): void;
    /**
     * Logs the message. Override `this.logger` for specialized logging. noops by default
     * @param {string} kind
     * @param {string} msg
     * @param {Object} data
     */
    log(kind?: any, msg?: any, data?: any): void;
    /**
     * Returns true if a logger has been set on this socket.
     */
    hasLogger(): boolean;
    /**
     * Registers callbacks for connection open events
     *
     * @example socket.onOpen(function(){ console.info("the socket was opened") })
     *
     * @param {Function} callback
     */
    onOpen(callback: any): any;
    /**
     * Registers callbacks for connection close events
     * @param {Function} callback
     */
    onClose(callback: any): any;
    /**
     * Registers callbacks for connection error events
     *
     * @example socket.onError(function(error){ alert("An error occurred") })
     *
     * @param {Function} callback
     */
    onError(callback: any): any;
    /**
     * Registers callbacks for connection message events
     * @param {Function} callback
     */
    onMessage(callback: any): any;
    /**
     * Pings the server and invokes the callback with the RTT in milliseconds
     * @param {Function} callback
     *
     * Returns true if the ping was pushed or false if unable to be pushed.
     */
    ping(callback: any): boolean;
    /**
     * @private
     */
    clearHeartbeats(): void;
    onConnOpen(): void;
    /**
     * @private
     */
    heartbeatTimeout(): void;
    resetHeartbeat(): void;
    teardown(callback?: any, code?: any, reason?: any): any;
    waitForBufferDone(callback: any, tries?: number): void;
    waitForSocketClosed(callback: any, tries?: number): void;
    onConnClose(event: any): void;
    /**
     * @private
     */
    onConnError(error: any): void;
    /**
     * @private
     */
    triggerChanError(): void;
    /**
     * @returns {string}
     */
    connectionState(): "closed" | "connecting" | "open" | "closing";
    /**
     * @returns {boolean}
     */
    isConnected(): boolean;
    /**
     * @private
     *
     * @param {Channel}
     */
    remove(channel: any): void;
    /**
     * Removes `onOpen`, `onClose`, `onError,` and `onMessage` registrations.
     *
     * @param {refs} - list of refs returned by calls to
     *                 `onOpen`, `onClose`, `onError,` and `onMessage`
     */
    off(refs?: any): void;
    /**
     * Initiates a new channel for the given topic
     *
     * @param {string} topic
     * @param {Object} chanParams - Parameters for the channel
     * @returns {Channel}
     */
    channel(topic?: any, chanParams?: {}): Channel;
    /**
     * @param {Object} data
     */
    push(data?: any): void;
    /**
     * Return the next message ref, accounting for overflows
     * @returns {string}
     */
    makeRef(): any;
    sendHeartbeat(): void;
    flushSendBuffer(): void;
    onConnMessage(rawMessage?: any): void;
    leaveOpenTopic(topic?: any): void;
}
