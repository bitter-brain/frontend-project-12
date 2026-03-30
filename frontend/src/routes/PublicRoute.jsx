import { Navigate } from 'react-router-dom'

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('auth_token')
  return token ? <Navigate to="/" /> : children
}

export default PublicRoute
