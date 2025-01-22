import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App'
import { useOcrApi } from './hooks/use-ocr-api'
import { QueryClient, QueryClientProvider } from 'react-query'
import userEvent from '@testing-library/user-event'

const queryClient = new QueryClient()

jest.mock('./hooks/use-ocr-api', () => ({
  useOcrApi: jest.fn(),
}))

const mockUseOcrApi = useOcrApi as jest.MockedFunction<typeof useOcrApi>

describe('App Component', () => {
  beforeEach(() => {
    mockUseOcrApi.mockReturnValue({
      ocrWords: undefined,
      isLoading: false,
      isError: false,
      processFile: jest.fn(),
    })
  })

  window.URL.createObjectURL = jest.fn()

  it('renders the App component with file input and title', () => {
    render(<QueryClientProvider client={queryClient}><App/></QueryClientProvider>)
    expect(screen.getByText('Optical Character Recognition')).toBeInTheDocument()
    expect(screen.getByRole('file-input')).toBeInTheDocument()
  })

  it('shows error message when `isError` is true', () => {
    mockUseOcrApi.mockReturnValueOnce({
      ocrWords: undefined,
      isLoading: false,
      isError: true,
      processFile: jest.fn(),
    })

    render(<QueryClientProvider client={queryClient}><App/></QueryClientProvider>)
    expect(screen.getByText('Error processing the file!')).toBeInTheDocument()
  })

  it('shows loading message when `isLoading` is true', () => {
    mockUseOcrApi.mockReturnValueOnce({
      ocrWords: undefined,
      isLoading: true,
      isError: false,
      processFile: jest.fn(),
    })

    render(<QueryClientProvider client={queryClient}><App/></QueryClientProvider>)
    expect(screen.getByText('Loading data....')).toBeInTheDocument()
  })

  it('calls `processFile` when a file is uploaded', async () => {
    const mockProcessFile = jest.fn()
    mockUseOcrApi.mockReturnValueOnce({
      ocrWords: undefined,
      isLoading: false,
      isError: false,
      processFile: mockProcessFile,
    })

    render(<QueryClientProvider client={queryClient}><App/></QueryClientProvider>)

    const fileInput = screen.getByRole('file-input')
    const mockFile = new File(['dummy content'], 'test.png', { type: 'image/png' })
    userEvent.upload(fileInput, mockFile)

    expect(mockProcessFile).toHaveBeenCalledWith(mockFile)
  })
})
