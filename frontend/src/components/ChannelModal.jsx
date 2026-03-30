import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Formik, Form, Field } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { closeModal } from '../slices/modalSlice'
import { setActiveChannel } from '../slices/channelsSlice'
import {
  useAddChannelMutation,
  useRemoveChannelMutation,
  useRenameChannelMutation,
  useGetChannelsQuery,
} from '../api/channelsApi'
import channelValidationSchema from '../utils/channelValidationSchema'

const ChannelModal = () => {
  const { t } = useTranslation()
  const { type, channelId } = useSelector(state => state.modal)
  const activeChannelId = useSelector(state => state.channels.activeChannel)

  const dispatch = useDispatch()
  const handleClose = () => dispatch(closeModal())

  const { data: channels = [] } = useGetChannelsQuery()

  const [addChannel, addState] = useAddChannelMutation()
  const [removeChannel, removeState] = useRemoveChannelMutation()
  const [renameChannel, renameState] = useRenameChannelMutation()

  const isLoading = addState.isLoading || removeState.isLoading || renameState.isLoading

  const titles = {
    addChannel: t('modals.titles.addChannel'),
    removeChannel: t('modals.titles.deleteChannel'),
    renameChannel: t('modals.titles.renameChannel'),
  }

  const handleSubmit = async (values) => {
    try {
      if (type === 'addChannel') {
        const { id } = await addChannel({ name: values.channelName }).unwrap()
        dispatch(setActiveChannel(id))
        toast.success(t('channel.added'))
      }

      if (type === 'renameChannel') {
        await renameChannel({ id: channelId, name: values.channelName }).unwrap()
        toast.success(t('channel.renamed'))
      }

      if (type === 'removeChannel') {
        await removeChannel(channelId).unwrap()
        if (activeChannelId === channelId && channels.length > 0) {
          dispatch(setActiveChannel(channels[0].id))
        }
        toast.success(t('channel.deleted'))
      }

      handleClose()
    }
    catch (error) {
      console.error(error)
      toast.error(t('networkError'))
    }
  }

  return (
    <Modal show={type !== null} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{titles[type]}</Modal.Title>
      </Modal.Header>

      {type === 'removeChannel'
        ? (
            <>
          <Modal.Body>
            <form onSubmit={async (e) => {
              e.preventDefault()
              await handleSubmit()
              }}
            >
              <p>{t('modals.deleteQuestion')}</p>
              <div className="d-flex justify-content-end gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleClose}
                >
                  {t('modals.buttons.cancel')}
                </Button>
                <Button
                  type="submit"
                  variant="danger"
                  disabled={isLoading}
                >
                  {isLoading
                    ? t('modals.buttons.deleting')
                    : t('modals.buttons.delete')}
                </Button>
              </div>
            </form>
          </Modal.Body>
          </>
        )
            : (
              <Modal.Body>
          <Formik
            initialValues={{ channelName: '' }}
            validationSchema={channelValidationSchema(channels, t)}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={handleSubmit}
          >
            {({ errors, isSubmitting, resetForm }) => (
              <Form>
                <div>
                  <Field
                    id="channelName"
                    name="channelName"
                    className="mb-2 form-control"
                    autoFocus
                  />
                  <label htmlFor="channelName" className="visually-hidden">
                    {t('modals.channelName')}
                  </label>
                  {errors.channelName && (
                    <div className="invalid-feedback d-block">{errors.channelName}</div>
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
                      disabled={isSubmitting || isLoading}
                    >
                      {isLoading ? t('modals.buttons.submitting') : t('modals.buttons.submit')}
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        )
      }
    </Modal>
  )
}

export default ChannelModal
