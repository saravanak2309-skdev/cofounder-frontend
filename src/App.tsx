import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './pages/LandingPage/LandingPage';
import CreateProfilePage from './pages/CreateProfilePage/CreateProfilePage';
import SwipePage from './pages/SwipePage/SwipePage';
import FiltersPage from './pages/FiltersPage/FiltersPage';
import MatchesPage from './pages/MatchesPage/MatchesPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <Routes>
                  <Route path="/create-profile" element={<CreateProfilePage />} />
                  <Route path="/swipe" element={<SwipePage />} />
                  <Route path="/filters" element={<FiltersPage />} />
                  <Route path="/matches" element={<MatchesPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                </Routes>
              </>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
