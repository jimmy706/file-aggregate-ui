import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import IndexPage from './IndexPage';
import SalesDetail from './SalesDetail';


function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage/>} />
        <Route path="/files/:fileId" element={<SalesDetail/>} />
      </Routes>
    </Router>
  );
}

export default App;
