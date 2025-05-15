import { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  Container,
  Alert,
  Divider,
  Grid,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';


function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    // Handle Google OAuth callback
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    
    if (token) {
      // Store token and redirect to dashboard
      localStorage.setItem('token', token);
      navigate('/dashboard');
    }
  }, [location, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${API_URL}/auth/login`, formData);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login. Please try again.');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  return (
    <Box
      sx={{
        minHeight: '70vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'rgba(25, 118, 210, 0.04)',
        fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '70%',
          px: { xs: 2, md: 8 },
          py: { xs: 4, md: 0 },
          gap: { xs: 6, md: 10 },
        }}
      >
        {/* Login Form Card */}
        <Paper
          elevation={6}
          sx={{
            p: { xs: 2, md: 3 },
            borderRadius: 4,
            width: '100%',
            maxWidth: 420,
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: 'white',
          }}
        >
          {/* ZENCRM Title and Tagline */}
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, color: '#1976d2' }}>
              ZENCRM
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 500, fontSize: '1rem' }}>
              The modern way to engage your customers
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Box
              sx={{
                width: 56,
                height: 36,
                borderRadius: '50%',
                backgroundColor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 1,
                boxShadow: '0 4px 12px 0 rgba(25, 118, 210, 0.2)',
              }}
            >
              <LockOutlinedIcon sx={{ color: 'white', fontSize: 28 }} />
            </Box>

            <Typography component="h1" variant="h5" fontWeight={800} gutterBottom color="primary" sx={{ mb: 0.5 }}>
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              Sign in to continue to ZENCRM
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleLogin}
            sx={{
              mb: 2,
              py: 1.2,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
              borderColor: 'rgba(0, 0, 0, 0.12)',
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: 'rgba(25, 118, 210, 0.04)',
              },
            }}
          >
            Continue with Google
          </Button>

          <Button
            fullWidth
            variant="outlined"
            onClick={() => navigate('/dashboard')}
            sx={{
              mb: 2,
              py: 1.2,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
              borderColor: 'rgba(0, 0, 0, 0.12)',
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: 'rgba(25, 118, 210, 0.04)',
              },
            }}
          >
            Continue to the App
          </Button>

          <Divider sx={{ width: '100%', mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              OR
            </Typography>
          </Divider>

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
                mb: 1.5,
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
                mb: 2,
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                mb: 1,
                py: 1.2,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1rem',
                boxShadow: '0 4px 12px 0 rgba(25, 118, 210, 0.2)',
                '&:hover': {
                  boxShadow: '0 6px 16px 0 rgba(25, 118, 210, 0.3)',
                },
              }}
            >
              Sign In
            </Button>
            <Box sx={{ textAlign: 'center', mt: 1 }}>
              <Link
                component={RouterLink}
                to="/register"
                variant="body2"
                sx={{
                  color: 'primary.main',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Don't have an account? Sign Up
              </Link>
            </Box>
          </Box>
        </Paper>
        {/* Right: Image Section */}
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'rgba(25, 118, 210, 0.04)',
            borderRadius: 4,
            py: { xs: 4, md: 0 },
            height: { xs: 240, md: 440 },
            maxWidth: 600,
            width: '100%',
          }}
        >
          <Box
            component="img"
            src="https://media-hosting.imagekit.io/ba61b146f8d54c24/Screenshot%202025-05-11%20at%201.00.44%E2%80%AFAM.png?Expires=1841513482&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=NCorXrM6mO6yPdJOuym5aHxmZOCzHtHMgW96iJOSUl09mkpAUB4-GHID5W0tamiikCjWS4begvd0IODWpfFv5tUw3KKKyGI6iJuFfRvpVyHxhQgfkIn0f6ZOSd6xjPrIwL8eBpAuJ-iZRRDeit3knfz8is1JHkJQlmKs0U~56tq0rlZDQ87jqYMTzL4tq~BUfLIzx~rVbPaxSEJ2hoEVL~gNJvQoSfeh1Xcrjd7IuIglRlUxoaZka6YPD5xZdo5dWNnVbi73ikTYl28n5BWJyaI~Tu1Es4qR1MXw0THMSEHLxlagE4EHzsZonBaPE2whEo3Wk-C~BLfOH4tU-DMJXw__"
            alt="Login illustration"
            sx={{
              width: '90%',
              maxWidth: 480,
              height: 'auto',
              borderRadius: 4,
              boxShadow: '0 2px 8px 0 rgba(60,72,100,0.10)',
              display: 'block',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Login; 
