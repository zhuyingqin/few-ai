import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Program from './pages/Program';
import Keynote from './pages/Keynote';
import Panel from './pages/Panel';
import Poster from './pages/Poster';
import Photo from './pages/Photo';
import Profile from './pages/Profile';
import Organize from './pages/Organize';
import Registration from './pages/Registration';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/program" element={<Program />} />
          <Route path="/keynote" element={<Keynote />} />
          <Route path="/panel" element={<Panel />} />
          <Route path="/poster" element={<Poster />} />
          <Route path="/photo" element={<Photo />} />
          <Route path="/profile/:expertId" element={<Profile />} />
          <Route path="/organize" element={<Organize />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
