// ========================================
// 9921ops Orbital Carousel
// ========================================

// Images used in the carousel
const images = [
  "images/photo1.jpg",
  "images/photo2.jpg",
  "images/photo3.jpg",
  "images/photo4.jpg",
  "images/photo5.jpg",
  "images/photo6.jpg",
  "images/photo7.jpg",
];

// Orbit position classes
const orbitPositions = [
  "pos-front",      // 6 PM
  "pos-right",      // 4 PM
  "pos-far-right",  // 2 PM
  "pos-back",       // 12 PM
  "pos-far-left",   // 10 PM
  "pos-left",       // 8 PM
  // "pos-deep",       // hidden transition
];

// Carousel elements
const carousel = document.querySelector(".carousel-placeholder");

const allOrbitCards = [
  document.querySelector(".center-card"),
  document.querySelector(".right-card"),
  document.querySelector(".far-right-card"),
  document.querySelector(".back-card"),
  document.querySelector(".far-left-card"),
  document.querySelector(".left-card"),
  document.querySelector(".deep-card"),
];


const orbitCards = [
  document.querySelector(".center-card"),
  document.querySelector(".right-card"),
  document.querySelector(".far-right-card"),
  document.querySelector(".back-card"),
  document.querySelector(".far-left-card"),
  document.querySelector(".left-card"),
  // document.querySelector(".deep-card"),
];
const zoneLeft = document.querySelector(".zone-left");
const zoneRight = document.querySelector(".zone-right");

// Carousel state
let currentIndex = 0;
let isAnimating = false;

let dragStartX = 0;
let dragEndX = 0;
let isDragging = false;

const swipeThreshold = 20;

// ========================================
// Initial Image Loading
// ========================================

function loadImages() {
 allOrbitCards.forEach((card, index) => {
    const image = card.querySelector("img");

    if (image && images[index]) {
      image.src = images[index];
    }
  });
}

// ========================================
// Orbit Position Updates
// ========================================

function updateOrbitPositions() {
  orbitCards.forEach((card, index) => {
    // Clear inline styles from drag movement
    card.style.transform = "";
    card.style.opacity = "";
    card.style.filter = "";
    card.style.zIndex = "";
    card.style.visibility = "hidden";

    // Remove old orbit position classes
    orbitPositions.forEach((position) => {
      card.classList.remove(position);
    });

    // Apply new orbit position
const positionIndex =
  (index + currentIndex + orbitPositions.length) %
  orbitPositions.length;

card.classList.add(orbitPositions[positionIndex]);
card.style.visibility = "visible";
  });
}

// ========================================
// Rotation Logic
// ========================================

function rotateOrbit(direction) {
  if (isAnimating) return;

  isAnimating = true;

 if (direction === "right") {
  currentIndex =
    (currentIndex - 1 + orbitPositions.length) % orbitPositions.length;
}

if (direction === "left") {
  currentIndex =
    (currentIndex + 1) % orbitPositions.length;
}
console.log("rotateOrbit:", direction, "currentIndex:", currentIndex);
  updateOrbitPositions();

  setTimeout(() => {
    isAnimating = false;
  }, 450);
}

// ========================================
// Arrow Controls
// ========================================

zoneLeft.addEventListener("click", (event) => {
  event.stopPropagation();

  // Move carousel left visually
  rotateOrbit("left");
});

zoneRight.addEventListener("click", (event) => {
  event.stopPropagation();

  // Move carousel right visually
  rotateOrbit("right");
});

// ========================================
// Drag / Swipe Controls
// ========================================

carousel.addEventListener("pointerdown", (event) => {
  dragStartX = event.clientX;
  dragEndX = event.clientX;
  isDragging = false;

  carousel.setPointerCapture(event.pointerId);
});

carousel.addEventListener("pointermove", (event) => {
  dragEndX = event.clientX;

  const dragDistance = dragEndX - dragStartX;

  if (Math.abs(dragDistance) > 4) {
    isDragging = true;
  }
});

carousel.addEventListener("pointerup", (event) => {
  carousel.releasePointerCapture(event.pointerId);

  const dragDistance = dragEndX - dragStartX;

  if (!isDragging) return;

  if (Math.abs(dragDistance) < swipeThreshold) return;

  if (dragDistance > 0) {
    // Swipe right: move carousel right visually
    rotateOrbit("left");
  }

  if (dragDistance < 0) {
    // Swipe left: move carousel left visually
    rotateOrbit("right");
  }

  setTimeout(() => {
    isDragging = false;
  }, 50);
});

// ========================================
// Initial Load
// ========================================

loadImages();
updateOrbitPositions();

/*
========================================
FUTURE UPDATES
========================================

- Add image replacement at back / 12 PM position
- Add live drag preview
- Add momentum / inertia
- Add auto-rotation
- Add dynamic folder or upload-based images
- Remove debug position labels once layout is finalized


The next refinement pass will likely focus on:

stabilizing orbit geometry
consistent spacing between positions
smoother transition timing
better z-index layering
true orbital interpolation


*/