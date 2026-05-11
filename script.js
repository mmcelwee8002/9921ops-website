// ========================================
// 9921ops Spherical Carousel Motion
// ========================================

// Select carousel cards
const cards = document.querySelectorAll(".carousel-card");

// Mouse movement offset
let offset = 0;

// Track mouse movement
document.addEventListener("mousemove", (e) => {

  // Calculate movement amount
  offset = (e.clientX / window.innerWidth - 0.5) * 20;

  // Update each card position
  cards.forEach((card, index) => {

    let direction = index - 1;

    card.style.transform = `
      translateX(${direction * offset}px)
      ${getCardTransform(index)}
    `;
  });
});

// ========================================
// Card Transform Settings
// ========================================

function getCardTransform(index) {

  // Left card
  if (index === 0) {
    return "rotateY(38deg) rotateZ(-8deg) scale(0.88)";
  }

  // Center card
  if (index === 1) {
    return "scale(1.08)";
  }

  // Right card
  return "rotateY(-38deg) rotateZ(8deg) scale(0.88)";
}

/*
========================================
FUTURE IDEAS
========================================

- Add swipe support for mobile
- Add infinite scrolling
- Add auto-rotation
- Add dynamic image loading
- Add real photos instead of placeholders
- Add momentum physics
- Add click-to-expand
- Add WebGL enhancement mode

*/