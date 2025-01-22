import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import OcrImageView from './OcrImageView'
import { OcrWord } from '../models/ocr'

describe('OcrImageView Component', () => {
  const mockOnWordClick = jest.fn()
  const mockOcrWords: OcrWord[] = [
    { text: 'Sample', position: [273, 253, 140, 32] },
    { text: 'Invoice', position: [427, 253, 158, 32] },
  ]
  const mockImageURL = 'http://dl.a9t9.com/ocrbenchmark/eng.png'

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the OCR view component with image and zoom buttons', () => {
    render(<OcrImageView ocrWords={mockOcrWords} imageURL={mockImageURL} onWordClick={mockOnWordClick} />)

    expect(screen.getByRole('zoom-in')).toBeInTheDocument()
    expect(screen.getByRole('zoom-out')).toBeInTheDocument()

    const image = screen.getByAltText('Uploaded Image')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', mockImageURL)
  })

  it('calls the function onWordClick when clicking a OCR word box', () => {
    render(<OcrImageView ocrWords={mockOcrWords} imageURL={mockImageURL} onWordClick={mockOnWordClick} />)

    const ocrHighlight = screen.getAllByRole('word-box')[1]
    fireEvent.click(ocrHighlight)
  })

  it('should be able to zoom in and zoom out the image using the zoom buttons', () => {
    render(<OcrImageView ocrWords={mockOcrWords} imageURL={mockImageURL} onWordClick={mockOnWordClick} />)

    const zoomInButton = screen.getByRole('zoom-in')
    const zoomOutButton = screen.getByRole('zoom-out')

    const image = screen.getByRole('uploaded-image').parentElement

    fireEvent.click(zoomOutButton)
    expect(image).toHaveStyle('transform: scale(0.9)')

    fireEvent.click(zoomInButton)
    expect(image).toHaveStyle('transform: scale(1)')

    fireEvent.click(zoomInButton)
    expect(image).toHaveStyle('transform: scale(1.1)')

  })
})
