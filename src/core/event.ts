import { snowflakeIdBase36 } from "@/utils/snowflake";
import type { ISakikoEvent } from "./interface";

export abstract class SakikoEvent implements ISakikoEvent {
	private id: string = snowflakeIdBase36();
	private createTime: number = Date.now();

	static protocol: string = "";
	static types: number[] = [];

	constructor(
		public selfId: string = "",
		public senderId: string = "",
	) {}

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

	isType(...type: number[]) {
		// 如果传入的事件类型中有任意一个在当前事件的类型列表中存在，则返回true
		return type.some((t) => this.getTypes().includes(t));
	}
}
