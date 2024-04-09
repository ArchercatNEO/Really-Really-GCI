import { reactive } from "vue";
import Decimal from "break_infinity.js";

class Player {
    //Other information
    position: [number, number] = [0, 0];

    //Grass things
    grass: Decimal = new Decimal(0);
    grassUpgrades: number[] = [];
}

const player = reactive(new Player());
export { player as default };
