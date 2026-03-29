import { Dropdown, ButtonGroup, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { openModal } from '../slices/modalSlice'
import { useTranslation } from 'react-i18next'
import leoProfanity from 'leo-profanity'

const Channel = ({ id, name, removable, isActive, onClick }) => {

  const { t } = useTranslation()
  const dispatch = useDispatch()
  const openRemoveChannelModal = () => dispatch(openModal({ type: 'removeChannel', channelId: id }))
  const openRenameChannelModal = () => dispatch(openModal({ type: 'renameChannel', channelId: id }))

  if (removable) {
    return (
      <li className="nav-item w-100">
        <Dropdown as={ButtonGroup} className="w-100">
          <Button
            variant={isActive ? 'secondary' : ''}
            className="w-100 rounded-0 text-start overflow-hidden"
            onClick={() => onClick(id)}
          >
            <span className="text-truncate d-inline-block w-100"># {leoProfanity.clean(name)}</span>
          </Button>
          <Dropdown.Toggle
            split
            variant={isActive ? 'secondary' : ''}
            className="rounded-0 flex-shrink-0"
          />
          <Dropdown.Menu>
            <Dropdown.Item onClick={openRemoveChannelModal}>
              {t('manageChannel.delete')}
            </Dropdown.Item>
            <Dropdown.Item onClick={openRenameChannelModal}>
              {t('manageChannel.rename')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </li>
    )
  }

  return (
    <li className="nav-item w-100">
      <Button
        variant={isActive ? 'secondary' : ''}
        className="w-100 rounded-0 text-start overflow-hidden"
        onClick={() => onClick(id)}
      >
        <span className="text-truncate d-inline-block w-100"># {leoProfanity.clean(name)}</span>
      </Button>
    </li>
  )
}

export default Channel