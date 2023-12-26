import useMediaQuery from '../../hooks/useMediaQuery';
import { mobileInclusiveBreakpoint } from '../../constants';

const MobileOnly = ({ children }) => {
  const isMobile = useMediaQuery(`(max-width: ${mobileInclusiveBreakpoint}px)`);

  return isMobile ? children : null;
};

export default MobileOnly;
