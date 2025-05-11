import { Box, Button, Grid, Paper, Typography, Card, CardContent, TextField, InputAdornment, IconButton } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import CampaignIcon from '@mui/icons-material/Campaign';
import InsightsIcon from '@mui/icons-material/Insights';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LoyaltyIcon from '@mui/icons-material/EmojiEvents';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import SecurityIcon from '@mui/icons-material/Security';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EmailIcon from '@mui/icons-material/Email';
import { useRef } from 'react';

const brands = [
  'Amante', 'Barbeque Nation', 'Barista', 'Calcetto', 'Chumbak', 'Colorbar', 'Forest Essentials', 'GAP', 'Iba Cosmetics',
  "Jack & Jones", 'Kama Ayurveda', "Levi's", 'Mad Over Donuts', "Nando's", 'Nykaa', 'Pronal', 'Raymond', 'Selected Homme',
  'Tommy Hilfiger', 'Vero Moda', 'Wok to Walk'
];

const stats = [
  { label: 'ROI on Marketing Spends', value: '60x' },
  { label: 'Repeat Sales', value: '12%' },
  { label: 'Reduction in Single-Visit', value: '15%' },
];

const quickActions = [
  { label: 'New Campaign', icon: <AddCircleOutlineIcon color="primary" />, href: '/campaigns/new' },
  { label: 'View Campaigns', icon: <ListAltIcon color="primary" />, href: '/campaigns' },
  { label: 'Customer Analytics', icon: <TrendingUpIcon color="primary" />, href: '/analytics/customers' },
];

const recentActivity = [
  { time: '2 min ago', desc: 'Campaign "Spring Sale" sent to 1,200 customers.' },
  { time: '1 hr ago', desc: 'Segment "High Value" updated.' },
  { time: 'Yesterday', desc: 'New customer "Priya Patel" added.' },
];

const statCards = [
  { label: 'Total Customers', value: '2,543', icon: <GroupIcon color="primary" fontSize="large" /> },
  { label: 'Campaigns Sent', value: '128', icon: <CampaignIcon color="primary" fontSize="large" /> },
  { label: 'Delivery Rate', value: '92%', icon: <InsightsIcon color="primary" fontSize="large" /> },
  { label: 'Active Segments', value: '7', icon: <LoyaltyIcon color="primary" fontSize="large" /> },
];

