import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
} from '@mui/material';
import CampaignIcon from '@mui/icons-material/Campaign';
import HistoryIcon from '@mui/icons-material/History';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AnalyticsIcon from '@mui/icons-material/Analytics';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // TODO: Implement logout logic
    navigate('/');
  };

  const isActive = (path) => {
    if (path === '/campaigns') {
      return location.pathname.startsWith('/campaigns') && !location.pathname.includes('history');
    }
    return location.pathname === path;
  };

  return (
    <AppBar position="static" color="default" elevation={2} sx={{ borderRadius: '0 0 18px 18px', background: 'rgba(255,255,255,0.95)', boxShadow: '0 4px 24px 0 rgba(60,72,100,0.10)', fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
      <Toolbar sx={{ minHeight: 72, px: 3, display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo with white box */}
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 3, cursor: 'pointer' }} onClick={() => navigate('/dashboard') }>
            <img
              src="https://cdn.prod.website-files.com/620353a026ae70e21288308a/6536204e44d00a50cb63e6a4_Vector.svg"
              alt="XenoCRM Logo"
              style={{ height: 36 }}
            />
        
          <Typography variant="h5" fontWeight={800} color="#1976d2" sx={{ letterSpacing: 1, fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
          
          </Typography>
        </Box>
        {/* Navigation Buttons */}
        {location.pathname !== '/' && (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              color="primary"
              startIcon={<DashboardIcon />}
              onClick={() => navigate('/dashboard')}
              sx={{
                backgroundColor: isActive('/dashboard') ? '#e3e6ee' : 'transparent',
                borderRadius: 2,
                fontWeight: 600,
                fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                px: 2,
                '&:hover': { backgroundColor: '#f5f7fa' }
              }}
            >
              Home
            </Button>
            <Button
              color="primary"
              startIcon={<CampaignIcon />}
              onClick={() => navigate('/campaigns')}
              sx={{
                backgroundColor: isActive('/campaigns') ? '#e3e6ee' : 'transparent',
                borderRadius: 2,
                fontWeight: 600,
                fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                px: 2,
                '&:hover': { backgroundColor: '#f5f7fa' }
              }}
            >
              Campaigns
            </Button>
            <Button
              color="primary"
              startIcon={<HistoryIcon />}
              onClick={() => navigate('/campaigns/history')}
              sx={{
                backgroundColor: isActive('/campaigns/history') ? '#e3e6ee' : 'transparent',
                borderRadius: 2,
                fontWeight: 600,
                fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                px: 2,
                '&:hover': { backgroundColor: '#f5f7fa' }
              }}
            >
              Campaign History
            </Button>
            <Button
              color="primary"
              startIcon={<AnalyticsIcon />}
              onClick={() => navigate('/analytics/customers')}
              sx={{
                backgroundColor: isActive('/analytics/customers') ? '#e3e6ee' : 'transparent',
                borderRadius: 2,
                fontWeight: 600,
                fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                px: 2,
                '&:hover': { backgroundColor: '#f5f7fa' }
              }}
            >
              Customer Analytics
            </Button>
            <Button color="primary" onClick={handleLogout} sx={{ fontWeight: 600, fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', px: 2 }}>
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header; 