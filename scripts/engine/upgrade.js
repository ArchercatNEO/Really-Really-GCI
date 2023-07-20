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
class Upgrade {
    constructor(resource, target, selector, layers) {
        this.autoSettings = "off";
        this.resource = resource;
        this.target = target;
        this.html = $(selector);
        this.layers = layers;
    }
}
function NewUpgradeDiv(resource, bgpath, upgrades) {
    const tab = $(`<div id="${resource}Header" class="UpgradeHeader">`);
    const space = $(`<div id="${resource}ImgSpace" class="UpgradeBox ${resource}">`);
    const title = $(`<p id="${resource}Title" class="UpgradeTitle ${resource}">${resource} Upgrades</p>`);
    const description = $(`<p class="UpgradeText"></p>`).hide();
    const exit = $(`<button class="CloseBtn">Close</button>`).hide();
    const buy1 = $(`<button class="BuyBtn">Buy</button>`).hide();
    const buy25 = $(`<button class="BuyBtn">Buy 25</button>`).hide();
    const buyMax = $(`<button class="BuyBtn">Buy Max</button>`).hide();
    exit.on("click", this, CloseUpgrade);
    bgpath += "Base.png";
    for (let [target, srcpath] of upgrades) {
        if (srcpath === undefined)
            srcpath = "Curr/" + target;
        else
            srcpath = "Icons/" + srcpath;
        srcpath += ".png";
        space.append(NewUpgrade(target, bgpath, srcpath));
    }
    space.append(description);
    space.append(exit);
    space.append(buy1);
    space.append(buy25);
    space.append(buyMax);
    tab.append(title);
    tab.append(space);
    tab.appendTo(".window[display!='none']");
    return tab;
}
function NewUpgrade(id, bgsrc, src) {
    const upgrade = $(`<div id="${id}" class="upgrade">`);
    const div = $(`<div class="stacker">`);
    const base = $(`<img class="stack">`);
    const btn = $(`<img class="stack">`);
    const cost = $("<p class='cost'>");
    base.attr("src", `images/Bases/${bgsrc}`);
    btn.attr("src", `images/${src}`);
    btn.on("click", this, OpenUpgrade);
    cost.text("Cost: 56");
    div.append(base);
    div.append(btn);
    upgrade.append(div);
    upgrade.append(cost);
    return upgrade;
}
function OpenUpgrade(data) {
    const div = data.target;
    let space = div.parentElement;
    while (!space.className.startsWith("UpgradeBox"))
        space = space.parentElement;
    const parent = $("#" + space.id);
    parent.children(".upgrade").hide();
    parent.children("p").show().text("I'll make this dynamic");
    parent.children("button").show();
}
function CloseUpgrade(data) {
    const div = data.target;
    let space = div.parentElement;
    while (!space.className.startsWith("UpgradeBox"))
        space = space.parentElement;
    const parent = $("#" + space.id);
    parent.children(".upgrade").show();
    parent.children("p").hide();
    parent.children("button").hide();
}
