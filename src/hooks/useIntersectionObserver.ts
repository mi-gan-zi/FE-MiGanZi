import { useEffect, useRef, useCallback } from "react";

function useIntersectionObserver(onIntersect: any) {
  const ref = useRef(null);

  const handleIntersection = useCallback(
    ([entry]: any, observer: any) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        onIntersect(entry, observer);
      }
    },
    [onIntersect]
  );

  useEffect(() => {
    let observer: any;
    if (ref.current) {
      observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.5,
      });
      observer.observe(ref.current);
    }
    return () => observer && observer.disconnect();
  }, [ref, handleIntersection]);

  return ref;
}

export default useIntersectionObserver;
