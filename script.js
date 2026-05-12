// ========================================
// 9921ops Spherical Carousel Logic
// ========================================

// Image list
const images = [
  "images/photo1.jpg",
  "images/photo2.jpg",
  "images/photo3.jpg",
  "images/photo4.jpg",
  "images/photo5.jpg",
  "images/photo6.jpg",
];

// Track active image
let currentIndex = 1;

// Prevent spam clicking during animation
let isAnimating = false;

// Card references
const leftCard = document.querySelector(".left-card");
const centerCard = document.querySelector(".center-card");
const rightCard = document.querySelector(".right-card");

// Image references
const leftImage = leftCard.querySelector("img");
const centerImage = centerCard.querySelector("img");
const rightImage = rightCard.querySelector("img");

// ========================================
// Update carousel images
// ========================================

function updateCarousel() {

  const leftIndex =
    (currentIndex - 1 + images.length) % images.length;

  const centerIndex =
    currentIndex;

  const rightIndex =
    (currentIndex + 1) % images.length;

  leftImage.src = images[leftIndex];
  centerImage.src = images[centerIndex];
  rightImage.src = images[rightIndex];
}

// ========================================
// Animate carousel movement
// ========================================

function animateRotation(direction) {

  if (isAnimating) return;

  isAnimating = true;

// Animate cards during rotation

centerCard.style.transform =
  "scale(0.92) translateY(10px)";

if (direction === "right") {

  leftCard.style.transform =
    "rotateY(65deg) translateX(-80px) scale(0.72)";

  rightCard.style.transform =
    "rotateY(-25deg) translateX(20px) scale(0.95)";

} else {

  leftCard.style.transform =
    "rotateY(25deg) translateX(-20px) scale(0.95)";

  rightCard.style.transform =
    "rotateY(-65deg) translateX(80px) scale(0.72)";
}

  setTimeout(() => {

    // Update image index
    if (direction === "right") {
      currentIndex =
        (currentIndex + 1) % images.length;
    } else {
      currentIndex =
        (currentIndex - 1 + images.length) % images.length;
    }

    // Update images
    updateCarousel();

// Reset transforms after animation
leftCard.style.transform = "";
centerCard.style.transform = "";
rightCard.style.transform = "";

    isAnimating = false;

  }, 350);
}

// ========================================
// Button interactions
// ========================================

// ========================================
// Center Card Click + Drag / Swipe Support
// ========================================

const zoneLeft = document.querySelector(".zone-left");
const zoneRight = document.querySelector(".zone-right");

let dragStartX = 0;
let dragEndX = 0;
let isDragging = false;
const swipeThreshold = 45;

// Click left side: move carousel left as viewed on screen
zoneLeft.addEventListener("click", (e) => {
  e.stopPropagation();

  if (isDragging) return;

  animateRotation("right");
});

// Click right side: move carousel right as viewed on screen
zoneRight.addEventListener("click", (e) => {
  e.stopPropagation();

  if (isDragging) return;

  animateRotation("left");
});

// Start drag / swipe
centerCard.addEventListener("pointerdown", (e) => {
  dragStartX = e.clientX;
  dragEndX = e.clientX;
  isDragging = false;

  centerCard.setPointerCapture(e.pointerId);
});

// Track drag / swipe movement
centerCard.addEventListener("pointermove", (e) => {
  dragEndX = e.clientX;

  const dragDistance = dragEndX - dragStartX;

  if (Math.abs(dragDistance) > 8) {
    isDragging = true;
  }
});

// End drag / swipe
centerCard.addEventListener("pointerup", (e) => {
  const dragDistance = dragEndX - dragStartX;

  centerCard.releasePointerCapture(e.pointerId);

  if (Math.abs(dragDistance) < swipeThreshold) {
    return;
  }

  // Swipe right: move carousel right as viewed on screen
  if (dragDistance > 0) {
    animateRotation("left");
  }

  // Swipe left: move carousel left as viewed on screen
  if (dragDistance < 0) {
    animateRotation("right");
  }

  setTimeout(() => {
    isDragging = false;
  }, 50);
});
// ========================================
// Initial Load
// ========================================

updateCarousel();

/*
========================================
FUTURE IDEAS
========================================

- Mobile swipe gestures
- Auto rotation
- Infinite card depth
- Physics momentum
- Dynamic image uploads
- WebGL enhancement mode
- AI-generated image streams

True drag/swipe support
desktop drag
mobile finger swipe
5-card orbital depth
creates real sphere illusion
Momentum/inertia
smooth continuation after swipe
Auto-scroll cinematic mode
subtle idle movement
Dynamic image loading
no manual array maintenance


*/