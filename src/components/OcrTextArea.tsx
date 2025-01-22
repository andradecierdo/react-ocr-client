import React from 'react'

interface OcrTextAreaProps {
  selectedText: string;
}

const OcrTextArea: React.FC<OcrTextAreaProps> = ({ selectedText }) => {
  return (
    <div className="textarea-container">
      <label className="label">TextArea</label>
      <textarea
        className="textarea"
        value={selectedText}
        readOnly
      />
    </div>
  );
};

export default OcrTextArea;
