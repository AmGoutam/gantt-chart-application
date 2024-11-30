import { createRoot } from 'react-dom/client'
import './index.css'
import AppProvider from './context/AppProvider.jsx'
import { RouterProvider } from 'react-router-dom'
import router from "./router.jsx"
import Navbar from './components/Navbar.jsx'


createRoot(document.getElementById('root')).render(
  <>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </>,
)
