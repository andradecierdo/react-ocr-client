export abstract class OcrClient<R> {
  abstract processFile(selectedFile: File): Promise<R>
}
