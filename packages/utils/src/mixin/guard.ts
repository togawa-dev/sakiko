import type { Messageable, Targetable, hasSender } from "./mixin";

function isObjectLike(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
}

export function isHasSender(value: unknown): value is hasSender {
    return (
        isObjectLike(value) &&
        typeof (value as unknown as hasSender).getSenderId === "function"
    );
}

export function isTargetable(value: unknown): value is Targetable {
    return (
        isObjectLike(value) &&
        typeof (value as unknown as Targetable).mentioned === "function" &&
        typeof (value as unknown as Targetable).mentionedMe === "function"
    );
}

export function isMessageable(value: unknown): value is Messageable {
    return (
        isObjectLike(value) &&
        typeof (value as unknown as Messageable).summary === "function" &&
        typeof (value as unknown as Messageable).plaintext === "function"
    );
}
