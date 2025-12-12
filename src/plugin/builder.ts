import type { ISakikoLogger } from "src/log/interface";
import type { ISakikoPlugin } from "./interface";
import type { MatcherBuilder } from "src/core/matcher";
import type { Sakiko } from "src/core/sakiko";

export class ExtendablePlugin implements ISakikoPlugin {
    name?: string;
    displayName?: string;
    version?: string;
    description?: string;
    logger?: ISakikoLogger;

    private _sakiko?: Sakiko;
    private _matchers: Set<MatcherBuilder<any, any, any>> = new Set();

    _install: (sakiko: Sakiko) => boolean | Promise<boolean> = () => true;
    _uninstall: (sakiko: Sakiko) => boolean | Promise<boolean> = () => true;
    _cleanup: () => void | Promise<void> = () => {};

    _onBeforeInstall?: (sakiko: Sakiko) => boolean | Promise<boolean>;
    _onAfterInstall?: (sakiko: Sakiko) => void | Promise<void>;
    _onBeforeUninstall?: (sakiko: Sakiko) => boolean | Promise<boolean>;
    _onAfterUninstall?: (sakiko: Sakiko) => void | Promise<void>;
    _onBeforeCleanup?: () => void | Promise<void>;
    _onAfterCleanup?: () => void | Promise<void>;
    _onBeforeSakikoStart?: () => void | Promise<void>;

    install(sakiko: Sakiko) {
        this._sakiko = sakiko;

        return this._install(sakiko);
    }

    uninstall(sakiko: Sakiko) {
        return this._uninstall(sakiko);
    }

    cleanup() {
        this._cleanup();

        this.logger = undefined;
        this._sakiko = undefined;
    }

    addMatcher(...matcher: MatcherBuilder<any, any, any>[]) {
        for (const m of matcher) {
            this._matchers.add(m);
        }
    }

    removeMatcher(...matcher: MatcherBuilder<any, any, any>[]) {
        for (const m of matcher) {
            this._matchers.delete(m);
        }
    }

    beforeSakikoStart(): void | Promise<void> {
        this._matchers.forEach((m) => {
            this._sakiko?.match(m);
        });

        return this._onBeforeSakikoStart
            ? this._onBeforeSakikoStart()
            : undefined;
    }

    beforeInstall(sakiko: Sakiko): boolean | Promise<boolean> {
        return this._onBeforeInstall ? this._onBeforeInstall(sakiko) : true;
    }

    afterInstall(sakiko: Sakiko): void | Promise<void> {
        return this._onAfterInstall ? this._onAfterInstall(sakiko) : undefined;
    }

    beforeUninstall(sakiko: Sakiko): boolean | Promise<boolean> {
        return this._onBeforeUninstall ? this._onBeforeUninstall(sakiko) : true;
    }

    afterUninstall(sakiko: Sakiko): void | Promise<void> {
        return this._onAfterUninstall
            ? this._onAfterUninstall(sakiko)
            : undefined;
    }

    beforeCleanup(): void | Promise<void> {
        return this._onBeforeCleanup ? this._onBeforeCleanup() : undefined;
    }

    afterCleanup(): void | Promise<void> {
        return this._onAfterCleanup ? this._onAfterCleanup() : undefined;
    }
}

/**
 * 创建一个可扩展的 Sakiko 插件构建器。
 *
 * Create an extendable Sakiko plugin builder.
 */
export function createPlugin() {
    const _plugin = new ExtendablePlugin();

    return {
        build() {
            return _plugin;
        },
        name(name: string) {
            _plugin.name = name;
            return this;
        },
        displayName(displayName: string) {
            _plugin.displayName = displayName;
            return this;
        },
        version(version: string) {
            _plugin.version = version;
            return this;
        },
        description(description: string) {
            _plugin.description = description;
            return this;
        },
        onInstall(func: (sakiko: Sakiko) => boolean | Promise<boolean>) {
            _plugin._install = func;
            return this;
        },
        onUninstall(func: (sakiko: Sakiko) => boolean | Promise<boolean>) {
            _plugin._uninstall = func;
            return this;
        },
        onCleanup(func: () => void | Promise<void>) {
            _plugin._cleanup = func;
            return this;
        },
        onBeforeInstall(func: (sakiko: Sakiko) => boolean | Promise<boolean>) {
            _plugin._onBeforeInstall = func;
            return this;
        },
        onAfterInstall(func: (sakiko: Sakiko) => void | Promise<void>) {
            _plugin._onAfterInstall = func;
            return this;
        },
        onBeforeUninstall(
            func: (sakiko: Sakiko) => boolean | Promise<boolean>
        ) {
            _plugin._onBeforeUninstall = func;
            return this;
        },
        onAfterUninstall(func: (sakiko: Sakiko) => void | Promise<void>) {
            _plugin._onAfterUninstall = func;
            return this;
        },
        onBeforeCleanup(func: () => void | Promise<void>) {
            _plugin._onBeforeCleanup = func;
            return this;
        },
        onAfterCleanup(func: () => void | Promise<void>) {
            _plugin._onAfterCleanup = func;
            return this;
        },
        onBeforeSakikoStart(func: () => void | Promise<void>) {
            _plugin._onBeforeSakikoStart = func;
            return this;
        }
    };
}
