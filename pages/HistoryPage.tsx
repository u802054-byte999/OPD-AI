import React from 'react';
import { Link } from 'react-router-dom';
import { useBedData } from '../context/BedDataContext';
import type { AcupunctureRecord } from '../types';
import { BODY_PARTS } from '../constants';

const RecordCard: React.FC<{ record: AcupunctureRecord }> = ({ record }) => {
  const {
    patientId,
    bedId,
    scanTimestamp,
    acupunctureTimestamp,
    removalTimestamp,
    total,
    counts,
    cupping,
    moxibustionCount,
    electroacupuncturePairs,
    remarks,
  } = record;

  return (
    <details className="bg-white rounded-lg shadow-md overflow-hidden">
      <summary className="p-4 cursor-pointer hover:bg-gray-50 flex justify-between items-center">
        <div>
          <p className="font-bold text-lg text-teal-700">病歷號: {patientId}</p>
          <p className="text-sm text-gray-500">
            掃描時間: {new Date(scanTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-600">床位: {bedId}</p>
          <p className="text-xl font-bold text-gray-800">總針數: {total}</p>
        </div>
      </summary>
      <div className="border-t border-gray-200 p-4 bg-gray-50 space-y-4">
        <div>
          <h4 className="font-bold text-md mb-2 text-gray-700">治療時間</h4>
          <div className="grid grid-cols-3 gap-2 text-sm text-center">
              <div className="bg-white p-2 rounded"><span className="font-semibold text-gray-600">掃描:</span> {new Date(scanTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
              <div className="bg-white p-2 rounded"><span className="font-semibold text-gray-600">針灸:</span> {acupunctureTimestamp ? new Date(acupunctureTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}</div>
              <div className="bg-white p-2 rounded"><span className="font-semibold text-gray-600">拔針:</span> {removalTimestamp ? new Date(removalTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}</div>
          </div>
        </div>

        <div>
            <h4 className="font-bold text-md mb-2 text-gray-700">詳細針數</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {BODY_PARTS.filter(part => counts[part.id] > 0).length > 0 ? (
                BODY_PARTS.map(part => (
                counts[part.id] > 0 && (
                    <div key={part.id} className="bg-white p-2 rounded text-sm text-center">
                    <span className="font-semibold text-gray-600">{part.name}: </span>
                    <span className="font-bold text-gray-800">{counts[part.id]}</span>
                    </div>
                )
                ))
            ) : (
                <p className="text-sm text-gray-500 col-span-full">無針灸紀錄</p>
            )}
            </div>
        </div>
        
        <div>
            <h4 className="font-bold text-md mb-2 text-gray-700">附加項目</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                <div className="bg-white p-2 rounded text-center"><span className="font-semibold text-gray-600">拔罐:</span> {cupping ? '是' : '否'}</div>
                <div className="bg-white p-2 rounded text-center"><span className="font-semibold text-gray-600">艾草:</span> {moxibustionCount}</div>
                <div className="bg-white p-2 rounded text-center"><span className="font-semibold text-gray-600">電針:</span> {electroacupuncturePairs}</div>
            </div>
        </div>

        {remarks && (
            <div>
                <h4 className="font-bold text-md mb-1 text-gray-700">備註</h4>
                <p className="text-sm text-gray-800 bg-white p-2 rounded whitespace-pre-wrap">{remarks}</p>
            </div>
        )}
      </div>
    </details>
  );
};

const HistoryPage: React.FC = () => {
  const { history } = useBedData();

  const todayRecords = history.filter(record => {
    const recordDate = new Date(record.scanTimestamp).toLocaleDateString();
    const todayDate = new Date().toLocaleDateString();
    return recordDate === todayDate;
  });

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-700">今日治療紀錄</h1>
        <Link to="/" className="text-teal-600 hover:text-teal-800 font-semibold px-4 py-2 rounded-lg hover:bg-teal-50 transition-colors">
          &larr; 返回主頁
        </Link>
      </div>
      {todayRecords.length === 0 ? (
        <div className="text-center bg-white p-10 rounded-lg shadow-md">
           <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
           </svg>
          <h2 className="mt-4 text-xl font-semibold text-gray-600">今日尚無任何紀錄</h2>
          <p className="text-gray-400 mt-1">完成記針作業後，紀錄將會顯示於此處。</p>
        </div>
      ) : (
        <div className="space-y-4">
          {todayRecords.map((record, index) => (
            <RecordCard key={`${record.scanTimestamp}-${index}`} record={record} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;