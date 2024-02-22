import { useEffect, useState } from "react";

export function useRenderLoop(frameRate: number = 30, refreshRate = 1) {
    const [renderCount, setRenderCount] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setRenderCount((prevRenderCount) => prevRenderCount + 1);
        }, 1000 / frameRate);

        return () => clearInterval(intervalId);
    }, [frameRate]);

    return { renderCount, refresh: renderCount % (frameRate / refreshRate) === 0 ? 1 : 0 };
}
