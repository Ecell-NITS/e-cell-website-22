import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import GalleryPage from './pages/GalleryPage/GalleryPage';

function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route exact path="/" element={< HomePage />} key='route-home-screen' />
            <Route exact path="/gallery" element={< GalleryPage />} key='route-gallery-screen' />           
          </Routes>
      </BrowserRouter>
  </>
  );
}

export default App;
