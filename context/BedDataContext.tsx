import React, { createContext, useContext, ReactNode } from 'react';
import type { AcupunctureRecord } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';

type BedData = { [key: string]: AcupunctureRecord | null };

interface BedDataContextType {
  beds: BedData;
  history: AcupunctureRecord[];
  updateBedData: (bedId: string, record: Omit<AcupunctureRecord, 'bedId' | 'acupunctureTimestamp' | 'removalTimestamp'>) => void;
  clearBedData: (bedId: string) => void;
}

const BedDataContext = createContext<BedDataContextType | undefined>(undefined);

export const BedDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [beds, setBeds] = useLocalStorage<BedData>('bedData', {});
  const [history, setHistory] = useLocalStorage<AcupunctureRecord[]>('acupunctureHistory', []);

  const updateBedData = (bedId: string, record: Omit<AcupunctureRecord, 'bedId' | 'acupunctureTimestamp' | 'removalTimestamp'>) => {
    const newRecord: AcupunctureRecord = { 
      ...record, 
      bedId,
      acupunctureTimestamp: record.scanTimestamp, // Set acupuncture time automatically on save
      removalTimestamp: null,
    };
    
    setBeds(prevBeds => ({
      ...prevBeds,
      [bedId]: newRecord,
    }));

    setHistory(prevHistory => [newRecord, ...prevHistory]);
  };
  
  const clearBedData = (bedId: string) => {
    const activeRecord = beds[bedId];
    if (!activeRecord) return;

    const removalTime = new Date().toISOString();

    const updatedRecord = {
      ...activeRecord,
      removalTimestamp: removalTime,
    };
    
    // Update the history record with the removal timestamp
    setHistory(prevHistory => prevHistory.map(hist => 
      (hist.scanTimestamp === activeRecord.scanTimestamp && hist.patientId === activeRecord.patientId) ? updatedRecord : hist
    ));

    // Clear the active bed data
    setBeds(prevBeds => ({
      ...prevBeds,
      [bedId]: null,
    }));
  };

  return (
    <BedDataContext.Provider value={{ beds, history, updateBedData, clearBedData }}>
      {children}
    </BedDataContext.Provider>
  );
};

export const useBedData = () => {
  const context = useContext(BedDataContext);
  if (context === undefined) {
    throw new Error('useBedData must be used within a BedDataProvider');
  }
  return context;
};