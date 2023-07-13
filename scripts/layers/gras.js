"use strict";
function InitGrass() {
    NewUpgradeDiv("Grass", "Grass", [
        ["Grass"],
        ["Arcs"]
    ]);
}
function NewUpgradeDiv(resource, bgpath, upgrades) {
    const tab = $(`<div id="${resource}Header" class="UpgradeHeader">`);
    const space = $(`<div id="${resource}ImgSpace" class="UpgradeBox">`);
    const text = $(`<p id="${resource}Title" class="UpgradeTitle"></p>`);
    text.text(`${resource} Upgrades`);
    bgpath += "Base.png";
    for (let [target, srcpath] of upgrades) {
        if (srcpath === undefined)
            srcpath = "Curr/" + target;
        else
            srcpath = "Icons/" + srcpath;
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
function NewUpgrade(id, bgsrc, src) {
    const div = $(`<div id="${id}" class="stacker">`);
    const base = $(`<img class="stack">`);
    const btn = $(`<img class="stack">`);
    base.attr("src", `images/Bases/${bgsrc}`);
    btn.attr("src", `images/${src}`);
    div.append(base);
    div.append(btn);
    return div;
}
