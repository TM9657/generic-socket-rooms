import Push from "./push";
import Timer from "./timer";
/**
 *
 * @param {string} topic
 * @param {(Object|function)} params
 * @param {Socket} socket
 */
export default class Channel {
    state: string;
    topic: any;
    params: any;
    socket: any;
    bindings: any[];
    bindingRef: number;
    timeout: any;
    joinedOnce: boolean;
    joinPush: Push;
    pushBuffer: any[];
    stateChangeRefs: any[];
    rejoinTimer: Timer;
    constructor(topic: any, params: any, socket: any);
    /**
     * Join the channel
     * @param {integer} timeout
     * @returns {Push}
     */
    join(timeout?: any): Push;
    /**
     * Hook into channel close
     * @param {Function} callback
     */
    onClose(callback: any): void;
    /**
     * Hook into channel errors
     * @param {Function} callback
     */
    onError(callback: any): number;
    /**
     * Subscribes on channel events
     *
     * Subscription returns a ref counter, which can be used later to
     * unsubscribe the exact event listener
     *
     * @example
     * const ref1 = channel.on("event", do_stuff)
     * const ref2 = channel.on("event", do_other_stuff)
     * channel.off("event", ref1)
     * // Since unsubscription, do_stuff won't fire,
     * // while do_other_stuff will keep firing on the "event"
     *
     * @param {string} event
     * @param {Function} callback
     * @returns {integer} ref
     */
    on(event: any, callback: any): number;
    /**
     * Unsubscribes off of channel events
     *
     * Use the ref returned from a channel.on() to unsubscribe one
     * handler, or pass nothing for the ref to unsubscribe all
     * handlers for the given event.
     *
     * @example
     * // Unsubscribe the do_stuff handler
     * const ref1 = channel.on("event", do_stuff)
     * channel.off("event", ref1)
     *
     * // Unsubscribe all handlers from event
     * channel.off("event")
     *
     * @param {string} event
     * @param {integer} ref
     */
    off(event: any, ref: any): void;
    /**
     * @private
     */
    canPush(): boolean;
    /**
     * Sends a message `event` to phoenix with the payload `payload`.
     * Phoenix receives this in the `handle_in(event, payload, socket)`
     * function. if phoenix replies or it times out (default 10000ms),
     * then optionally the reply can be received.
     *
     * @example
     * channel.push("event")
     *   .receive("ok", payload => console.log("phoenix replied:", payload))
     *   .receive("error", err => console.log("phoenix errored", err))
     *   .receive("timeout", () => console.log("timed out pushing"))
     * @param {string} event
     * @param {Object} payload
     * @param {number} [timeout]
     * @returns {Push}
     */
    push(event: any, payload: any, timeout?: any): Push;
    /** Leaves the channel
     *
     * Unsubscribes from server events, and
     * instructs channel to terminate on server
     *
     * Triggers onClose() hooks
     *
     * To receive leave acknowledgements, use the `receive`
     * hook to bind to the server ack, ie:
     *
     * @example
     * channel.leave().receive("ok", () => alert("left!") )
     *
     * @param {integer} timeout
     * @returns {Push}
     */
    leave(timeout?: any): Push;
    /**
     * Overridable message hook
     *
     * Receives all events for specialized message handling
     * before dispatching to the channel callbacks.
     *
     * Must return the payload, modified or unmodified
     * @param {string} event
     * @param {Object} payload
     * @param {integer} ref
     * @returns {Object}
     */
    onMessage(_event?: any, payload?: any, _ref?: any, _var?: any): any;
    /**
     * @private
     */
    isMember(topic: any, event: any, payload: any, joinRef: any): boolean;
    /**
     * @private
     */
    joinRef(): any;
    /**
     * @private
     */
    rejoin(timeout?: any): void;
    /**
     * @private
     */
    trigger(event?: any, payload?: any, ref?: any, joinRef?: any): void;
    /**
     * @private
     */
    replyEventName(ref: any): string;
    /**
     * @private
     */
    isClosed(): boolean;
    /**
     * @private
     */
    isErrored(): boolean;
    /**
     * @private
     */
    isJoined(): boolean;
    /**
     * @private
     */
    isJoining(): boolean;
    /**
     * @private
     */
    isLeaving(): boolean;
}
