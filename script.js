const orbitCards = Array.from(document.querySelectorAll(".orbit-card"));
const carousel = document.querySelector(".carousel-placeholder");

const orbitPositions = [
  "pos-front",     // 6 PM
  "pos-right",     // 4 PM
  "pos-far-right", // 2 PM
  "pos-back",      // 12 PM
  "pos-far-left",  // 10 PM
  "pos-left",      // 8 PM
];

let currentIndex = 0;
let isAnimating = false;
let dragStartX = 0;
let dragEndX = 0;

function updateOrbit() {
  orbitCards.forEach((card, index) => {
    orbitPositions.forEach((pos) => card.classList.remove(pos));

    const positionIndex =
      (index + currentIndex + orbitPositions.length) % orbitPositions.length;

    card.classList.add(orbitPositions[positionIndex]);
  });
}

function rotateOrbit(direction) {
  if (isAnimating) return;

  isAnimating = true;

  if (direction === "left") {
    currentIndex = (currentIndex + 1) % orbitPositions.length;
  }

  if (direction === "right") {
    currentIndex =
      (currentIndex - 1 + orbitPositions.length) % orbitPositions.length;
  }

  updateOrbit();

  setTimeout(() => {
    isAnimating = false;
  }, 450);
}

carousel.addEventListener("pointerdown", (event) => {
  dragStartX = event.clientX;
  dragEndX = event.clientX;
});

carousel.addEventListener("pointermove", (event) => {
  dragEndX = event.clientX;
});

carousel.addEventListener("pointerup", () => {
  const dragDistance = dragEndX - dragStartX;

  if (Math.abs(dragDistance) < 30) return;

  if (dragDistance < 0) {
    rotateOrbit("left");
  }

  if (dragDistance > 0) {
    rotateOrbit("right");
  }
});

updateOrbit();