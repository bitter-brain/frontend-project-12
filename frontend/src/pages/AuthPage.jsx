import { Formik, Field, Form } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import authImage from '../assets/auth_image.jpg'
import { loginSuccess } from '../slices/authSlice'
import { useSignupUserMutation } from '../api/authApi'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'

const AuthPage = () => {

  const dispatch = useDispatch()
  const [signupUser, { error, isLoading }] = useSignupUserMutation()
  const navigate = useNavigate()
  const [signupError, setSignupError] = useState(false)

  const signupSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .required('Обязательное поле'),
    password: Yup.string()
      .min(6, 'Не менее 6 символов')
      .required('Обязательное поле'),
    passwordConfirm: Yup.string()
      .required('Пароли должны совпадать')
      .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
  })

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src={authImage}
                  className="rounded-circle"
                  alt="Signup"
                  loading="eager"
                />
              </div>
              <Formik
                initialValues={{
                  username: '',
                  password: '',
                  passwordConfirm: '',
                }}
                validationSchema={signupSchema}
                onSubmit={async (values) => {
                  setSignupError(false)
                  try {
                    const { token, username } = await signupUser({ username: values.username, password: values.password }).unwrap()
                    dispatch(loginSuccess({ token, username }))
                    navigate('/')
                  } catch (error) {
                    if (error.status === 409) {
                      setSignupError(true)
                    }
                  }
                }}
              >
                {({ isSubmitting, errors, touched, isValid  }) => (
                  <Form autoComplete="off" className="col-12 col-md-6 mt-3 mt-md-0">
                    <h1 className="text-center mb-4">Регистрация</h1>
                    <div className="form-floating mb-3">
                      <Field
                        id="username"
                        name="username"
                        autoComplete="username"
                        placeholder="Имя пользователя"
                        className={`form-control ${errors.username && touched.username || signupError ? 'is-invalid' : ''}`}
                        required
                      />
                      {errors.username && (
                        <div className="invalid-tooltip">{errors.username}</div>
                      )}
                      <label
                        htmlFor="username"
                        className="form-label"
                      >Имя пользователя
                      </label>
                    </div>
                    <div className="form-floating mb-3">
                      <Field
                        id="password"
                        name="password"
                        placeholder="Пароль"
                        type="password"
                        autoComplete="new-password"
                        className={`form-control ${errors.password && touched.password || signupError ? 'is-invalid' : ''}`}
                        required
                      />
                      <label htmlFor="password" className="form-label">
                        Пароль
                      </label>
                      {errors.password && (
                        <div className="invalid-tooltip">{errors.password}</div>
                      )}
                    </div>
                    <div className="form-floating mb-4">
                      <Field
                        id="passwordConfirm"
                        name="passwordConfirm"
                        placeholder="Повторите пароль"
                        type="password"
                        className={`form-control ${errors.passwordConfirm && touched.passwordConfirm || signupError ? 'is-invalid' : ''}`}
                        required
                      />
                      <label htmlFor="passwordConfirm" className="form-label">
                        Подтвердите пароль
                      </label>
                      {errors.passwordConfirm && (
                        <div className="invalid-tooltip">{errors.passwordConfirm}</div>
                      )}
                    </div>
                    {signupError && (
                      <div className="text-danger mb-2">Такой пользователь уже существует</div>
                    )}
                    <button
                      type="submit"
                      className="w-100 mb-3 btn btn-outline-primary"
                      disabled={isSubmitting || !isValid}
                    >
                      Зарегистрироваться
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

export default AuthPage
