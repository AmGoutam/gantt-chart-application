import { Outlet } from 'react-router-dom';
import AppProvider, { useGlobalContext } from './context/AppProvider';
import Navbar from './components/Navbar';

const RootLayout = () => {
  const { isLoggedIn } = useGlobalContext();
  return (
    <>
      {isLoggedIn && <Navbar />}
      <Outlet />
    </>
  );
};

export default RootLayout;
