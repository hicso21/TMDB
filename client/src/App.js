import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "./components/Layout";
import Movies from "./components/desktop/Movies";
import TVShows from "./components/desktop/TVShows";
import People from "./components/desktop/People";
import Search from "./components/desktop/Search";
import Home from "./components/desktop/Home";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import SingMovie from "./components/desktop/SingMovie";
import SingTv from "./components/desktop/SingTv";
import Person from "./components/desktop/Person";
import Watchlist from "./components/desktop/Watchlist";
import Profile from "./components/desktop/Profile";
import Watched from "./components/desktop/Watched";
import Favorites from "./components/desktop/Favorites";

function App() {
  return (
    <>
      <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<SignUp/>}/>
              <Route path="/movies" element={<Movies/>}/>
              <Route path="/movie/:id" element={<SingMovie/>}/>
              <Route path="/tv" element={<TVShows/>}/>
              <Route path="/tv/:id" element={<SingTv/>}/>
              <Route path="/people" element={<People/>}/>
              <Route path="/person/:id" element={<Person/>}/>
              <Route path="/search" element={<Search/>}/>
              <Route path="/favorites" element={<Favorites/>}/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/watched" element={<Watched/>}/>
              <Route path="/watchlist" element={<Watchlist/>}/>
            </Routes>
          </Layout>
      </Router>
    </>
  );
}

export default App;
