import React, { useState, useEffect } from 'react';
import { DepartmentId, PageId } from './types/hub';
import { Header } from './components/navigation/Header';
import { DepartmentCommandBar } from './components/navigation/DepartmentCommandBar';
import { Footer } from './components/sections/Footer';
import { HomePage } from './pages/HomePage';
import { OilAndGasPage } from './pages/OilAndGasPage';
import { KitchenPage } from './pages/KitchenPage';
import { LoungePage } from './pages/LoungePage';
import { CarWashPage } from './pages/CarWashPage';
import { GardenPage } from './pages/GardenPage';
import { PromenadePage } from './pages/PromenadePage';
import { BookPage } from './pages/BookPage';
import { LocationPage } from './pages/LocationPage';
import { DepartmentDetailModal } from './components/departments/DepartmentDetailModal';
import { RetailLeaseModal } from './components/departments/RetailLeaseModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [activeDept, setActiveDept] = useState<DepartmentId>('oil-gas');
  const [detailModalDept, setDetailModalDept] = useState<DepartmentId | null>(null);
  const [isLeaseModalOpen, setIsLeaseModalOpen] = useState<boolean>(false);

  // Sync hash URL for real back/forward browser history navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      if (['home', 'oil-gas', 'kitchen', 'lounge', 'carwash', 'garden', 'promenade', 'book', 'location'].includes(hash)) {
        setCurrentPage(hash);
        if (['oil-gas', 'kitchen', 'lounge', 'carwash', 'garden'].includes(hash)) {
          setActiveDept(hash as DepartmentId);
        }
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToPage = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page;
    if (['oil-gas', 'kitchen', 'lounge', 'carwash', 'garden'].includes(page)) {
      setActiveDept(page as DepartmentId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDept = (deptId: DepartmentId) => {
    setActiveDept(deptId);
    navigateToPage(deptId as PageId);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950 w-full max-w-full overflow-x-hidden">
      {/* 1. Global Header: Strictly says "Book" at the top as requested */}
      <Header
        currentPage={currentPage}
        onNavigatePage={navigateToPage}
      />

      {/* 2. Department Quick Switcher Strip */}
      <DepartmentCommandBar
        activeDept={activeDept}
        onSelectDept={handleSelectDept}
        onJumpToLeases={() => navigateToPage('promenade')}
      />

      {/* 3. True Multi-Page Content Rendering */}
      <main className="flex-grow">
        {currentPage === 'home' && (
          <HomePage
            activeDept={activeDept}
            onSelectDept={setActiveDept}
            onOpenDeptDetail={(id) => setDetailModalDept(id)}
            onNavigatePage={navigateToPage}
            onOpenLeasingModal={() => setIsLeaseModalOpen(true)}
          />
        )}

        {currentPage === 'oil-gas' && <OilAndGasPage />}
        {currentPage === 'kitchen' && <KitchenPage />}
        {currentPage === 'lounge' && <LoungePage />}
        {currentPage === 'carwash' && <CarWashPage />}
        {currentPage === 'garden' && <GardenPage />}
        {currentPage === 'promenade' && <PromenadePage />}
        {currentPage === 'book' && <BookPage />}
        {currentPage === 'location' && <LocationPage />}
      </main>

      {/* 4. Footer */}
      <Footer
        onSelectDept={handleSelectDept}
        onNavigateSection={(sec) => {
          if (sec === 'promenade') navigateToPage('promenade');
          else if (sec === 'calculator') navigateToPage('oil-gas');
          else if (sec === 'location') navigateToPage('location');
          else navigateToPage('home');
        }}
      />

      {/* Modals */}
      <DepartmentDetailModal
        deptId={detailModalDept}
        onClose={() => setDetailModalDept(null)}
        onSwitchDept={(id) => {
          setActiveDept(id);
          setDetailModalDept(id);
        }}
      />

      <RetailLeaseModal
        isOpen={isLeaseModalOpen}
        onClose={() => setIsLeaseModalOpen(false)}
      />
    </div>
  );
}
