import axios from 'axios'
import { OcrApiResult } from '../models/ocr'
import { OcrClient } from './ocr-api'

class OcrApiClient implements OcrClient<OcrApiResult> {
  private client = axios.create({ baseURL: process.env.REACT_APP_OCR_API_URL })

  private async postRequest(formData: FormData, route: string): Promise<OcrApiResult> {
    try {
      const response = await this.client.post<OcrApiResult>(route, formData)
      return response.data
    } catch (error) {
      console.error('Server error: Error processing the file for OCR.', error)
      throw error
    }
  }

  async processFile(selectedFile: File): Promise<OcrApiResult> {
    const formData = new FormData()
    formData.append('file', selectedFile)
    const result = await this.postRequest(formData, '/ocr/process')

    if (result.hasError) {
      throw new Error(result.errorMessage)
    }

    return result
  }
}
const ocrApiClient = new OcrApiClient()
export default ocrApiClient
