
import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { BedDataProvider } from './context/BedDataContext';
import HomePage from './pages/HomePage';
import BedPage from './pages/BedPage';
import HistoryPage from './pages/HistoryPage';
import { BED_COUNT } from './constants';

const App: React.FC = () => {
  return (
    <BedDataProvider>
      <HashRouter>
        <div className="min-h-screen bg-slate-100 text-slate-800">
          <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <Link to="/" className="text-2xl font-bold text-teal-600">針灸計數系統</Link>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">床位:</span>
                  <div className="flex flex-wrap gap-1">
                  {Array.from({ length: BED_COUNT }, (_, i) => i + 1).map(bedNum => (
                    <Link 
                      key={bedNum} 
                      to={`/bed/${bedNum}`} 
                      className="text-sm w-8 h-8 flex items-center justify-center bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
                    >
                      {bedNum}
                    </Link>
                  ))}
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/bed/:bedId" element={<BedPage />} />
              <Route path="/history" element={<HistoryPage />} />
            </Routes>
          </main>
        </div>
      </HashRouter>
    </BedDataProvider>
  );
};

export default App;
