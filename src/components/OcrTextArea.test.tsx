import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import OcrTextArea from './OcrTextArea'

describe('OcrTextArea Component', () => {
  it('renders component with the selectedText value', () => {
    const selectedText = 'Invoice'

    render(<OcrTextArea selectedText={selectedText} />)

    expect(screen.getByText('TextArea')).toBeInTheDocument()
    const textarea = screen.getByRole('textarea')
    expect(textarea).toBeInTheDocument()
    expect(textarea).toHaveValue(selectedText)
  })

  it('renders component with an empty textarea if no selectedText', () => {
    render(<OcrTextArea selectedText="" />)

    const textarea = screen.getByRole('textarea')
    expect(textarea).toBeInTheDocument()
    expect(textarea).toHaveValue('')
  })
})
