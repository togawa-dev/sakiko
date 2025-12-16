import { type Context } from "@togawa-dev/utils/context";

export type StartsWithContext = Context<{
    startWithMatched: string;
}>;

export type EndsWithContext = Context<{
    endWithMatched: string;
}>;

export type FullMatchContext = Context<{
    fullMatched: string;
}>;

export type ContainsContext = Context<{
    containsMatched: string;
}>;

export type RegexContext = Context<{
    regexGroups: RegExpMatchArray;
    regexDict?: Record<string, string | undefined>;
}>;
