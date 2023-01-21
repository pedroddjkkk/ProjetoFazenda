export default function fadeIn(element) {
  element.style.transition = 'opacity 0.3s ease-in';
  element.style.opacity = 0;
  requestAnimationFrame(() => {
    element.style.opacity = 1;
  });
}