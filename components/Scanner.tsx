
import React, { useEffect, useRef } from 'react';

// This tells TypeScript that Html5Qrcode is available globally,
// since we're including it via a <script> tag in index.html.
declare const Html5Qrcode: any;

interface ScannerProps {
  onScanSuccess: (decodedText: string) => void;
}

const Scanner: React.FC<ScannerProps> = ({ onScanSuccess }) => {
  const scannerRef = useRef<any>(null);

  useEffect(() => {
    const qrCodeRegionId = "qr-code-reader";

    // Prevent multiple initializations
    if (scannerRef.current) {
        return;
    }

    const html5QrCode = new Html5Qrcode(qrCodeRegionId);
    scannerRef.current = html5QrCode;
    
    const qrCodeSuccessCallback = (decodedText: string, decodedResult: any) => {
      onScanSuccess(decodedText);
      html5QrCode.stop().catch((err: any) => console.error("Failed to stop scanner", err));
    };

    const config = { fps: 10, qrbox: { width: 250, height: 250 } };
    
    html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback)
        .catch((err: any) => {
            console.error("Unable to start scanning.", err);
        });

    return () => {
        if(scannerRef.current && scannerRef.current.isScanning) {
            scannerRef.current.stop()
                .catch((err: any) => {
                    console.error("Failed to stop the scanner on cleanup.", err);
                });
        }
    };
  }, [onScanSuccess]);

  return <div id="qr-code-reader" className="w-full rounded-lg overflow-hidden border-4 border-gray-200"></div>;
};

export default Scanner;
