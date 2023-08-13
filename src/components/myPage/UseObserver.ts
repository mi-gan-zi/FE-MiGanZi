import { useEffect } from "react"

export const useObserver = ({
    target, 
    onIntersect, 
}:any) => {
   const root = null
   const rootMargin = "0px"
   const threshold = 0.5

    useEffect(() => {
        let observer:any
        if (target && target.current) {
            observer = new IntersectionObserver(onIntersect, { root, rootMargin, threshold })
            observer.observe(target.current)
        }
 
        return () => observer && observer.disconnect()
    }, [target, rootMargin, threshold])
}