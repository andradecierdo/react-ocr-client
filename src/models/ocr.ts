export type OcrApiResult = {
    hasError: boolean
    errorMessage: string
    results: OcrApiParsedResult[]
}

export type OcrApiParsedResult = {
    lineText: string
    maxHeight: number
    minTop: number
    words: OcrWord[]
}

export type OcrWord = {
    text: string
    position: WordPosition
}

export type WordPosition = [number, number, number, number]
