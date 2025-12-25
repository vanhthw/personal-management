// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClientLayout from '../components/layouts/ClientLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ClientLayout></ClientLayout>} />
        <Route path="/learning/track-hours" element={<ClientLayout></ClientLayout>} />
        {/* Add more routes */}
      </Routes>
    </Router>
  );
}

export default App;