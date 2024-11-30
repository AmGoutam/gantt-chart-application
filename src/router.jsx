import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import RootLayout from './RootLayout';
import HomePage from "./pages/HomePage"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import ErrorPage from "./pages/ErrorPage"
import ProfilePage from './pages/ProfilePage';
import { useGlobalContext } from './context/AppProvider';
import Navbar from './components/Navbar';
// import NotFound from './NotFound';


// export const Layout = ({ children }) => {
//     return <>
//         <Navbar />
//         {children}
//     </>
// }


export const LayoutElement = ({ element }) => {
    const { isLoggedIn } = useGlobalContext()
    return isLoggedIn && isLoggedIn ? element : <LoginPage />;
}


export const VerifyLoginUser = ({ element }) => {
    const { isLoggedIn } = useGlobalContext()
    return isLoggedIn && isLoggedIn ? <HomePage /> : element;
}


const router = createBrowserRouter(createRoutesFromElements(

    <Route element={<RootLayout />}>
        <Route path='/' index element={<LayoutElement element={<HomePage />} />} />
        <Route path="signup" element={<VerifyLoginUser element={<SignupPage />} />} />
        <Route path="login" element={<VerifyLoginUser element={<LoginPage />} />} />
    </Route>
))
export default router;