import type Decimal from "break_infinity.js";

export interface Currency {
    get amount(): Decimal;
    set amount(value: Decimal);
}
