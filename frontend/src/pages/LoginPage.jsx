import { Formik, Field, Form } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import loginImage from '../assets/login.jpg'


const LoginPage = () => {

  const navigate = useNavigate()

  const [authError, setAuthError] = useState(false)

  return (
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img
                    src={loginImage}
                    className="rounded-circle"
                    alt="Login"
                    loading="eager"
                  />
                </div>
                <Formik
                  initialValues={{
                    username: '',
                    password: '',
                  }}
                  onSubmit={ async (values) => {
                      try {
                        const response = await fetch('/api/v1/login', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify(values),
                        })

                        if (response.status === 401) {
                          setAuthError(true)
                          return
                        }

                        if (!response.ok) {
                          throw new Error(`HTTP error! status: ${response.status}`)
                        }

                        const { token } = await response.json()
                        localStorage.setItem('auth_token', token)

                        navigate('/')

                      } catch (error) {
                        console.error('Error:', error)
                      }
                    }
                  }
                >
                  {({ isSubmitting, handleChange }) => (
                    <Form className="col-12 col-md-6 mt-3 mt-md-0">
                      <h1 className="text-center mb-4">Войти</h1>
                      <div className="form-floating mb-3">
                        <Field
                          id="username"
                          name="username"
                          autoComplete="username"
                          placeholder="Ваш ник"
                          className={`form-control ${authError ? 'is-invalid' : ''}`}
                          required
                          onChange={(e) => {
                            setAuthError(false)
                            handleChange(e)
                          }}
                        />
                        <label
                          htmlFor="username"
                          className="form-label"
                        >Ваш ник
                        </label>
                      </div>
                      <div className="form-floating mb-4">
                        <Field
                          id="password"
                          name="password"
                          autoComplete="current-password"
                          placeholder="Пароль"
                          type="password"
                          className={`form-control ${authError ? 'is-invalid' : ''}`}
                          required
                        />
                        <label htmlFor="password" className="form-label">
                          Пароль
                        </label>
                        {authError && (
                          <div className="invalid-tooltip">Неверные имя пользователя или пароль</div>
                        )}
                      </div>
                      <button
                        type="submit"
                        className="w-100 mb-3 btn btn-outline-primary"
                        disabled={isSubmitting}
                      >
                        Войти
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default LoginPage
