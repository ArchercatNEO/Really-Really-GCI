"use strict";
class UpgradeNumbers {
    constructor(costFunc, effectFunc, costResource, effectResource, cap) {
        this.level = 0;
        this.cost = (level) => {
            let cost = 0;
            for (let i = this.level; i < this.level + level; i++)
                cost += costFunc(i);
            return cost;
        };
        this.buy = (level) => {
            const origin = this.level;
            while (this.level - origin < level && this.level < this.cap) {
                if (costResource.amount <= costFunc(this.level))
                    return;
                costResource.amount -= costFunc(this.level);
                this.level++;
            }
        };
        this.effect = () => effectFunc(this.level);
        this.buffs = effectResource;
        this.cap = cap;
    }
}
;
;
;
function GenerateCostFormula(base = 1, linear = 0, exponential = 1) {
    return (level) => {
        let cost = base;
        cost *= 1 + level * linear;
        cost *= Math.pow(exponential, level);
        return cost;
    };
}
function ExpandUpgrade(jquery) {
    jquery.parent().hide();
}
class Upgrade {
    constructor(resource, target, selector, layers) {
        this.autoSettings = "off";
        this.resource = resource;
        this.target = target;
        this.html = $(selector);
        this.layers = layers;
    }
}
