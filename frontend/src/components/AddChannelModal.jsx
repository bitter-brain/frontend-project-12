import { Modal } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { Formik, Form, Field } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../slices/modalSlice'
import { useAddChannelMutation, useGetChannelsQuery } from '../api/channelsApi'
import { setActiveChannel } from '../slices/channelsSlice'
import channelValidationSchema from '../utils/channelValidationSchema'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const AddChannelModal = () => {

  const { t } = useTranslation()
  const { type } = useSelector((state) => state.modal)
  const dispatch = useDispatch()
  const handleClose = () => dispatch(closeModal())
  const [addChannel, { isLoading }] = useAddChannelMutation()
  const { data: channels } = useGetChannelsQuery()

  return (
    <Modal
      show={type === 'addChannel'}
      onHide={handleClose}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.titles.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ channelName: '' }}
          validationSchema={channelValidationSchema(channels ?? [], t)}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={async (values) => {
            try {
              const { id } = await addChannel({ name: values.channelName }).unwrap()
              dispatch(setActiveChannel(id))
              handleClose()
              toast.success(t('channel.added'))
            } catch (error) {
              toast.error(t('networkError'))
              console.error(error)
            }
          }}
        >
          {({ errors, isSubmitting, resetForm }) => (
            <Form>
              <Field
                id="channelName"
                name="channelName"
                className="form-control mb-2"
                autoFocus
              />
              <label htmlFor="channelName" className="visually-hidden">{t('modals.channelName')}</label>
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
                  {t('modals.buttons.cancel')}
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}>
                  {isLoading ? t('modals.buttons.submitting') : t('modals.buttons.submit')}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  )
}

export default AddChannelModal