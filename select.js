const cfg = document.forms[0];
const obj = document.querySelectorAll("object");
const svg = (className) => document.querySelector(`object.${className}`).contentWindow;

const setConfig = () => {
  const data = Object.fromEntries(new FormData(cfg));
  svg("main").setConfig(data.mode, !!data.vim);
  svg("main").setGeometry(data.geometry);
  obj.forEach(view => {
    view.contentWindow.setLayout(data.layout.toLowerCase());
  });
  svg("sym").setLayer3("");
  svg("sym").setLayer4("sym");
  svg("nav").setLayer3("nav");
  svg("nav").setLayer4("");
  svg("fun").setLayer3("fun");
  svg("fun").setLayer4("");
  svg("vim").setLayer3("vim");
  svg("vim").setLayer4("num");
}

obj[0].addEventListener("load", setConfig);
cfg.addEventListener("change", setConfig);
