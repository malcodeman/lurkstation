import { useEffect } from "react";

function useScrollToTop(subreddit, listing, time) {
  useEffect(() => {
    try {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    } catch {
      window.scrollTo(0, 0);
    }
  }, [subreddit, listing, time]);
}

export default useScrollToTop;
