import React, { useState } from 'react'
import './App.css'
import { useOcrApi } from './hooks/use-ocr-api'
import OcrPageView from './components/OcrPageView'

const App: React.FC = () => {
  const [imageURL, setImageURL] = useState<string | null>(null)
  const { ocrWords, isLoading, isError, processFile } = useOcrApi()

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) {
      setImageURL('')
      return
    }

    setImageURL(URL.createObjectURL(selectedFile))
    processFile(selectedFile)
  }

  return (
    <div className="ocr-app">
      <div className="file-upload">
        <input role="file-input" type="file" accept="image/*" onChange={handleFileUpload} />
        <div className="title">Optical Character Recognition</div>
      </div>
      {isLoading && <div className="message-status">Processing OCR....</div>}
      {isError && <div className="message-status" style={{color: 'red'}}>Error processing the file!</div>}
      {ocrWords && imageURL && <OcrPageView ocrWords={ocrWords} imageURL={imageURL} />}
    </div>
  )
}
export default App
