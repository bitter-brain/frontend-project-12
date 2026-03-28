import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import ChatPage from './pages/ChatPage'
import PageNotFound from './pages/PageNotFound'
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'
import AuthPage from './pages/AuthPage'
import NavbarChat from './components/NavbarChat'

function App() {

  return (
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <NavbarChat />
        <Routes>
          <Route path="/" element={
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          } />
          <Route path="/login" element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } />
          <Route path="/signup" element={
            <PublicRoute>
              <AuthPage />
            </PublicRoute>
          } />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
