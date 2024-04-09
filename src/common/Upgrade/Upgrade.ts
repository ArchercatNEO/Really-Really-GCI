import type Decimal from "break_infinity.js";
import type { Currency } from "../Currency";

export abstract class Upgrade {
    /** Currency the upgrade acts upon */
    public readonly currency: Currency;
    
    /** Description of the upgrade in expanded view */
    public readonly description: string;

    constructor(currency: Currency, description: string) {
        this.currency = currency;
        this.description = description;
    }
    
    /** The current level of the upgrade */
    abstract level(): number;
    /** The max level of the upgrade */
    abstract levelCap(): number;
    
    /** The next cost of an upgrde */
    abstract nextCost(): Decimal;

    /** 
     * return {boolean} whether buying was successful or not 
     */
    abstract buyOne(): boolean;

    /** Buy the next 25 levels */
    buyNext(): void {
        const remaining = this.level() % 25;
        for (let purchased = 25 - remaining; purchased > 0; purchased--) {
            if (!this.buyOne()) {
                break;
            }
        }
    }

    buyMax() {
        while (this.buyOne()) {
            continue;
        }
    }

    /** The icon on top of the upgrade */
    abstract icon(): string;
    /** The background behind the upgrade */
    abstract background(): string;
}