function Dashboard() {
  const brandScrollRef = useRef(null);

  const scrollBrands = (dir) => {
    if (brandScrollRef.current) {
      brandScrollRef.current.scrollBy({ left: dir * 200, behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ width: '100vw', minHeight: 'calc(100vh - 64px)', bgcolor: 'transparent', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', py: 6, fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
      <Paper elevation={6} sx={{ width: '100%', maxWidth: 1200, p: { xs: 2, md: 6 }, borderRadius: 6, boxShadow: '0 8px 32px 0 rgba(60,72,100,0.12)', background: 'rgba(255,255,255,0.98)' }}>
        {/* Hero Section with Shade Box */}
        <Box sx={{ textAlign: 'center', mb: 5, p: 4, bgcolor: 'rgba(25, 118, 210, 0.08)', borderRadius: 4 }}>
          <Typography variant="h3" fontWeight={800} gutterBottom color="primary">
            Welcome to XenoCRM
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Let's grow your business with smart customer segmentation and personalized campaigns.
          </Typography>
        </Box>

        {/* Stats Section */}
        <Grid container spacing={4} sx={{ mb: 5, justifyContent: 'center', alignItems: 'center' }}>
          {statCards.map((stat) => (
            <Grid item xs={12} sm={6} md={3} key={stat.label} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Card sx={{ width: 210, height: 140, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 12px 0 rgba(60,72,100,0.06)', border: 'none', borderRadius: 4, background: 'rgba(255,255,255,0.96)', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px) scale(1.03)', boxShadow: '0 8px 32px 0 rgba(60,72,100,0.12)' } }}>
                <Box sx={{ mb: 1 }}>{stat.icon}</Box>
                <Typography variant="h4" fontWeight={700} sx={{ fontFamily: 'inherit' }}>{stat.value}</Typography>
                <Typography color="text.secondary" sx={{ fontFamily: 'inherit' }}>{stat.label}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* CRM/Loyalty/Offers Cards */}
        <Grid container spacing={3} justifyContent="center" sx={{ mb: 5 }}>
          <Grid item xs={12} sm={4} md={4}>
            <Card sx={{ p: 2, textAlign: 'center', borderRadius: 3, boxShadow: '0 2px 12px 0 rgba(60,72,100,0.06)' }}>
              <GroupIcon color="primary" sx={{ fontSize: 32, mb: 1 }} />
              <Typography variant="subtitle1" fontWeight={700}>CRM</Typography>
              <Typography color="text.secondary" sx={{ fontSize: 14 }}>Engage customers with personalised communications across multi-channels</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Card sx={{ p: 2, textAlign: 'center', borderRadius: 3, boxShadow: '0 2px 12px 0 rgba(60,72,100,0.06)' }}>
              <LoyaltyIcon color="secondary" sx={{ fontSize: 32, mb: 1 }} />
              <Typography variant="subtitle1" fontWeight={700}>Loyalty</Typography>
              <Typography color="text.secondary" sx={{ fontSize: 14 }}>Delight your most valuable customers with exclusive rewards & experiences</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Card sx={{ p: 2, textAlign: 'center', borderRadius: 3, boxShadow: '0 2px 12px 0 rgba(60,72,100,0.06)' }}>
              <LocalOfferIcon color="success" sx={{ fontSize: 32, mb: 1 }} />
              <Typography variant="subtitle1" fontWeight={700}>Offers</Typography>
              <Typography color="text.secondary" sx={{ fontSize: 14 }}>Acquire & retain customers with better offers tailored to their specific behaviors</Typography>
            </Card>
          </Grid>
        </Grid>

        {/* Brand Carousel */}
        <Box sx={{ position: 'relative', mb: 6 }}>
          <Typography variant="subtitle1" fontWeight={1000} sx={{ mb: 2, color: '#1976d2', textAlign: 'center' }}>Trusted by Leading Retailers</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconButton onClick={() => scrollBrands(-1)}><ArrowForwardIosIcon sx={{ transform: 'rotate(180deg)' }} /></IconButton>
            <Box ref={brandScrollRef} sx={{ overflowX: 'auto', whiteSpace: 'nowrap', width: { xs: 280, sm: 600, md: 900 }, mx: 2, py: 1, scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
              {brands.map((brand, idx) => (
                <Box key={brand} sx={{ display: 'inline-block', mx: 2, px: 3, py: 1.5, bgcolor: '#f5f7fa', borderRadius: 3, fontWeight: 700, fontSize: 18, color: '#1976d2', boxShadow: idx % 2 === 0 ? '0 2px 8px 0 rgba(60,72,100,0.06)' : 'none' }}>
                  {brand}
                </Box>
              ))}
            </Box>
            <IconButton onClick={() => scrollBrands(1)}><ArrowForwardIosIcon /></IconButton>
          </Box>
        </Box>

        {/* Testimonial and Security Section Combined */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mb: 6 }}>
          {/* Testimonial */}
          <Box sx={{ flex: 1, textAlign: 'center' }}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: '#1976d2' }}>Here's why our Customers Love Us</Typography>
            <Card sx={{ p: 4, borderRadius: 4, background: 'rgba(255,255,255,0.98)', boxShadow: '0 2px 12px 0 rgba(60,72,100,0.06)' }}>
              <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 2 }}>
                Customer Retention was always a concerning topic for us before Xeno came on board. Xeno has helped us to not only understand our customer base better but also work towards retaining them & building the required customer loyalty. We are now focused on achieving our revenue & ROI goals month on month with every personalized digital campaign.
              </Typography>
              <Typography variant="subtitle2" fontWeight={700} sx={{ color: '#1976d2' }}>Mauli Teli, Founder, Iba Cosmetics</Typography>
            </Card>
          </Box>

          {/* Security Section */}
          <Box sx={{ flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              <SecurityIcon color="primary" sx={{ fontSize: 40 }} />
              <Typography variant="h6" fontWeight={700} sx={{ color: '#1976d2' }}>You are in Good Hands</Typography>
              <Typography color="text.secondary">Robust security for your data's protection</Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default Dashboard; 