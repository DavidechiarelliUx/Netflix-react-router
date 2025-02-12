import './App.css'
import Footer from './component/Footer';
import SectionFilm from './component/SectionFilm';
import TopBar from './component/TopBar';
import TvShows from './component/TvShows';
import MovieDetails from './component/movieDetails';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {


  return (
    <>
      <BrowserRouter>
        <TopBar />
        <Routes>
          <Route path="/tv-show" element={<TvShows />} />
          <Route path="/movie-details/:movieId" element={<MovieDetails />} />
        </Routes>
        <SectionFilm title="Trending Now" filmTitle="Star Wars" />
        <SectionFilm title="Watch it Again" filmTitle="Harry Potter" />
        <SectionFilm title="New Releases" filmTitle="Naruto" />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
