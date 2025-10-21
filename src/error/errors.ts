/** 事件总线未初始化错误，这个错误表示适配器尝试获取事件总线时，发现它尚未被正确设置。*/
export class AdapterEventBusUnsetError extends Error {
	constructor(adapterName: string) {
		super(
			`适配器 ${adapterName} 的事件总线未初始化。请确保在使用适配器之前正确设置事件总线。`,
		);
		this.name = "AdapterEventBusUnsetError";

		Object.setPrototypeOf(this, new.target.prototype);

		if (Error.captureStackTrace)
			Error.captureStackTrace(this, AdapterEventBusUnsetError);
	}
}
