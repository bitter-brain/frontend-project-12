import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Channel from '../components/channels/Channel'

vi.mock('react-redux', () => ({
  useDispatch: () => vi.fn(),
}))

describe('Channel', () => {
  it('renders channel name', () => {
    render(
      <Channel
        id="1"
        name="general"
        removable={false}
        isActive={false}
        onClick={vi.fn()}
      />,
    )

    expect(screen.getByText(/general/)).toBeInTheDocument()
  })

  it('renders # prefix', () => {
    render(
      <Channel
        id="1"
        name="general"
        removable={false}
        isActive={false}
        onClick={vi.fn()}
      />,
    )

    expect(screen.getByText(/#/)).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    render(
      <Channel
        id="1"
        name="general"
        removable={false}
        isActive={false}
        onClick={handleClick}
      />,
    )

    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledWith('1')
  })

  it('shows dropdown for removable channel', () => {
    render(
      <Channel
        id="2"
        name="random"
        removable={true}
        isActive={false}
        onClick={vi.fn()}
      />,
    )

    expect(screen.getByText('Управление каналом')).toBeInTheDocument()
  })
})