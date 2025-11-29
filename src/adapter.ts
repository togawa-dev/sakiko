import { randomUUID } from "node:crypto";
import type { Sakiko } from ".";

export interface ISakikoAdapter {
  name: string;
  version: string;
  protocolName: string;
  platformName: string;

  uuid: string;
  init(sakiko: Sakiko): void;
  start(): void | Promise<void>;
  stop(): void | Promise<void>;
}
