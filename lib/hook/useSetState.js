import { useCallback, useState } from "react";

export default function useSetState(initialState) {
    const [state, set] = useState(initialState);
    const setState = useCallback(patch => {
        set(prev => {
            return Object.assign({}, state, patch instanceof Function ? patch(prev) : patch)
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return [state, setState];
}