import React from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import "./PDFItem.css";
function PDFItem(props) {
  return (
    <Document id="pdf-to-download" file={props.base64data}>
      <Page pageNumber={1}></Page>
    </Document>
  );
}

export default PDFItem;
