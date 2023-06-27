'use client'

import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

type Props = {
  file: any;
}

const PDFViewer: React.FC<{ fileURL: string }> = ({ fileURL }) => {
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = (args: any) => {
    setNumPages(args.numPages);
  };

  return (
    <Document
      className="document-pdf"
      file={fileURL}
      onLoadSuccess={onDocumentLoadSuccess}
    >
      {Array.from(new Array(numPages), (el, index) => (
        <Page key={index} pageNumber={index + 1} />
      ))}
    </Document>
  );
};

export default PDFViewer;