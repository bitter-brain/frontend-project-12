import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const NavbarChat = () => {
  const { t } = useTranslation()
  const isLogged = useSelector(state => state.auth.loggedIn)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <Navbar expand="lg" className="shadow-sm light bg-white">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        {isLogged && (
          <Button onClick={handleLogout} variant="primary">
            {t('logoutBtn')}
          </Button>
        )}
      </Container>
    </Navbar>
  )
}

export default NavbarChat
