import { useCallback, useEffect, useRef } from "react";
function isMatchingKey<T>(matchingKeys: T[], key: any): key is T {
    return matchingKeys.includes(key);
}

export function useLastKeyPressed<T>(matchingKeys: T[], fallback: T) {
    const lastKeyPress = useRef<T>(fallback);

    const handleKeyPress = useCallback((event: KeyboardEvent) => {
        if (isMatchingKey(matchingKeys, event.key)) {
            lastKeyPress.current = event.key;
        }
    }, [matchingKeys]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);

    return lastKeyPress.current
};


