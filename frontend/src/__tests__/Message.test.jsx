import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Message from '../components/messages/Message'

describe('Message', () => {
  it('renders username and body', () => {
    render(<Message username="admin" body="hello world" />)

    expect(screen.getByText('admin')).toBeInTheDocument()
    expect(screen.getByText(/hello world/)).toBeInTheDocument()
  })

  it('filters profanity', () => {
    render(<Message username="admin" body="ass" />)

    expect(screen.getByText(/\*+/)).toBeInTheDocument()
  })
})