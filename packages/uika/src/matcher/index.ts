import type { EndsWithContext, StartsWithContext } from "./context";
import type { UmiriContext, UmiriEventMiddleware } from "@togawa-dev/umiri";

import { isMessageable } from "@togawa-dev/utils/mixin";
import { mergeContext } from "@togawa-dev/utils/context";

export function startswith<Context extends UmiriContext<any, any>>(
    text: string[] | string,
    caseSensitive = true
): UmiriEventMiddleware<
    Context,
    Readonly<Context> & Partial<StartsWithContext>
> {
    return (ctx: Context) => {
        if (!isMessageable(ctx.event)) {
            return [
                ctx as Readonly<Context> & Partial<StartsWithContext>,
                false
            ];
        }

        const message = caseSensitive
            ? ctx.event.plaintext()
            : ctx.event.plaintext().toLowerCase();

        const texts = Array.isArray(text) ? text : [text];
        for (let t of texts) {
            if (!caseSensitive) t = t.toLowerCase();

            if (message.startsWith(t)) {
                const extend: StartsWithContext = { startWithMatched: t };
                const next = mergeContext(ctx, extend) as Readonly<Context> &
                    StartsWithContext;
                return [next, true];
            }
        }

        return [ctx as Readonly<Context> & Partial<StartsWithContext>, false];
    };
}

export function endswith<Context extends UmiriContext<any, any>>(
    text: string[] | string,
    caseSensitive = true
): UmiriEventMiddleware<Context, Readonly<Context> & Partial<EndsWithContext>> {
    return (ctx: Context) => {
        if (!isMessageable(ctx.event)) {
            return [ctx as Readonly<Context> & Partial<EndsWithContext>, false];
        }

        const message = caseSensitive
            ? ctx.event.plaintext()
            : ctx.event.plaintext().toLowerCase();

        const texts = Array.isArray(text) ? text : [text];
        for (let t of texts) {
            if (!caseSensitive) t = t.toLowerCase();

            if (message.endsWith(t)) {
                const extend: EndsWithContext = { endWithMatched: t };
                const next = mergeContext(ctx, extend) as Readonly<Context> &
                    EndsWithContext;
                return [next, true];
            }
        }

        return [ctx as Readonly<Context> & Partial<EndsWithContext>, false];
    };
}
