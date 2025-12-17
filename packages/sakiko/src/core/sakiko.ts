import type {
    ExtractBotType,
    Umiri,
    UmiriBot,
    UmiriContext,
    UmiriEvent,
    UmiriEventConstructor,
    UmiriEventMatcher
} from "@togawa-dev/umiri";
import { PKG_NAME, VERSION } from "../global";

import type { ILogger } from "@togawa-dev/utils";
import { MatcherBuilder } from "./matcher-builder";
import { snowflake, type SnowFlake } from "@togawa-dev/utils/snowflake";
import type { SakikoConfig } from "./config";
import { asciiArt } from "./ascii-art";

export class Sakiko<Config extends SakikoConfig = SakikoConfig> {
    // 一些生命周期标志量
    private _started = false;
    private _withBlock = false;

    // 一些常用内部实例
    private _logger: ILogger = console;
    private _bus?: Umiri;
    private _snowflake: SnowFlake = snowflake;

    // 存储配置项
    private _config: Config = {} as Config;

    // 存储机器人连接实例
    private _bots: Map<string, UmiriBot> = new Map();

    // 存储未注册的事件匹配器
    private _matchers: UmiriEventMatcher<any, any>[] = [];

    get version() {
        return VERSION;
    }

    get pkgName() {
        return PKG_NAME;
    }

    set logger(logger: ILogger) {
        if (this._started) {
            const e = new Error("cannot set logger after Sakiko is started");
            this._logger.error(e);
        }
        this._logger = logger;
    }

    get logger() {
        return this._logger;
    }

    get config() {
        return Object.freeze({ ...this._config });
    }

    get bus() {
        if (this._bus) {
            return this._bus;
        }
        const e = new Error("umiri is not initialized");
        this._logger.error(e);
        throw e;
    }

    get snowflake() {
        return this._snowflake;
    }

    defineConfig<NewConfig extends SakikoConfig>(conf: NewConfig) {
        this._config = { ...this._config, ...conf };
    }

    match<Events extends UmiriEvent<any, any>[]>(
        ...ets: { [K in keyof Events]: UmiriEventConstructor<Events[K]> }
    ): MatcherBuilder<
        ExtractBotType<Events[number]>,
        Events,
        UmiriContext<ExtractBotType<Events[number]>, Events>
    >;
    match(...matchers: UmiriEventMatcher<any, any>[]): number;
    match(...args: any[]) {
        // 将传入事件构造器作为参数的情况重载到生成 MatcherBuilder
        if (typeof args[0] === "function") {
            type Events = UmiriEvent<any, any>[];
            type Bot = ExtractBotType<Events[number]>;
            type Ctx = UmiriContext<Bot, Events>;
            return new MatcherBuilder<Bot, Events, Ctx>(this, args);
        }

        // 将传入匹配器作为参数的情况重载到注册匹配器
        const matchers = args as UmiriEventMatcher<any, any>[];
        for (const matcher of matchers) {
            if (!this._matchers.includes(matcher)) {
                this._matchers.push(matcher);
            }
        }
        return this._matchers.length;
    }

    addBot(bot: UmiriBot) {
        if (this._bots.has(bot.selfId)) {
        }
        this._bots.set(bot.selfId, bot);
    }

    removeBot(selfId: string) {
        this._bots.delete(selfId);
    }

    load() {}

    unload() {}

    start() {
        // 标识框架进入启动状态
        this._started = true;

        // 输出字符画
        if (!this.config.noAsciiArt) {
            console.log(asciiArt);
        }
    }

    startWithBlock() {}
}
