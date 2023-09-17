import Decimal from 'break_infinity.js'
import * as ADNotations from '@antimatter-dimensions/notations'

const scientific = new ADNotations.ScientificNotation()

export function format(
    number: Decimal | number | string,
    places: number,
    placesUnder1000: number
): string {
    return scientific.format(number, places, placesUnder1000)
}
