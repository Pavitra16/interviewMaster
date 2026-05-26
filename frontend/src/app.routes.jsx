import {createBrowserRouter} from 'react-router'
import Login from './features/auth/pages/Login.jsx'
import Register from './features/auth/pages/Resgister.jsx'
import Protected from './features/auth/components/Protected.jsx'
import Home from './features/interview/pages/Home.jsx'
import Interview from './features/interview/pages/Interview.jsx'
import LandingPage from './features/landing/pages/LandingPage.jsx'
import Profile from './features/auth/pages/Profile.jsx'
import GenerateReport from './features/interview/pages/GenerateReport.jsx'
import ForgotPassword from './features/auth/pages/ForgotPassword.jsx'
import ResetPassword from './features/auth/pages/ResetPassword.jsx'

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/home",
    element: <Protected><Home/></Protected>
  },
  {
    path: "/generate-report",
    element: <Protected><GenerateReport/></Protected>
  },
  {
    path:"/interview/:interviewId",
    element:<Protected><Interview/></Protected>
  },
  {
    path:"/profile",
    element:<Protected><Profile/></Protected>
  },
  {
    path:"/forgot-password",
    element:<ForgotPassword/>
  },
  {
    path:"/reset-password",
    element:<ResetPassword/>
  }
])