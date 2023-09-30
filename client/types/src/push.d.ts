/**
 * Initializes the Push
 * @param {Channel} channel - The Channel
 * @param {string} event - The event, for example `"phx_join"`
 * @param {Object} payload - The payload, for example `{user_id: 123}`
 * @param {number} timeout - The push timeout in milliseconds
 */
export default class Push {
    channel: any;
    event: any;
    payload: any;
    receivedResp: any;
    timeout: any;
    timeoutTimer: any;
    recHooks: any[];
    sent: boolean;
    ref: any;
    refEvent: any;
    constructor(channel: any, event: any, payload: any, timeout: any);
    /**
     *
     * @param {number} timeout
     */
    resend(timeout: any): void;
    /**
     *
     */
    send(): void;
    /**
     *
     * @param {*} status
     * @param {*} callback
     */
    receive(status: any, callback: any): this;
    /**
     * @private
     */
    reset(): void;
    /**
     * @private
     */
    matchReceive({ status, response, _ref }: {
        status: any;
        response: any;
        _ref: any;
    }): void;
    /**
     * @private
     */
    cancelRefEvent(): void;
    /**
     * @private
     */
    cancelTimeout(): void;
    /**
     * @private
     */
    startTimeout(): void;
    /**
     * @private
     */
    hasReceived(status: any): boolean;
    /**
     * @private
     */
    trigger(status: any, response: any): void;
}
