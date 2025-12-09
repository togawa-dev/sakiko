import type { SakikoBot } from "@/core/bot";
import type {
    EventConstructor,
    EventHandler,
    EventHandlerMiddleware,
    HandlerContextConstructor,
    IHandlerContext
} from "@grouptogawa/umiri";
import type { SakikoEvent } from "./event";
import type { SakikoAdapter } from "@/plugin/adapter";
import { sakiko } from "../global";
import type { Sakiko } from "./sakiko";

/**
 * Bot 构造函数类型
 *
 * Bot constructor type
 */
type BotConstructor<Bot extends SakikoBot<any>> = new (...args: any[]) => Bot;

/**
 * 匹配器函数类型
 *
 * Matcher function type
 */
type MatcherFn<
    Bot extends SakikoBot<any>,
    Context extends IHandlerContext,
    Event extends SakikoEvent<any>
> = (bot: Bot, event: Event, context: Context) => Promise<boolean> | boolean;

/**
 * 事件处理器构建器
 *
 * Event handler builder
 */
export class MatcherBuilder<
    Bot extends SakikoBot<any>,
    Context extends IHandlerContext,
    Events extends SakikoEvent<any>[]
> {
    _priority = 0;
    _block = false;
    _timeout = 0;
    _mws = [] as EventHandlerMiddleware<any, any>[];
    _fn?: MatcherFn<Bot, Context, Events[number]>;

    constructor(
        public bot: BotConstructor<Bot>,
        public ct: HandlerContextConstructor<Context>,
        public ets: { [K in keyof Events]: EventConstructor<Events[K]> }
    ) {}

    /**
     * 设置事件处理器的优先级
     *
     * set the priority of the event handler.
     * @param priority 优先级 the priority
     * @returns 事件处理器构建器 this event handler builder
     */
    priority(priority: number) {
        this._priority = priority;
        return this;
    }

    /**
     * 设置事件处理器是否为阻塞型
     *
     * set whether the event handler is blocking.
     * @param block 是否为阻塞型 whether to be blocking
     * @returns 事件处理器构建器 this event handler builder
     */
    block(block: boolean = true) {
        this._block = block;
        return this;
    }

    /**
     * 设置事件处理器的超时时间
     *
     * set the timeout for the event handler.
     * @param timeout 超时时间 the timeout
     * @returns 事件处理器构建器 this event handler builder
     */
    timeout(timeout: number) {
        this._timeout = timeout;
        return this;
    }

    /**
     * 为事件处理器添加中间件
     *
     * add middleware to the event handler.
     * @param mw 中间件 the middleware
     * @returns 事件处理器构建器 this event handler builder
     */
    use(mw: EventHandlerMiddleware<Events[number], Context>) {
        this._mws.push(mw);
        return this;
    }

    /**
     * 设置事件处理函数
     *
     * set the event handler function.
     * @param fn 事件处理函数 the event handler function
     * @returns 事件处理器 the event handler
     */
    handle(fn: MatcherFn<Bot, Context, Events[number]>) {
        this._fn = fn;
        return this;
    }

    /**
     * 构建事件处理器，你不应该直接调用它，当一个 matcher 被注册到 sakiko 时会自动调用它
     *
     * build the event handler.
     * @param sakiko Sakiko 实例 the Sakiko instance
     * @returns 事件处理器 the event handler
     */
    build(sakiko: Sakiko) {
        return {
            ets: this.ets,
            ct: this.ct,
            priority: this._priority,
            block: this._block,
            timeout: this._timeout > 0 ? this._timeout : undefined,
            middlewares: this._mws.length > 0 ? this._mws : undefined,
            handle: (event: Events[number], context: Context) => {
                // 这里需要封装一个bot查询的能力注入到handle中
                const bot = sakiko.getBot(event.getSelfId());
                if (!bot) {
                    const e = new Error(
                        `bot with selfId ${event.getSelfId()} not found, cannot handle ${event.constructor.name} with id ${event.getEventId()}`
                    );
                    sakiko.getSakikoLogger().error(e);
                    throw e;
                }
                // 如果成功提取到bot，则尝试检测它是否是正确的类型
                if (bot && bot instanceof this.bot) {
                    // 注入正确类型的bot
                    return this._fn
                        ? this._fn(bot as Bot, event, context)
                        : Promise.resolve(true);
                } else {
                    const e = new Error(
                        `bot with selfId ${event.getSelfId()} is not instance of expected bot class, cannot handle ${event.constructor.name} with id ${event.getEventId()}`
                    );
                    sakiko.getSakikoLogger().error(e);
                    throw e;
                }
            },
            registered: false
        } as EventHandler<Events[number], Context>;
    }
}

/**
 * 创建一个事件处理器构建器
 *
 * create an event handler builder
 */
export function buildMatcherFor<
    Bot extends SakikoBot<any>,
    Context extends IHandlerContext,
    Events extends SakikoEvent<any>[]
>(
    bot: BotConstructor<Bot>,
    ct: HandlerContextConstructor<Context>,
    ...ets: { [K in keyof Events]: EventConstructor<Events[K]> }
) {
    return new MatcherBuilder<Bot, Context, Events>(bot, ct, ets);
}
