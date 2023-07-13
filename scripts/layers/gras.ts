function InitGrass(){

    NewUpgradeDiv("Grass", "Grass" , [
        ["Grass"],
        ["Arcs"]
    ])

}

function NewUpgradeDiv(resource: string, bgpath: string, upgrades: [string, string?][]){

    const tab = $(`<div id="${resource}Header" class="UpgradeHeader">`) as JQuery<HTMLDivElement>;
    const space = $(`<div id="${resource}ImgSpace" class="UpgradeBox">`) as JQuery<HTMLDivElement>;

    const text = $(`<p id="${resource}Title" class="UpgradeTitle"></p>`) as JQuery<HTMLParagraphElement>;
    text.text(`${resource} Upgrades`)

    bgpath += "Base.png";

    for (let [target, srcpath] of upgrades){
        
        if (srcpath === undefined) srcpath = "Curr/" + target;
        else srcpath = "Icons/" + srcpath;
        
        srcpath += ".png";
    
        space.append(NewUpgrade(target, bgpath, srcpath));
        console.log(bgpath);
        console.log(srcpath);
    }
        

    tab.append(text);
    tab.append(space);
    tab.appendTo(".window[display!='none']");

    return tab;
}

function NewUpgrade(id: string, bgsrc: string, src: string): JQuery<HTMLDivElement>{
    
    const div = $(`<div id="${id}" class="stacker">`) as JQuery<HTMLDivElement>;
    const base = $(`<img class="stack">`) as JQuery<HTMLImageElement>;
    const btn = $(`<img class="stack">`) as JQuery<HTMLImageElement>;

    base.attr("src", `images/Bases/${bgsrc}`);
    btn.attr("src", `images/${src}`);

    div.append(base);
    div.append(btn);

    return div;
}