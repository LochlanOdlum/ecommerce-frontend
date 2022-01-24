import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollToPrevious = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    console.log('hey');
    if (location?.state?.scrollPos) {
      const { scrollPos } = location.state;
      console.log('scrolling to');
      console.log(scrollPos);
      window.scroll(0, scrollPos);
    }
  }, [location.state]);
};

export default useScrollToPrevious;
