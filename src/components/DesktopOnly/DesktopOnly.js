import useMediaQuery from '../../hooks/useMediaQuery';
import { mobileInclusiveBreakpoint } from '../../constants';

const DesktopOnly = ({ children }) => {
  const isMobile = useMediaQuery(`(max-width: ${mobileInclusiveBreakpoint}px)`);

  return !isMobile ? children : null;
};

export default DesktopOnly;
