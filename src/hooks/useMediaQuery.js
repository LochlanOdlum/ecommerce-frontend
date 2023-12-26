import { useEffect, useState } from 'react';

const useMediaQuery = (query) => {
  // mediaQueryList objects are kept up to date with current documents state, so create once and reuse
  const mediaQueryList = window.matchMedia(query);
  console.log(query);
  console.log(query);
  console.log(query);
  console.log(mediaQueryList);
  console.log(mediaQueryList);
  console.log(mediaQueryList);

  const [queryMatch, setQueryMatch] = useState(mediaQueryList.matches);

  useEffect(() => {
    const handleMediaChange = () => setQueryMatch(mediaQueryList.matches);

    mediaQueryList.addEventListener('change', handleMediaChange);

    return () => {
      mediaQueryList.removeEventListener('change', handleMediaChange);
    };
  }, [mediaQueryList]);

  return queryMatch;
};

export default useMediaQuery;
