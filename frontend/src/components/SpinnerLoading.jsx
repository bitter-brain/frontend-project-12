import { Spinner } from 'react-bootstrap'

const SpinnerLoading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Spinner animation="border" />
    </div>
  )
}

export default SpinnerLoading
