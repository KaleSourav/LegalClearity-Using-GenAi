'use server';

/**
 * @fileOverview A flow to extract text from a PDF file.
 *
 * - extractTextFromPdf - A function that handles the text extraction from a PDF.
 * - ExtractTextFromPdfInput - The input type for the extractTextFromPdf function.
 * - ExtractTextFromPdfOutput - The return type for the extractTextFromPdf function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import * as pdfjs from 'pdfjs-dist/build/pdf';

const ExtractTextFromPdfInputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe(
      "A PDF file as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:application/pdf;base64,<encoded_data>'."
    ),
});
export type ExtractTextFromPdfInput = z.infer<
  typeof ExtractTextFromPdfInputSchema
>;

const ExtractTextFromPdfOutputSchema = z.object({
  text: z.string().describe('The extracted text from the PDF.'),
});
export type ExtractTextFromPdfOutput = z.infer<
  typeof ExtractTextFromPdfOutputSchema
>;

export async function extractTextFromPdf(
  input: ExtractTextFromPdfInput
): Promise<ExtractTextFromPdfOutput> {
  return extractTextFromPdfFlow(input);
}

const extractTextFromPdfFlow = ai.defineFlow(
  {
    name: 'extractTextFromPdfFlow',
    inputSchema: ExtractTextFromPdfInputSchema,
    outputSchema: ExtractTextFromPdfOutputSchema,
  },
  async input => {
    const pdfData = Buffer.from(
      input.pdfDataUri.substring(input.pdfDataUri.indexOf(',') + 1),
      'base64'
    );

    const pdf = await pdfjs.getDocument(pdfData).promise;
    let text = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map(item => (item as any).str).join(' ');
      text += pageText + '\n\n';
    }

    return {text};
  }
);
