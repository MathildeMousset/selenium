const cfg = document.forms[0];
const obj = document.querySelectorAll("object");
const svg = obj[0]; // main keyboard display

const selected = () => document.querySelector("#menu .selected");

async function setLayout(name) {
  const response = await fetch(`layouts/${name}.json`);
  const result   = await response.json();
  obj.forEach(view => {
    view.contentWindow.setLayout(result.keymap);
  });
}

const setConfig = () => {
  const mode = selected().id.substr(5);
  const data = Object.fromEntries(new FormData(cfg));
  setLayout(data.layout.toLowerCase());
  svg.contentWindow.setConfig(data.mode, !!data.vim);
  svg.contentWindow.setGeometry(data.geometry);
  document.querySelector("object.thumbs").contentWindow.setVim(!!data.vim);
};

svg.addEventListener("load", setConfig);
cfg.addEventListener("change", setConfig);

// layer views
const init = (name, layer3, layer4) => {
  const view = document.querySelector(`object.${name}`);
  view.addEventListener("load", () => {
    view.contentWindow.setLayer3(layer3);
    view.contentWindow.setLayer4(layer4);
  })
};
init("sym", "", "sym");
init("nav", "nav", "");
init("fun", "fun", "");
init("vim", "vim", "num");

// menu
document.querySelectorAll("#menu tr").forEach((tr) => {
  tr.addEventListener("click", (event) => {
    const mode = tr.id.substr(5);
    const data = Object.fromEntries(new FormData(cfg));
    svg.contentWindow.setConfig(mode, !!data.vim);
    selected().classList.remove("selected");
    tr.classList.add("selected");
  });
});
