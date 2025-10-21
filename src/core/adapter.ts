import { AdapterEventBusUnsetError } from "@/error/errors";
import type { ISakikoAdapter, ISakikoEventBus } from "./interface";

export abstract class SakikoAdapter implements ISakikoAdapter {
	private eventBus: ISakikoEventBus | null = null;

	abstract getAdapterName(): string;

	getEventBus(): ISakikoEventBus {
		if (this.eventBus !== null) {
			return this.eventBus;
		} else {
			throw new AdapterEventBusUnsetError(this.getAdapterName());
		}
	}

	setEventBus(eventBus: ISakikoEventBus): void {
		this.eventBus = eventBus;
	}
}
