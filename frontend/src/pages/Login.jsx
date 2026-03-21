import { Formik, Field, Form } from 'formik'
import loginImage from '../assets/login.jpg'

const Login = () => (
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
            >
              <Form className="col-12 col-md-6 mt-3 mt-md-0">
                <h1 className="text-center mb-4">Войти</h1>
                <div className="form-floating mb-3">
                  <Field
                    id="username"
                    name="username"
                    autoСomplete="username"
                    placeholder="Ваш ник"
                    className="form-control"
                    required
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
                    autoСomplete="current-password"
                    placeholder="Пароль"
                    type="password"
                    className="form-control"
                    required
                  />
                  <label
                    htmlFor="password"
                    className="form-label"
                  >Пароль
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-100 mb-3 btn btn-outline-primary"
                >Войти
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  </div>
)
export default Login