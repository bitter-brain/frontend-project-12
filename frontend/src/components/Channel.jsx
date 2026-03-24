import { Dropdown, ButtonGroup, Button } from 'react-bootstrap'

const Channel = ({ id, name, removable, isActive, onClick }) => {

  if (removable) {
    return (
      <li className="nav-item w-100">
        <Dropdown as={ButtonGroup} className="w-100">
          <Button
            variant={isActive ? 'secondary' : ''}
            className="w-100 rounded-0 text-start"
            onClick={() => onClick(id)}
          >
            <span className="me-1">#</span>{name}
          </Button>
          <Dropdown.Toggle
            split
            variant={isActive ? 'secondary' : ''}
            className="rounded-0"
          />
          <Dropdown.Menu>
            <Dropdown.Item>Удалить</Dropdown.Item>
            <Dropdown.Item>Переименовать</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </li>
    )
  }

  return (
    <li className="nav-item w-100">
      <Button
        variant={isActive ? 'secondary' : ''}
        className="w-100 rounded-0 text-start"
        onClick={() => onClick(id)}
      >
        <span className="me-1">#</span>{name}
      </Button>
    </li>
  )
}

export default Channel