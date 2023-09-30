/**
 *
 * Creates a timer that accepts a `timerCalc` function to perform
 * calculated timeout retries, such as exponential backoff.
 *
 * @example
 * let reconnectTimer = new Timer(() => this.connect(), function(tries){
 *   return [1000, 5000, 10000][tries - 1] || 10000
 * })
 * reconnectTimer.scheduleTimeout() // fires after 1000
 * reconnectTimer.scheduleTimeout() // fires after 5000
 * reconnectTimer.reset()
 * reconnectTimer.scheduleTimeout() // fires after 1000
 *
 * @param {Function} callback
 * @param {Function} timerCalc
 */
export default class Timer {
    callback: any;
    timerCalc: any;
    timer: any;
    tries: number;
    constructor(callback: any, timerCalc: any);
    reset(): void;
    /**
     * Cancels any previous scheduleTimeout and schedules callback
     */
    scheduleTimeout(): void;
}
