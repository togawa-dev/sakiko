import { Sakiko } from "./core/sakiko";
import { sakiko } from "./global";

sakiko.init();

const p1 = {
    async install(sakiko: Sakiko) {
        return true;
    },
    uninstall() {
        return true;
    },
    cleanup() {}
};
await sakiko.install(p1);

await sakiko.run();
