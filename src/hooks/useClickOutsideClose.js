import { useEffect, useState } from 'react';

const useClickOutsideClose = (elementRef) => {
  const [isElementVisible, setIsElementVisible] = useState(false);

  useEffect(() => {
    const handleClick = (event) => {
      //if modal isn't open

      if (!elementRef.current || !isElementVisible) {
        return;
      }

      if (elementRef.current.contains(event.target)) {
        return;
      }
      setIsElementVisible(false);
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [isElementVisible, elementRef]);

  return [isElementVisible, setIsElementVisible];
};

export default useClickOutsideClose;
