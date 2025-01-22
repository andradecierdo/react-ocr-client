import { useMutation } from 'react-query'
import ocrApiClient from '../api/ocr-api.client'
import { OcrApiParsedResult, OcrWord } from '../models/ocr'

const formatOcrResults = (results: OcrApiParsedResult[]): OcrWord[] => {
  return results.flatMap(o => {
    return o.words.map(({ text, position}) => ({ text, position }))
  })
}

export const useOcrApi = () => {
  const { isError, isLoading, data: ocrWords, mutate: processFile } = useMutation<OcrWord[], Error, File>(
    async (selectedFile) => {
      const data = await ocrApiClient.processFile(selectedFile)
      return formatOcrResults(data.results)
    }
  )

  return {
    ocrWords,
    isLoading,
    isError,
    processFile,
  }
}
