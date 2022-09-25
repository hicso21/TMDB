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

function App() {
  const matches = useMatches()

  return (
    <>
      <Router>
          <Layout>
            <Routes>
              <Route path="/" element={matches?<Home/>:<></>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<SignUp/>}/>
              <Route path="/movies" element={matches?<Movies/>:<></>}/>
              <Route path="/tv" element={matches?<TVShows/>:<></>}/>
              <Route path="/people" element={matches?<People/>:<></>}/>
              <Route path="/genre" element={matches?<></>:<></>}/>
              <Route path="/search/:key" element={matches?<Search/>:<></>}/>
              <Route path="/" element={matches?<></>:<></>}/>
            </Routes>
          </Layout>
      </Router>
    </>
  );
}

export default App;
