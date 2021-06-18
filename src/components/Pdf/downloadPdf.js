import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PDF from './Pdf';

const DownloadPdf = ({ user, repair, setPdfDownload }) => (
  <div>
    <PDFDownloadLink
      document={<PDF user={user} repair={repair} />}
      fileName={`MGVWatch_${repair.numero}`}
    >
      {({ blob, url, loading, error }) =>
        loading ? (
          <FontAwesomeIcon icon="spinner" pulse className="pdf-icon" />
        ) : (
          <FontAwesomeIcon
            icon="file-download"
            className="pdf-icon"
            onClick={() => {
              setPdfDownload(true);
              setTimeout(() => {
                setPdfDownload(false);
              }, 1000);
            }}
          />
        )
      }
    </PDFDownloadLink>
  </div>
);

export default DownloadPdf;
