import type { ILogger } from "@togawa-dev/utils";

/**
 * 用于让插件扩展 Sakiko 的配置项扩展接口
 *
 * Used for plugins to extend Sakiko's configuration options
 */
export interface SakikoConfigExtension {}

// TypeScript 中可以通过 declaration merging 实现接口的扩展
// 例如，插件可以通过以下方式扩展 SakikoConfig 接口：
// ```typescript
// declare module "sakiko" {
//     interface SakikoConfigExtension {
//         foo?: {
//             bar: string;
//         };
//     }
// }
// ```

/**
 * Sakiko 的配置项接口
 *
 * The configuration options interface for Sakiko
 */
export type SakikoConfig = {
    /**
     * 自定义日志记录器，如果传入此选项，Sakiko 将使用该日志记录器替换默认的 tslog 日志记录器。
     *
     * The custom logger to use. If provided, Sakiko will replace the default tslog logger with this one.
     *
     * @default undefined
     */
    logger?: ILogger;

    /**
     * 是否禁用启动时的 ASCII 字符画。
     *
     * Whether to disable the ASCII art on startup.
     *
     * @default false
     */
    noAsciiArt?: boolean;
} &
    // 用于让插件扩展 Sakiko 的配置项
    SakikoConfigExtension;
