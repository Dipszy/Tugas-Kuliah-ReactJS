import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const getInitialPage = () => {
    const hash = window.location.hash.replace('#', '');
    if (['home', 'team', 'contact'].includes(hash)) {
      return hash;
    }
    return 'home';
  };

  const [activePage, setActivePage] = useState(getInitialPage);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'team', 'contact'].includes(hash)) {
        setActivePage(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const changePage = (page) => {
    setActivePage(page);
    window.location.hash = page;
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar activePage={activePage} setActivePage={changePage} />

      <main className="main-content flex-grow-1">
        {activePage === 'home' && <Home setActivePage={changePage} />}
        {activePage === 'team' && <Team />}
        {activePage === 'contact' && <Contact />}
      </main>

      <Footer setActivePage={changePage} />
    </div>
  );
}

export default App;
