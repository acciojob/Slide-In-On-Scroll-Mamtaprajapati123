// Get all images with the "slide-in" class
const slideIns = document.querySelectorAll('.slide-in');

// Function to check if an element is in the viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Function to add the "active" class to elements in the viewport
function addActiveClass() {
  slideIns.forEach(slideIn => {
    if (isInViewport(slideIn)) {
      slideIn.classList.add('active');
    } else {
      slideIn.classList.remove('active');
    }
  });
}

// Debounce function to limit the rate at which addActiveClass gets called
function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function () {
    const context = this,
      args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Add event listener to the window object to call addActiveClass on scroll
window.addEventListener('scroll', debounce(addActiveClass));
