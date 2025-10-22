import { useLayoutEffect, useState } from 'react';

function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(() => {
        return matchMedia(query).matches;
    });

    useLayoutEffect(() => {
        const media = matchMedia(query);

        media.onchange = () => {
            setMatches(media.matches);
        };
    }, [query]);

    return matches;
}

export { useMediaQuery };
