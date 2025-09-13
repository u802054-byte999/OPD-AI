
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Scanner from '../components/Scanner';
import NeedleRecordForm from '../components/NeedleRecordForm';

const HomePage: React.FC = () => {
  const [patientId, setPatientId] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScanSuccess = (decodedText: string) => {
    setPatientId(decodedText);
    setIsScanning(false);
  };

  const handleReset = () => {
    setPatientId(null);
    setIsScanning(false);
  };

  const QrCodeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h1v1H4V4zm2 0h1v1H6V4zm2 0h1v1H8V4zm4 0h1v1h-1V4zm2 0h1v1h-1V4zm2 0h1v1h-1V4zM4 6h1v1H4V6zm14 0h1v1h-1V6zM4 8h1v1H4V8zm14 0h1v1h-1V8zM4 10h1v1H4v-1zm2 0h1v1H6v-1zm2 0h1v1H8v-1zm6 0h1v1h-1v-1zm2 0h1v1h-1v-1zm2 0h1v1h-1v-1zM4 14h1v1H4v-1zm2 0h1v1H6v-1zm10 0h1v1h-1v-1zm2 0h1v1h-1v-1zM4 16h1v1H4v-1zm2 0h1v1H6v-1zm12 0h1v1h-1v-1zM4 18h1v1H4v-1zm2 0h1v1H6v-1zm2 0h1v1H8v-1zm4 0h1v1h-1v-1zm2 0h1v1h-1v-1zm2 0h1v1h-1v-1z" />
    </svg>
  );

  const HistoryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  if (patientId) {
    return (
      <div className="container mx-auto p-4 max-w-2xl">
        <NeedleRecordForm patientId={patientId} onComplete={handleReset} />
      </div>
    );
  }

  if (isScanning) {
    return (
       <div className="container mx-auto p-4 max-w-2xl">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-4 text-gray-700">掃描病人 QR Code</h1>
          <p className="text-center text-gray-500 mb-6">請將相機對準病歷上的 QR Code 進行掃描</p>
          <Scanner onScanSuccess={handleScanSuccess} />
          <button 
            onClick={() => setIsScanning(false)}
            className="mt-4 w-full bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
          >
            取消
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center mt-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">主選單</h1>
        <div className="space-y-5">
            <button 
              onClick={() => setIsScanning(true)}
              className="w-full bg-teal-600 text-white font-bold py-6 px-4 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-300 transition-colors duration-300 text-2xl flex items-center justify-center shadow-lg"
              aria-label="Start QR code scanning"
            >
              <QrCodeIcon />
              開始掃描
            </button>
            <Link 
              to="/history"
              className="block w-full bg-slate-600 text-white font-bold py-6 px-4 rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-slate-300 transition-colors duration-300 text-2xl flex items-center justify-center shadow-lg"
              aria-label="View history records"
            >
               <HistoryIcon />
               歷史紀錄
            </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
