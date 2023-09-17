import Decimal from 'break_infinity.js'

export interface Upgrade {
    description: string
    level: number
    cost: (level: number) => number
    effect: (level: number) => number
    bg: string
    icon: string
    config: UpgradeData
}

export interface UpgradeData {
    description: string
    cost: (level: number) => number
    currency: () => Decimal | number
    bg: string
    icon: string
}

export class Upgrade implements Upgrade {
    description: string
    cost: (level: number) => number
    bg: string
    icon: string
    config: UpgradeData

    constructor(data: UpgradeData) {
        this.description = data.description
        this.cost = data.cost
        this.bg = data.bg
        this.icon = data.icon
        this.config = data
    }

    get isAffordable(): boolean {
        return new Decimal(this.currency).gte(this.cost(56))
    }

    get currency(): number | Decimal {
        return this.config.currency()
    }
}

/*abstract class UpgradeLayer {
    isFree = false
    abstract resource: Resource

    level: number = 0
    cap: number

    cost: Function
    effect: Function

    buyNext = () => {
        if (this.level >= this.cap) return
        if (this.cost(this.level) < this.resource.amount) {
            if (!this.isFree) this.resource.amount -= this.cost(this.level)
            this.level++
        }
    }

    buyMax = () => {
        for (let i = this.level; i < this.cap; i++) this.buyNext()
    }

    constructor(costFunc: Formula, effectFunc: Formula, cap: number) {
        this.cost = costFunc
        this.effect = () => effectFunc(this.level)
        this.cap = cap
    }
}

interface Formula {
    (level: number): number
}
interface Resource {
    amount: number
    name: string
    bg: string
}
interface UpgradeData {
    resource: Resource
    target: string
    selector: string
    layers: UpgradeLayer[]
}

function GenerateCostFormula(base: number = 1, linear: number = 0, exponential: number = 1) {
    return (level: number) => {
        let cost = base
        cost *= 1 + level * linear
        cost *= exponential ** level

        return cost
    }
}

class Upgradey {
    resource: Resource
    target: string

    layers: UpgradeLayer[]
    html: JQuery<HTMLImageElement>

    autoSettings: 'off' | 'capped' | 'on' = 'off'
    isFree = false

    constructor(data: UpgradeData) {
        NewUpgrade(data.resource.name + ' ' + data.target, data.resource.name, data.resource.bg)
        this.resource = data.resource
        this.target = data.target
        this.html = $(data.selector)
        this.layers = data.layers
    }
}
*/
