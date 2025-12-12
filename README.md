# Sakiko

TypeScript 聊天机器人框架 / 事件处理框架

跨平台、可拓展、API 简单易用，最小只需要一个 `index.ts` 即可部署

让开发聊天机器人简单如喝水

## 开发状态

目前 sakiko 框架本身的核心功能均已完成，但是在第一个正式版 Release 之前仍有可能出现大规模的 API 变动

简单来讲，现在的状态非常不是很适合拿来用（

开发组（虽然就一个活人）正在努力填充周边生态并改善框架的各种设计......

目前整个 sakiko project 的完成进度如下：

- sakiko | 聊天机器人框架 ✅
- umiri | 基于类型系统的本地事件总线实现 ✅
- sakiko-adapter-onebot-v11 | sakiko 的 onebot v11 协议适配器实现 ✅
- togawa-docs | sakiko project 的在线文档 / 教程站 ⚠️ 编写中
- mutsumi | 基于模式匹配和类型验证的高级命令匹配/解析库 ⚠️ 开发中
- uika | sakiko 的可选高级功能扩展 ❌ 计划开发
- nyamu | 基于 satori 的图像模板渲染工具 ❌ 计划开发

## 使用

sakiko 支持 Node.js / Bun （理论上支持 Deno 运行时环境，但是没有进行测试）

### 安装

```bash
# NPM
npm install @togawadev/sakiko

# PNPM
pnpm add @togawadev/sakiko

# Bun
bun add @togawadev/sakiko
```

### 快速开始

```typescript
import { sakiko } from "@togawadev/sakiko";
import { OB11Adapter } from "@togawadev/sakiko-adapter-onebot"; // 导入 Onebot V11 适配器作为示例

sakiko.withConfig({
    /* 可以通过withConfig方法来向sakiko实例注入配置项 */
    /* ... */
});

sakiko.init();

// 可以通过 install 方法来安装插件/适配器

await sakiko.install(OB11Adapter);

await sakiko.run();
```

### 消息响应

```typescript
import { sakiko, onStartWith } from "@togawadev/sakiko";
import {
    GroupMessageEvent,
    PrivateMessageEvent,
    message
} from "@togawadev/sakiko-adapter-onebot-v11";

const exampleMatcher = onStartsWith("foo")
    .ofEvent(GroupMessageEvent, PrivateMessageEvent)
    .priority(0) // 事件处理器的优先级，数字越大则处理越早
    .handle(async (bot, event, ctx) => {
        // TypeScript 会自动根据匹配器和你传入的事件类型推测处理器参数的类型
        // 所以你可以在这里享用完整的类型提示能力
        bot.sendMessage(event, message.text("foobar"));
        return true;
    });

sakiko.match(exampleMatcher);

const anotherMatcher = onEndsWith(["foo", "bar"])
    .ofEvent(GroupMessageEvent)
    .block() // 启用对后续优先级上的处理器的阻塞
    .handle(async (bot, event, ctx) => {
        bot.sendMessage(event, message.text("foobar"));
        return false; // 启用 block 时，如果处理器函数返回了false，那么将会阻止后续优先级的处理
    });

sakiko.match(anotherMatcher);
```
