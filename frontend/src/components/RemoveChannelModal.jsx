import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../slices/modalSlice'
import { setActiveChannel } from '../slices/channelsSlice'
import { useRemoveChannelMutation, useGetChannelsQuery } from '../api/channelsApi'

const RemoveChannelModal = () => {

  const { type, channelId } = useSelector((state) => state.modal)
  const activeChannelId = useSelector((state) => state.channels.activeChannel)
  const { data: fetchedChannels } = useGetChannelsQuery()
  const dispatch = useDispatch()
  const [removeChannel, { isLoading, error }] = useRemoveChannelMutation()

  const handleClose = () => dispatch(closeModal())
  const handleRemoveChannel = async () => {
    try {
      await removeChannel(channelId).unwrap()
      if (activeChannelId === channelId) {
        dispatch(setActiveChannel(fetchedChannels[0].id))
      }
      handleClose()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Modal
        show={type === 'removeChannel'}
        onHide={handleClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Удалить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>Уверены, что хотите удалить канал?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Отменить
          </Button>
          <Button
            variant="danger"
            onClick={handleRemoveChannel}
            disabled={isLoading}
          >
            {isLoading ? 'Удаление…' : 'Удалить'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default RemoveChannelModal