import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import ChatPage from './pages/ChatPage'
import PageNotFound from './pages/PageNotFound'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
