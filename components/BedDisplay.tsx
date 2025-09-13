import React from 'react';
import type { AcupunctureRecord } from '../types';
import { BODY_PARTS } from '../constants';

interface BedDisplayProps {
  record: AcupunctureRecord;
  bedId: string;
  onClear: () => void;
}

const BedDisplay: React.FC<BedDisplayProps> = ({ record, bedId, onClear }) => {
  const { 
    patientId, 
    counts, 
    total, 
    scanTimestamp,
    acupunctureTimestamp,
    removalTimestamp,
    moxibustionCount, 
    cupping, 
    electroacupuncturePairs, 
    remarks 
  } = record;

  const hasAdditionalInfo = moxibustionCount > 0 || cupping || electroacupuncturePairs > 0 || (remarks && remarks.trim() !== '');

  return (
    <div className="bg-white rounded-xl shadow-2xl p-6 md:p-10 text-slate-800 space-y-8">
      <div className="flex flex-wrap justify-between items-start mb-6 border-b-2 pb-4 border-slate-200">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-teal-600 tracking-tighter">床位 {bedId}</h1>
          <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-600 mt-2">病歷號: {patientId}</p>
        </div>
        <div className="text-right flex-shrink-0 ml-4 space-y-1">
             <p className="text-base text-slate-500">掃描: {new Date(scanTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
             <p className="text-base text-slate-500">針灸: {acupunctureTimestamp ? new Date(acupunctureTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '---'}</p>
             <p className="text-base text-slate-500">拔針: {removalTimestamp ? new Date(removalTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '---'}</p>
            <button onClick={onClear} className="mt-2 px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-colors">
                清空床位
            </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        {BODY_PARTS.map(part => (
          <div key={part.id} className="bg-slate-50 p-4 rounded-lg text-center">
            <p className="text-2xl sm:text-3xl font-semibold text-slate-500">{part.name}</p>
            <p className="text-6xl sm:text-7xl font-bold text-slate-900 mt-2">{counts[part.id]}</p>
          </div>
        ))}
      </div>
      
      {hasAdditionalInfo && (
        <div className="border-t-2 pt-6 border-slate-200">
            <h2 className="text-3xl font-bold text-slate-700 mb-4">附加項目</h2>
            <div className="bg-slate-50 p-6 rounded-lg space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-white rounded shadow-sm">
                        <p className="font-semibold text-slate-500">拔罐</p>
                        <p className={`text-2xl font-bold ${cupping ? 'text-green-600' : 'text-slate-400'}`}>{cupping ? '是' : '否'}</p>
                    </div>
                     <div className="p-3 bg-white rounded shadow-sm">
                        <p className="font-semibold text-slate-500">艾草數量</p>
                        <p className="text-2xl font-bold text-slate-800">{moxibustionCount}</p>
                    </div>
                     <div className="p-3 bg-white rounded shadow-sm">
                        <p className="font-semibold text-slate-500">電針對數</p>
                        <p className="text-2xl font-bold text-slate-800">{electroacupuncturePairs}</p>
                    </div>
                </div>
                {remarks && remarks.trim() !== '' && (
                    <div className="pt-4 text-left">
                        <p className="font-semibold text-slate-500 mb-1">備註</p>
                        <p className="text-lg text-slate-800 bg-white p-3 rounded whitespace-pre-wrap">{remarks}</p>
                    </div>
                )}
            </div>
        </div>
      )}

      <div className="bg-teal-500 text-white p-6 rounded-xl text-center">
        <p className="text-4xl font-bold tracking-wider">總針數</p>
        <p className="text-8xl font-black tracking-tighter mt-2">{total}</p>
      </div>
    </div>
  );
};

export default BedDisplay;