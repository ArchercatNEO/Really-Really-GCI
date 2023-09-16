type Button = JQuery<HTMLButtonElement>
type text = JQuery<HTMLParagraphElement>
type Div = JQuery<HTMLDivElement>

function NewUpgradeDiv(
  this: any,
  window: Div,
  resource: string,
  bgpath: string,
  upgrades: [string, string?][]
) {
  const tab: Div = $(`<div id="${resource}Header" class="UpgradeHeader">`)
  const space: Div = $(`<div id="${resource}ImgSpace" class="UpgradeBox ${resource}">`)

  const title = $(
    `<p id="${resource}Title" class="UpgradeTitle ${resource}">${resource} Upgrades</p>`
  ) as text
  const description = $(`<p class="UpgradeText"></p>`).hide() as text

  const exit = $(`<button class="CloseBtn">Close</button>`).hide() as Button
  const buy1 = $(`<button class="BuyBtn">Buy</button>`).hide() as Button
  const buy25 = $(`<button class="BuyBtn">Buy 25</button>`).hide() as Button
  const buyMax = $(`<button class="BuyBtn">Buy Max</button>`).hide() as Button

  exit.on('click', this, CloseUpgrade)

  bgpath += 'Base.png'

  for (let [target, srcpath] of upgrades) {
    if (srcpath === undefined) srcpath = 'Curr/' + target
    else srcpath = 'Icons/' + srcpath

    srcpath += '.png'

    space.append(NewUpgrade(target, bgpath, srcpath))
  }

  space.append(description)
  space.append(exit)
  space.append(buy1)
  space.append(buy25)
  space.append(buyMax)

  tab.append(title)
  tab.append(space)
  tab.appendTo(window)

  return tab
}

function NewUpgrade(this: any, id: string, bgsrc: string, src: string): Div {
  const upgrade = $(`<div id="${id}" class="upgrade">`) as Div

  const div = $(`<div class="stacker">`) as Div

  const base = $(`<img class="stack">`) as JQuery<HTMLImageElement>
  const btn = $(`<img class="stack">`) as JQuery<HTMLImageElement>
  const cost = $("<p class='cost'>") as text

  base.attr('src', `images/Bases/${bgsrc}`)
  btn.attr('src', `images/${src}`)
  btn.on('click', this, OpenUpgrade)

  cost.text('Cost: 56')

  div.append(base)
  div.append(btn)

  upgrade.append(div)
  upgrade.append(cost)

  return upgrade
}

function OpenUpgrade(data: any) {
  const div = data.target as HTMLImageElement

  let space = div.parentElement!
  while (!space.className.startsWith('UpgradeBox')) space = space.parentElement!

  const parent = $('#' + space.id)
  parent.children('.upgrade').hide()
  parent.children('p').show().text("I'll make this dynamic")
  parent.children('button').show()
}

function CloseUpgrade(data: any) {
  const div = data.target as HTMLImageElement

  let space = div.parentElement!
  while (!space.className.startsWith('UpgradeBox')) space = space.parentElement!

  const parent = $('#' + space.id)
  parent.children('.upgrade').show()
  parent.children('p').hide()
  parent.children('button').hide()
}
