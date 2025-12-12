import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/web/Dashboard';
import RulesList from './pages/web/RulesList';
import CreateRule from './pages/web/CreateRule';
import EditRule from './pages/web/EditRule';
import AlertDetails from './pages/web/AlertDetails';
import History from './pages/web/History';
import MobileAlertsList from './pages/mobile/MobileAlertsList';
import MobileAlertDetails from './pages/mobile/MobileAlertDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Web Routes */}
        <Route path="/" element={<Layout><Dashboard /></Layout>} />
        <Route path="/rules" element={<Layout><RulesList /></Layout>} />
        <Route path="/rules/create" element={<Layout><CreateRule /></Layout>} />
        <Route path="/rules/edit/:id" element={<Layout><EditRule /></Layout>} />
        <Route path="/alerts/:id" element={<Layout><AlertDetails /></Layout>} />
        <Route path="/history" element={<Layout><History /></Layout>} />
        
        {/* Mobile Routes */}
        <Route path="/mobile" element={<Layout isMobile><MobileAlertsList /></Layout>} />
        <Route path="/mobile/alerts/:id" element={<Layout isMobile><MobileAlertDetails /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

