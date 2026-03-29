import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../slices/modalSlice'
import { setActiveChannel } from '../slices/channelsSlice'
import { useRemoveChannelMutation, useGetChannelsQuery } from '../api/channelsApi'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const RemoveChannelModal = () => {
  const { t } = useTranslation()
  const { type, channelId } = useSelector(state => state.modal)
  const activeChannelId = useSelector(state => state.channels.activeChannel)
  const { data: fetchedChannels } = useGetChannelsQuery()
  const dispatch = useDispatch()
  const [removeChannel, { isLoading }] = useRemoveChannelMutation()

  const handleClose = () => dispatch(closeModal())
  const handleRemoveChannel = async () => {
    try {
      await removeChannel(channelId).unwrap()
      if (activeChannelId === channelId) {
        dispatch(setActiveChannel(fetchedChannels[0].id))
      }
      handleClose()
      toast.success(t('channel.deleted'))
    }
    catch (error) {
      toast.error(t('networkError'))
      console.error(error)
    }
  }

  return (
    <Modal
      show={type === 'removeChannel'}
      onHide={handleClose}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.titles.deleteChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{t('modals.deleteQuestion')}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t('modals.buttons.cancel')}
        </Button>
        <Button variant="danger" onClick={handleRemoveChannel} disabled={isLoading}>
          {isLoading ? t('modals.buttons.deleting') : t('modals.buttons.delete')}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default RemoveChannelModal
