import { snowflakeIdBase36 } from "@/utils/snowflake";
import type { ISakikoEvent } from "./interface";

export abstract class SakikoEvent implements ISakikoEvent {
	private id: string = snowflakeIdBase36();
	private createTime: number = Date.now();

	static protocol: string = "";
	static types: number[] = [];

	senderId: string = "";
	selfId: string = "";

	abstract getTypes(): number[];
	abstract getProtocol(): string;

	getId(): string {
		return this.id;
	}

	getCreateTime(): number {
		return this.createTime;
	}

	getSenderId(): string {
		return this.senderId;
	}

	getSelfId(): string {
		return this.selfId;
	}

	toString(): string {
		return "";
	}
}
