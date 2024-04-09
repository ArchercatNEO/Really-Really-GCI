import Decimal from "break_infinity.js";

import player from "@/player";
import type { Currency } from "@/common/Currency";
import { Upgrade } from "@/common/Upgrade/Upgrade";
import type { GrassCube, GrassField } from "./GrassField";
import { Vector2 } from "./Cursor";

class NormalGrass implements Currency {
    get amount(): Decimal {
        return player.grass;
    }
    
    set amount(value: Decimal) {
        player.grass = value;
    }
}

export class NormalGrassUpgrade extends Upgrade {
    private _index: number;
    level(): number {
        player.grassUpgrades[this._index] ??= 0;
        return player.grassUpgrades[this._index];
    }
    
    private _levelCap: number;
    levelCap(): number {
        return this._levelCap;
    }
    
    icon(): string {
        return "images/Curr/Grass.png";
    }
    
    background(): string {
        return "images/Bases/GrassBase.png";
    }

    constructor(description: string, _index: number, _levelCap: number) {
        super(new NormalGrass(), description);
        this._index = _index;
        this._levelCap = _levelCap;
    }
    
    nextCost(): Decimal {
        return new Decimal(this.level() * 10);
    }
    
    buyOne(): boolean {
        if (this.level() >= this.levelCap()) { return false; }
        if (this.currency.amount.lt(this.nextCost())) { return false; }

        this.currency.amount = this.currency.amount.minus(this.nextCost());
        player.grassUpgrades[this._index] ??= 0;
        player.grassUpgrades[this._index]++;
        return true;
    }
}

export class NormalGrassCube implements GrassCube {
    position: Vector2;
    size: number = 20;

    public constructor(position: Vector2) {
        this.position = position;
    }

    collectGrass(): void {
        player.grass = player.grass.add(1);
    }
}

export class NormalGrassField implements GrassField {
    growSpeed(): number {
        return 1;
    }

    grassCap(): number {
        return 50;
    }

    cutterLength(): number {
        return 6;
    }

    spawnGrass(canvas: HTMLCanvasElement): GrassCube {
        const posX = Math.random() * canvas.width;
        const posY = Math.random() * canvas.height;
        return new NormalGrassCube(new Vector2(posX, posY));
    }
}