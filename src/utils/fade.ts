import { RefObject } from "react";

export function fadeIn(element: RefObject<HTMLDivElement>) {
  if (element.current) {
    element.current.style.transition = 'opacity 0.3s ease-in';
    element.current.style.opacity = '0';
    requestAnimationFrame(() => {
      if (element.current) {
        element.current.style.opacity = '1';
      }
    });
  }
}