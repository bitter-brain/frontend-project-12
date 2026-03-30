import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import ChatPage from '../pages/ChatPage'
import PageNotFound from '../pages/PageNotFound'
import PrivateRoute from '../routes/PrivateRoute'
import PublicRoute from '../routes/PublicRoute'
import AuthPage from '../pages/AuthPage'
import NavbarChat from './NavbarChat'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <NavbarChat />
        <Routes>
          <Route
            path="/"
            element={(
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            )}
          />
          <Route
            path="/login"
            element={(
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            )}
          />
          <Route
            path="/signup"
            element={(
              <PublicRoute>
                <AuthPage />
              </PublicRoute>
            )}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <ToastContainer />
      </div>
    </BrowserRouter>
  )
}

export default App
