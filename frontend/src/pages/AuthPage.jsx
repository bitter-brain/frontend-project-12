import { Formik, Field, Form } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import authImage from '../assets/auth_image.jpg'
import { loginSuccess } from '../slices/authSlice'
import { useSignupUserMutation } from '../api/authApi'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'

const AuthPage = () => {

  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [signupUser] = useSignupUserMutation()
  const navigate = useNavigate()
  const [signupError, setSignupError] = useState(false)

  const signupSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, t('signupPage.errors.min3max20'))
      .max(20, t('signupPage.errors.min3max20'))
      .required(t('signupPage.errors.required')),
    password: Yup.string()
      .min(6, t('signupPage.errors.minPass'))
      .required(t('signupPage.errors.required')),
    passwordConfirm: Yup.string()
      .required(t('signupPage.errors.passMatch'))
      .oneOf([Yup.ref('password'), null], t('signupPage.errors.passMatch')),
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
                  alt={t('signupPage.title')}
                  loading="eager"
                />
              </div>
              <Formik
                initialValues={{
                  username: '',
                  password: '',
                  passwordConfirm: ''
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
                {({ isSubmitting, errors, touched }) => (
                  <Form autoComplete="off" className="col-12 col-md-6 mt-3 mt-md-0">
                    <h1 className="text-center mb-4">{t('signupPage.title')}</h1>
                    <div className="form-floating mb-3">
                      <Field
                        id="username"
                        name="username"
                        autoComplete="username"
                        placeholder={t('signupPage.username')}
                        className={`form-control ${(errors.username && touched.username) || signupError ? 'is-invalid' : ''}`}
                        autoFocus
                        required
                      />
                      {errors.username && (
                        <div className="invalid-tooltip">{errors.username}</div>
                      )}
                      <label htmlFor="username" className="form-label">
                        {t('signupPage.username')}
                      </label>
                    </div>
                    <div className="form-floating mb-3">
                      <Field
                        id="password"
                        name="password"
                        placeholder={t('signupPage.password')}
                        type="password"
                        autoComplete="new-password"
                        className={`form-control ${(errors.password && touched.password) || signupError ? 'is-invalid' : ''}`}
                        required
                      />
                      <label htmlFor="password" className="form-label">
                        {t('signupPage.password')}
                      </label>
                      {errors.password && (
                        <div className="invalid-tooltip">{errors.password}</div>
                      )}
                    </div>
                    <div className="form-floating mb-4">
                      <Field
                        id="passwordConfirm"
                        name="passwordConfirm"
                        placeholder={t('signupPage.passwordConfirm')}
                        type="password"
                        className={`form-control ${(errors.passwordConfirm && touched.passwordConfirm) || signupError ? 'is-invalid' : ''}`}
                        required
                      />
                      <label htmlFor="passwordConfirm" className="form-label">
                        {t('signupPage.passwordConfirm')}
                      </label>
                      {errors.passwordConfirm && (
                        <div className="invalid-tooltip">{errors.passwordConfirm}</div>
                      )}
                    </div>
                    {signupError && (
                      <div className="text-danger mb-2">{t('signupPage.errors.userExists')}</div>
                    )}
                    <button
                      type="submit"
                      className="w-100 mb-3 btn btn-outline-primary"
                      disabled={isSubmitting}
                    >
                      {t('signupPage.submit')}
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