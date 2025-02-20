import React from 'react'

interface IOcrTextAreaProps {
  selectedText: string
}

const OcrTextArea: React.FC<IOcrTextAreaProps> = ({ selectedText }) => {
  const textAreaRole = 'textarea'
  return (
    <div className="textarea-container">
      <label className="label">TextArea</label>
      <textarea
        role={textAreaRole}
        className="textarea"
        value={selectedText}
        readOnly
      />
    </div>
  )
}

export default OcrTextArea
