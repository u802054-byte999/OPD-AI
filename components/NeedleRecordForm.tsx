import React, { useState } from 'react';
import { useBedData } from '../context/BedDataContext';
import { BODY_PARTS, BED_COUNT } from '../constants';
import type { NeedleCounts, BodyPart } from '../types';

interface NeedleRecordFormProps {
  patientId: string;
  onComplete: () => void;
}

const initialCounts = BODY_PARTS.reduce((acc, part) => {
  acc[part.id] = 0;
  return acc;
}, {} as NeedleCounts);

const NeedleRecordForm: React.FC<NeedleRecordFormProps> = ({ patientId, onComplete }) => {
  const { updateBedData } = useBedData();
  const [counts, setCounts] = useState<NeedleCounts>(initialCounts);
  const [selectedBed, setSelectedBed] = useState('1');
  const [moxibustionCount, setMoxibustionCount] = useState(0);
  const [cupping, setCupping] = useState(false);
  const [electroacupuncturePairs, setElectroacupuncturePairs] = useState(0);
  const [remarks, setRemarks] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleCountChange = (partId: BodyPart, value: number) => {
    setCounts(prev => ({ ...prev, [partId]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
    
    updateBedData(selectedBed, {
      patientId,
      counts,
      total,
      moxibustionCount,
      cupping,
      electroacupuncturePairs,
      remarks,
      scanTimestamp: new Date().toISOString(),
    });

    setSubmitted(true);
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-3xl font-bold mt-4 text-gray-700">紀錄成功</h2>
        <p className="text-lg text-gray-500 mt-2">資料已傳送至 {selectedBed} 號床位</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-700">記針作業</h1>
        <button onClick={onComplete} className="text-sm text-gray-500 hover:text-gray-800">返回掃描</button>
      </div>
      <p className="text-xl mb-6 text-gray-600">病歷號: <span className="font-semibold text-teal-600">{patientId}</span></p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
          {BODY_PARTS.map(part => (
            <div key={part.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <label htmlFor={part.id} className="text-2xl font-medium text-gray-800">{part.name}</label>
              <select
                id={part.id}
                value={counts[part.id]}
                onChange={(e) => handleCountChange(part.id, parseInt(e.target.value, 10))}
                className="bg-white border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-24 p-2 text-center"
                aria-label={`${part.name} needle count`}
              >
                {Array.from({ length: 31 }, (_, i) => i).map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div className="border-t pt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                  <input
                    id="cupping"
                    type="checkbox"
                    checked={cupping}
                    onChange={(e) => setCupping(e.target.checked)}
                    className="w-5 h-5 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500"
                  />
                  <label htmlFor="cupping" className="ml-3 text-lg font-medium text-gray-800">拔罐</label>
                </div>

                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <label htmlFor="moxibustion" className="text-lg font-medium text-gray-800">艾草數量</label>
                  <select
                    id="moxibustion"
                    value={moxibustionCount}
                    onChange={(e) => setMoxibustionCount(parseInt(e.target.value, 10))}
                    className="bg-white border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-20 p-2 text-center"
                    aria-label="Moxibustion count"
                  >
                    {Array.from({ length: 11 }, (_, i) => i).map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
                 <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <label htmlFor="electroacupuncture" className="text-lg font-medium text-gray-800">電針對數</label>
                  <select
                    id="electroacupuncture"
                    value={electroacupuncturePairs}
                    onChange={(e) => setElectroacupuncturePairs(parseInt(e.target.value, 10))}
                    className="bg-white border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-20 p-2 text-center"
                    aria-label="Electroacupuncture pairs"
                  >
                    {Array.from({ length: 11 }, (_, i) => i).map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
            </div>

            <div>
              <label htmlFor="remarks" className="block mb-2 text-lg font-medium text-gray-800">備註</label>
              <textarea
                id="remarks"
                rows={3}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="w-full p-3 bg-white border border-gray-300 rounded-lg text-black focus:ring-teal-500 focus:border-teal-500"
                placeholder="請輸入備註..."
              ></textarea>
            </div>
        </div>

        <div className="border-t pt-6">
          <label htmlFor="bed-select" className="block mb-2 text-xl font-semibold text-gray-700">選擇床位</label>
          <select
            id="bed-select"
            value={selectedBed}
            onChange={(e) => setSelectedBed(e.target.value)}
            className="w-full p-4 bg-white border border-gray-300 rounded-lg text-black text-lg focus:ring-teal-500 focus:border-teal-500"
          >
            {Array.from({ length: BED_COUNT }, (_, i) => i + 1).map(bedNum => (
              <option key={bedNum} value={bedNum}>{bedNum} 號床</option>
            ))}
          </select>
        </div>

        <button 
          type="submit" 
          className="w-full bg-teal-600 text-white font-bold py-4 px-4 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-300 transition-colors duration-300 text-xl"
        >
          儲存紀錄
        </button>
      </form>
    </div>
  );
};

export default NeedleRecordForm;