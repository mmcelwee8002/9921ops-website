// Add projects here: the showcase and project chooser use this same list.
const projects = [
  { title: "Trace", category: "Puzzle game", url: "https://mmcelwee8002.github.io/trace/", description: "Find your route through a grid of walls, keys, arrows, and switch-controlled gates. A mobile-first puzzle game with a growing level campaign.", skills: "Game rules · Level generation · Accessible themes" },
  { title: "Poll Zero", category: "College football rankings", url: "https://poll-zero.vercel.app/", description: "Explore college football rankings calculated from opponents’ results, with score breakdowns that show how each team earns its rating.", skills: "API integration · Ranking calculations · Data presentation" },
  { title: "Clear Grid Solutions", category: "Digital cleanup services", url: "https://mmcelwee8002.github.io/ClearGrid-Solutions/", description: "A service website showcasing clearer spreadsheets, documents, and presentations through before-and-after examples.", skills: "Responsive web design · Before-and-after showcase · Service presentation" }
];
const carousel = document.querySelector(".carousel-placeholder");
const cardsHost = document.querySelector("#project-cards");
const tabsHost = document.querySelector("#project-tabs");
const dialog = document.querySelector("#project-dialog");
let selectedIndex = 0;
let pointer = null;
const cards = projects.map((project, index) => {
  const card = document.createElement("article");
  card.className = "orbit-card";
  const browserBar = document.createElement("div");
  browserBar.className = "browser-bar";
  browserBar.textContent = project.title;
  const viewport = document.createElement("div");
  viewport.className = "preview-viewport";
  const frame = document.createElement("iframe");
  frame.src = project.url;
  frame.title = `${project.title} live website preview`;
  frame.loading = "lazy";
  frame.tabIndex = -1;
  frame.setAttribute("aria-hidden", "true");
  // Preview frames cannot capture gestures or keyboard focus; interactive mode is separate.
  frame.inert = true;
  viewport.inert = true;
  viewport.append(frame);
  const select = document.createElement("button");
  select.type = "button";
  select.className = "select-project";
  select.setAttribute("aria-label", `Select ${project.title}`);
  select.addEventListener("click", () => {
    if (suppressClick) return;
    selectedIndex = index;
    updateOrbit();
  });
  card.append(browserBar, viewport, select);
  cardsHost.append(card);
  const tab = document.createElement("button");
  tab.type = "button";
  tab.textContent = project.title;
  tab.addEventListener("click", () => { selectedIndex = index; updateOrbit(); });
  tabsHost.append(tab);
  return card;
});
function updateOrbit() {
  cards.forEach((card, index) => {
    const offset = (index - selectedIndex + projects.length) % projects.length;
    card.classList.remove("pos-front", "pos-left", "pos-right");
    card.classList.add(offset === 0 ? "pos-front" : offset === 1 ? "pos-right" : "pos-left");
    const selected = index === selectedIndex;
    card.querySelector("button").tabIndex = selected ? 0 : -1;
    tabsHost.children[index].setAttribute("aria-pressed", String(selected));
  });
  const project = projects[selectedIndex];
  document.querySelector("#project-category").textContent = project.category;
  document.querySelector("#project-title").textContent = project.title;
  document.querySelector("#project-description").textContent = project.description;
  document.querySelector("#project-skills").textContent = project.skills;
  document.querySelector("#open-project").href = project.url;
}
function rotateOrbit(step) {
  selectedIndex = (selectedIndex + step + projects.length) % projects.length;
  updateOrbit();
}
document.querySelector(".arrow-left").addEventListener("click", () => rotateOrbit(-1));
document.querySelector(".arrow-right").addEventListener("click", () => rotateOrbit(1));
carousel.addEventListener("keydown", event => {
  if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
  event.preventDefault();
  rotateOrbit(event.key === "ArrowLeft" ? -1 : 1);
});
let suppressClick = false;
carousel.addEventListener("pointerdown", event => {
  if (!event.isPrimary || event.button !== 0) return;
  pointer = { id: event.pointerId, x: event.clientX, y: event.clientY };
});
carousel.addEventListener("pointermove", event => {
  if (!pointer || pointer.id !== event.pointerId) return;
  const dx = event.clientX - pointer.x;
  const dy = event.clientY - pointer.y;
  if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy) && !carousel.hasPointerCapture(event.pointerId)) {
    carousel.setPointerCapture(event.pointerId);
  }
});
carousel.addEventListener("pointerup", event => {
  if (!pointer || pointer.id !== event.pointerId) return;
  const dx = event.clientX - pointer.x;
  const dy = event.clientY - pointer.y;
  pointer = null;
  if (carousel.hasPointerCapture(event.pointerId)) carousel.releasePointerCapture(event.pointerId);
  if (Math.abs(dx) < 40 || Math.abs(dx) <= Math.abs(dy)) return;
  suppressClick = true;
  rotateOrbit(dx < 0 ? 1 : -1);
  setTimeout(() => { suppressClick = false; }, 0);
});
carousel.addEventListener("pointercancel", () => { pointer = null; });
carousel.addEventListener("lostpointercapture", () => { pointer = null; });
document.querySelector("#try-project").addEventListener("click", () => {
  const project = projects[selectedIndex];
  document.querySelector("#dialog-title").textContent = project.title;
  document.querySelector("#dialog-open").href = project.url;
  const frame = document.createElement("iframe");
  frame.src = project.url;
  frame.title = `${project.title} interactive website`;
  document.querySelector("#interactive-preview").replaceChildren(frame);
  dialog.showModal();
  document.body.classList.add("dialog-open");
  document.querySelector("#close-dialog").focus();
});
document.querySelector("#close-dialog").addEventListener("click", () => dialog.close());
dialog.addEventListener("close", () => {
  document.querySelector("#interactive-preview").replaceChildren();
  document.body.classList.remove("dialog-open");
  document.querySelector("#try-project").focus();
});
dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
document.querySelector("#year").textContent = new Date().getFullYear();
updateOrbit();
