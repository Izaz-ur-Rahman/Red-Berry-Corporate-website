// /**
//  * ScrollToTop Component
//  * Scrolls window to top on route change
//  */

// import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';

// export function ScrollToTop() {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     // Scroll to top on route change
//     window.scrollTo({
//       top: 0,
//       left: 0,
//       behavior: 'instant' as ScrollBehavior,
//     });
//   }, [pathname]);

//   return null;
// }

/**
 * ScrollToTop Component
 * - Scrolls window to top on route change
 * - Shows a floating scroll-up button after scrolling down
 */

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const { pathname } = useLocation();
  const [showButton, setShowButton] = useState(false);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" as ScrollBehavior,
    });

    setShowButton(false);
  }, [pathname]);

  // Show/hide button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll smoothly to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showButton && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          title="Scroll to top"
          className="
            fixed bottom-20 right-5 z-50
            flex h-11 w-11 items-center justify-center
            rounded-full
            bg-primary text-primary-foreground
            shadow-lg
            transition-all duration-300
            hover:scale-110 hover:shadow-xl
            focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
          "
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </>
  );
}