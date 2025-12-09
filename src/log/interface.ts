/**
 * Sakiko 的内部日志接口实现，可以通过实现此接口来自定义日志记录器。
 *
 * the internal logging interface for Sakiko, which can be customized by implementing this interface.
 * @interface ISakikoLogger
 * @since 0.4.0
 */
export interface ISakikoLogger {
    trace(...args: any[]): void;
    debug(...args: any[]): void;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
}

/**
 * 检查给定的对象是否实现了 ISakikoLogger 接口。
 *
 * checks whether the given object implements the ISakikoLogger interface.
 * @param obj - 要检查的对象 / the object to check
 * @returns 如果对象实现了 ISakikoLogger 接口则返回 true，否则返回 false / true if the object implements the ISakikoLogger interface, false otherwise
 * @since 0.4.0
 */
export function isSakikoLogger(obj: any): obj is ISakikoLogger {
    return (
        obj &&
        typeof obj.trace === "function" &&
        typeof obj.debug === "function" &&
        typeof obj.info === "function" &&
        typeof obj.warn === "function" &&
        typeof obj.error === "function"
    );
}
