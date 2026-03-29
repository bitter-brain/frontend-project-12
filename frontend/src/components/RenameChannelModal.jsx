import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../slices/modalSlice'
import { useRenameChannelMutation, useGetChannelsQuery } from '../api/channelsApi'
import { Field, Form, Formik } from 'formik'
import channelValidationSchema from '../utils/channelValidationSchema'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const RenameChannelModal = () => {
  const { t } = useTranslation()
  const { type, channelId } = useSelector(state => state.modal)
  const dispatch = useDispatch()
  const handleClose = () => dispatch(closeModal())
  const [renameChannel, { isLoading }] = useRenameChannelMutation()
  const { data: channels } = useGetChannelsQuery()

  return (
    <Modal
      show={type === 'renameChannel'}
      onHide={handleClose}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.titles.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ channelName: '' }}
          validationSchema={channelValidationSchema(channels ?? [], t)}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={async (values) => {
            try {
              await renameChannel({ id: channelId, name: values.channelName }).unwrap()
              handleClose()
              toast.success(t('channel.renamed'))
            }
            catch (error) {
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
                  disabled={isSubmitting}
                >
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

export default RenameChannelModal
