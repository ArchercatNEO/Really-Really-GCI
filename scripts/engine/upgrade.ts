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

function NewUpgradeDiv(this: any, resource: string, bgpath: string, upgrades: [string, string?][]){

    const tab: JQuery<HTMLDivElement> = $(`<div id="${resource}Header" class="UpgradeHeader">`);
    const space: JQuery<HTMLDivElement> = $(`<div id="${resource}ImgSpace" class="UpgradeBox ${resource}">`);

    const title = $(`<p id="${resource}Title" class="UpgradeTitle ${resource}">${resource} Upgrades</p>`) as JQuery<HTMLParagraphElement>;
    const description = $(`<p class="UpgradeText"></p>`).hide() as JQuery<HTMLParagraphElement>;

    const exit = $(`<button class="CloseBtn">Close</button>`).hide() as JQuery<HTMLButtonElement>
    const buy1 = $(`<button class="BuyBtn">Buy</button>`).hide() as JQuery<HTMLButtonElement>
    const buy25 = $(`<button class="BuyBtn">Buy 25</button>`).hide() as JQuery<HTMLButtonElement>
    const buyMax= $(`<button class="BuyBtn">Buy Max</button>`).hide() as JQuery<HTMLButtonElement>

    exit.on("click", this, CloseUpgrade)


    bgpath += "Base.png";

    for (let [target, srcpath] of upgrades){
        
        if (srcpath === undefined) srcpath = "Curr/" + target;
        else srcpath = "Icons/" + srcpath;
        
        srcpath += ".png";
    
        space.append(NewUpgrade(target, bgpath, srcpath));
    }
        

    space.append(description);
    space.append(exit)
    space.append(buy1)
    space.append(buy25)
    space.append(buyMax)

    tab.append(title);
    tab.append(space);
    tab.appendTo(".window[display!='none']");

    return tab;
}

function NewUpgrade(this: any, id: string, bgsrc: string, src: string): JQuery<HTMLDivElement>{
    
    const upgrade = $(`<div id="${id}" class="upgrade">`) as JQuery<HTMLDivElement>;
    
    const div = $(`<div class="stacker">`) as JQuery<HTMLDivElement>;
    
    const base = $(`<img class="stack">`) as JQuery<HTMLImageElement>;
    const btn = $(`<img class="stack">`) as JQuery<HTMLImageElement>;
    const cost = $("<p class='cost'>") as JQuery<HTMLParagraphElement>;

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

function OpenUpgrade(data: any){

    const div = data.target as HTMLImageElement;
    
    let space = div.parentElement!;
    while (!space.className.startsWith("UpgradeBox")) space = space.parentElement!;

    
    const parent = $("#" + space.id);
    parent.children(".upgrade").hide();
    parent.children("p").show().text("I'll make this dynamic")
    parent.children("button").show()
}

function CloseUpgrade(data: any){

    const div = data.target as HTMLImageElement;
    
    let space = div.parentElement!;
    while (!space.className.startsWith("UpgradeBox")) space = space.parentElement!;

    
    const parent = $("#" + space.id);
    parent.children(".upgrade").show();
    parent.children("p").hide()
    parent.children("button").hide()
}