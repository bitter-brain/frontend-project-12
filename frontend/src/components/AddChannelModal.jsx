import { Modal } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { Formik, Form, Field } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../slices/modalSlice'
import { useAddChannelMutation, useGetChannelsQuery } from '../api/channelsApi'
import { setActiveChannel } from '../slices/channelsSlice'
import channelValidationSchema from '../utils/channelValidationSchema'


const AddChannelModal = () => {

  const { isOpen, type } = useSelector((state) => state.modal)
  const dispatch = useDispatch()
  const handleClose = () => dispatch(closeModal())
  const [addChannel, { error, isLoading }] = useAddChannelMutation()
  const { data: channels } = useGetChannelsQuery()

  return (
    <>
      <Modal
        show={type === 'addChannel'}
        onHide={handleClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Добавить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{ channelName: '' }}
            validationSchema={channelValidationSchema(channels ?? [])}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={async (values) => {
              try {
                const { id } = await addChannel({ name: values.channelName }).unwrap()
                dispatch(setActiveChannel(id))
                handleClose()
              } catch (error) {
                console.error(error)
              }
            }}
          >
            {({ errors, isSubmitting, resetForm }) => (
              <Form>
                <Field
                  name="channelName"
                  className="form-control mb-2"
                  autoFocus={true}
                />
                {errors.channelName && (
                  <div className="text-danger">{errors.channelName}</div>
                )}
                <div className="d-flex justify-content-end gap-2 mt-3">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      resetForm()
                      handleClose()
                    }}
                  >
                    Отменить
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                  >
                    {isLoading ? 'Отправка…' : 'Отправить'}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AddChannelModal