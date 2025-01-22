import React, { useState } from 'react'
import './App.css'
import OcrImageView from './components/OcrImageView'
import OcrTextArea from './components/OcrTextArea'
import { useOcrApi } from './hooks/use-ocr-api'

const App: React.FC = () => {
  const [selectedText, setSelectedText] = useState<string>('')
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
        <input type="file" accept="image/*" onChange={handleFileUpload} />
        <div className="title">Optical Character Recognition</div>
      </div>
      {isLoading && <div className="message-status">Loading data....</div>}
      {isError && <div className="message-status">Error processing the file!</div>}
      {ocrWords && imageURL && (
        <div className="ocr-app-container">
          <div className="ocr-image-view container">
            <OcrImageView
              ocrWords={ocrWords}
              onWordClick={(word: string) => setSelectedText(word)}
              imageURL={imageURL}
            />
          </div>
          <div className="ocr-text-area container">
            <OcrTextArea selectedText={selectedText} />
          </div>
        </div>
      )}
    </div>
  )
}
export default App
