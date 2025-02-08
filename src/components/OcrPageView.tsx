import { useState } from 'react'
import OcrImageView from './OcrImageView'
import OcrTextArea from './OcrTextArea'
import { OcrWord } from '../models/ocr'

interface IOcrPageViewProps {
  ocrWords: OcrWord[]
  imageURL: string
}

const OcrPageView: React.FC<IOcrPageViewProps> = ({ ocrWords, imageURL}) => {
  const [selectedText, setSelectedText] = useState<string>('')
  
  return (
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
    )
}

export default OcrPageView
