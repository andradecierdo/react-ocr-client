import React, { useRef, useState } from 'react'
import { OcrWord, WordPosition } from '../models/ocr'
import { MdOutlineZoomIn, MdOutlineZoomOut } from "react-icons/md"

interface OcrViewProps {
  ocrWords: OcrWord[]
  imageURL: string
  onWordClick: (word: string) => void
}

type ImageDimension = {
  width: number
  height: number
}

const OcrView: React.FC<OcrViewProps> = ({ ocrWords, imageURL, onWordClick}) => {
  // const [scale, setScale] = useState(1)
  const [imageDimensions, setImageDimensions] = useState<ImageDimension | null>(null)
  const [scaledDimensions, setScaledDimensions] = useState<ImageDimension | null>(null)

  const imageRef = useRef<HTMLImageElement | null>(null)

  const MAX_IMAGE_HEIGHT = 1000
  const MAX_IMAGE_WIDTH = 800

  const scaleRef = useRef(1)
  const ZOOM_SIZE = 0.1
  // use the useRef function to avoid re-rendering when zooming
  const handleZoom = (value: number) => {
    const newScale = Math.max(0.5, scaleRef.current + value)
    scaleRef.current = newScale

    const container = document.getElementById('image-view-container') as HTMLElement
    if (container) {
      container.style.transform = `scale(${newScale})`
    }
  }

  const handleClick = (word: OcrWord) => {
    onWordClick(word.text)
  }

  // After loading the image, scale accordingly to fit on the max dimension
  const onLoadImage = () => {
    if (imageRef.current) {
      const { naturalWidth, naturalHeight } = imageRef.current
      setImageDimensions({ width: naturalWidth, height: naturalHeight })

      const scaled = calculateScaledDimension(
        naturalWidth,
        naturalHeight,
        MAX_IMAGE_WIDTH,
        MAX_IMAGE_HEIGHT
      )

      setScaledDimensions(scaled)
    }
  }

  const calculateScaledDimension = (
    naturalWidth: number,
    naturalHeight: number,
    maxWidth: number,
    maxHeight: number
  ): ImageDimension => {
    const aspectRatio = naturalWidth / naturalHeight;
  
    // If the image is greater than the max dimension
    if (naturalHeight > maxHeight || naturalWidth > maxWidth) {
      if (aspectRatio > 1) {
        // If image is wider
        return { width: maxWidth, height: maxWidth / aspectRatio }
      } else {
        // If image is taller
        return { width: maxHeight * aspectRatio, height: maxHeight }
      }
    }
  
    // Else, set the original image dimension
    return { width: naturalWidth, height: naturalHeight }
  }

  // After scaling, the text position (bounding box) should also be ajusted accordingly based on the final image scale,
  // to properly overlay the bounding box to the image.
  const getScaledPosition = (position: WordPosition) => {
    if (!imageDimensions || !scaledDimensions) {
      return position
    }

    const scaleX = scaledDimensions.width / imageDimensions.width
    const scaleY = scaledDimensions.height / imageDimensions.height

    return [
      position[0] * scaleX,
      position[1] * scaleY,
      position[2] * scaleX,
      position[3] * scaleY,
    ]
  }

  return (
    <div className="image-view">
      <div className="zoom-controls">
        <MdOutlineZoomIn role="zoom-in" onClick={() => handleZoom(ZOOM_SIZE)} />
        <MdOutlineZoomOut role="zoom-out" onClick={() => handleZoom(-ZOOM_SIZE)} />
      </div>
      <div id="image-view-container" className="image-container">
        <img
          id="ocr-uploaded-image"
          role="uploaded-image"
          src={imageURL}
          alt="Uploaded Image"
          ref={imageRef}
          onLoad={onLoadImage}
          style={{
            width: scaledDimensions?.width || 'auto',
            height: scaledDimensions?.height || 'auto',
          }}
          draggable={false}
          className="uploaded-image"
        />
        {ocrWords.map((word, index) => {
          const [x, y, width, height] = getScaledPosition(word.position)

          return <div
            role="word-box"
            key={index}
            className="ocr-text-highlight"
            style={{
              left: `${x}px`,
              top: `${y}px`,
              width: `${width}px`,
              height: `${height}px`,
            }}
            onClick={() => handleClick(word)}
          />
        })}
      </div>
    </div>
  )
}

export default OcrView
