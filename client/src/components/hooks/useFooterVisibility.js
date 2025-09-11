import { useLocation } from 'react-router-dom';

export const useFooterVisibility = () => {
  const location = useLocation();
  
  // Pages where footer should be HIDDEN ❌
  const noFooterRoutes = [
    '/login',
    '/register', 
    '/checkout',
    '/payment',
    '/dashboard'
  ];
  
  // Check if current path starts with any no-footer route
  const hideFooter = noFooterRoutes.some(route => 
    location.pathname.startsWith(route)
  );
  
  return !hideFooter;
};
