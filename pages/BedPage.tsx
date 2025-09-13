
import React from 'react';
import { useParams } from 'react-router-dom';
import { useBedData } from '../context/BedDataContext';
import BedDisplay from '../components/BedDisplay';

const EmptyBedDisplay: React.FC<{bedId: string}> = ({bedId}) => (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-10rem)] text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 15l7-7 7 7" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 8h14v11a2 2 0 01-2 2H7a2 2 0 01-2-2V8z" />
        </svg>
        <p className="text-6xl font-bold mt-4">床位 {bedId}</p>
        <p className="text-4xl mt-2">目前無病人</p>
    </div>
);

const BedPage: React.FC = () => {
  const { bedId } = useParams<{ bedId: string }>();
  const { beds, clearBedData } = useBedData();

  if (!bedId) {
    return <div>無效的床位</div>;
  }
  
  const record = beds[bedId];

  return (
    <div className="p-4">
      {record ? (
        <BedDisplay record={record} bedId={bedId} onClear={() => clearBedData(bedId)} />
      ) : (
        <EmptyBedDisplay bedId={bedId}/>
      )}
    </div>
  );
};

export default BedPage;
