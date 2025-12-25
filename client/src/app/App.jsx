// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClientLayout from '../components/layouts/ClientLayout';
import { getFlatRoutes } from './routes';
import { NotFoundPage } from '../pages';

function App() {
  const flatRoutes = getFlatRoutes();

  return (
    <Router>
      <Routes>
        {flatRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <ClientLayout>
                {route.element}
              </ClientLayout>
            }
          />
        ))}
        
        {/* Route 404 - trang riêng biệt, không có layout */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
