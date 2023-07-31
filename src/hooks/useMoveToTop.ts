import { useEffect, useRef} from "react";

function useMoveToTop() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        {ref.current && ref.current.scrollIntoView({ behavior: 'smooth' });}
    }, [])

    return ref;
}

export default useMoveToTop;
