import { useState, useEffect } from "react";

function useWindowSize(initialWidth = Infinity, initialHeight = Infinity) {
  const isClient = typeof window === "object";
  const [state, setState] = useState({
    width: isClient ? window.innerWidth : initialWidth,
    height: isClient ? window.innerHeight : initialHeight
  });

  useEffect(() => {
    if (isClient) {
      function handler() {
        setState({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }

      window.addEventListener("resize", handler);
      return () => window.removeEventListener("resize", handler);
    } else {
      return undefined;
    }
  }, [isClient]);

  return state;
}

export default useWindowSize;
