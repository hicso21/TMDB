import Layout from "./components/Layout";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Movies from "./components/desktop/Movies";
import TVShows from "./components/desktop/TVShows";
import People from "./components/desktop/People";
import Search from "./components/desktop/Search";
import useMatches from "./hooks/useMatches";
import Home from "./components/desktop/Home";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import SingMovie from "./components/desktop/SingMovie";
import SingTv from "./components/desktop/SingTv";

function App() {
  const matches = useMatches()

  return (
    <>
      <Router>
          <Layout>
            <Routes>
              <Route path="/" element={matches?<Home/>:<Home/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<SignUp/>}/>
              <Route path="/movies" element={matches?<Movies/>:<></>}/>
              <Route path="/movie/:id" element={matches?<SingMovie/>:<></>}/>
              <Route path="/tv" element={matches?<TVShows/>:<></>}/>
              <Route path="/tv/:id" element={matches?<SingTv/>:<></>}/>
              <Route path="/people" element={matches?<People/>:<></>}/>
              <Route path="/person/:id" element={matches?<></>:<></>}/>
              <Route path="/gender" element={matches?<></>:<></>}/>
              <Route path="/search" element={matches?<Search/>:<></>}/>
              <Route path="/profile" element={matches?<></>:<></>}/>
              <Route path="/watched" element={matches?<></>:<></>}/>
              <Route path="/watchlist" element={matches?<></>:<></>}/>
            </Routes>
          </Layout>
      </Router>
    </>
  );
}

export default App;
