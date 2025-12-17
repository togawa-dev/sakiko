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

export class Sakiko {
    private _started = false;
    private _withBlock = false;

    private _logger: ILogger = console;
    private _bus?: Umiri;
    private _snowflake: SnowFlake = snowflake;

    private _config: Record<string, any> = {};
    private _bots: Map<string, UmiriBot> = new Map();

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

    run() {}

    runWithBlock() {}
}
