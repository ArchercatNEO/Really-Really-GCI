class UpgradeNumbers {

    level: number = 0;
    cap: number;

    cost: Function;
    buy: Function;
    effect: Function;
    buffs: Resource

    

    constructor(costFunc: Formula, effectFunc: Formula, costResource: Resource, effectResource: Resource, cap: number){
        
        this.cost = (level: number) => {
            let cost = 0;
            for (let i = this.level; i < this.level + level; i++)
                cost += costFunc(i);
            return cost;
        }
        
        this.buy = (level: number) => {
            const origin = this.level;
            while (this.level - origin < level && this.level < this.cap){
                if (costResource.amount <= costFunc(this.level)) return;

                costResource.amount -= costFunc(this.level);
                this.level++;
            }
        }
        
        this.effect = () => effectFunc(this.level);
        this.buffs = effectResource;
        this.cap = cap;
    }
}

interface Formula {(level: number): number};
interface Resource {amount: number};
interface Level {amount: number};


function GenerateCostFormula(base: number = 1, linear: number = 0, exponential: number = 1){
    return (level: number) => {
        let cost = base;
        cost *= 1 + level * linear;
        cost *= exponential ** level;

        return cost;
    }
}

function ExpandUpgrade(jquery: JQuery<HTMLElement>){
    jquery.parent().hide();
}

class Upgrade {

    resource: Resource;
    target: Resource | Level;

    layers: UpgradeNumbers[];
    html: JQuery<HTMLImageElement>;

    autoSettings: "off" | "capped" | "on" = "off";

    constructor(resource: Resource, target: Resource, selector: string, layers: UpgradeNumbers[]){
        this.resource = resource;
        this.target = target;
        this.html = $(selector);
        this.layers = layers;
    }
}