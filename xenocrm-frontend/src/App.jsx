import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

// Components
import Layout from './components/Layout';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CampaignBuilder from './pages/CampaignBuilder';
import CampaignList from './pages/CampaignList';
import CustomerAnalytics from './pages/CustomerAnalytics';
import CampaignHistory from './pages/CampaignHistory';

// Create theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/campaigns"
            element={
              <Layout>
                <CampaignList />
              </Layout>
            }
          />
          <Route
            path="/campaigns/new"
            element={
              <Layout>
                <CampaignBuilder />
              </Layout>
            }
          />
          <Route
            path="/campaigns/edit/:id"
            element={
              <Layout>
                <CampaignBuilder />
              </Layout>
            }
          />
          <Route
            path="/analytics/customers"
            element={
              <Layout>
                <CustomerAnalytics />
              </Layout>
            }
          />
          <Route
            path="/campaigns/history"
            element={
              <Layout>
                <CampaignHistory />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
