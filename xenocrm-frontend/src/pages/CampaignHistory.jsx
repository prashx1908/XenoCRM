import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  IconButton,
  Tooltip,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  CalendarToday as CalendarIcon,
  BarChart as BarChartIcon,
  Timeline as TimelineIcon,
  CheckCircle as CheckCircleIcon,
  ErrorOutline as ErrorOutlineIcon,
  Percent as PercentIcon
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import api from '../config/api';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

function CampaignHistory() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)); // 30 days ago
  const [endDate, setEndDate] = useState(new Date());
  const [selectedCampaign, setSelectedCampaign] = useState('all');
  const [deliveryStats, setDeliveryStats] = useState({
    total: 0,
    sent: 0,
    failed: 0,
    successRate: 0
  });
  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

  useEffect(() => {
    fetchCampaignHistory();
  }, [startDate, endDate, selectedCampaign]);

  const fetchCampaignHistory = async () => {
    setLoading(true);
    try {
      const response = await api.get('/campaigns/history', {
        params: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          campaignId: selectedCampaign !== 'all' ? selectedCampaign : undefined
        }
      });
      setCampaigns(response.data.campaigns);
      setDeliveryStats(response.data.stats);
      setTimeSeriesData(response.data.timeSeries);
    } catch (error) {
      console.error('Error fetching campaign history:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const response = await api.get('/campaigns/history/export', {
        params: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          campaignId: selectedCampaign !== 'all' ? selectedCampaign : undefined
        },
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `campaign-history-${new Date().toISOString()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error exporting campaign history:', error);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  const formatPercentage = (num) => {
    return `${(num * 100).toFixed(1)}%`;
  };

  const sortedCampaigns = [...campaigns].sort((a, b) => {
    if (sortConfig.key === 'name') {
      if (a.name < b.name) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a.name > b.name) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    } else if (sortConfig.key === 'date') {
      const aDate = new Date(a.date);
      const bDate = new Date(b.date);
      return sortConfig.direction === 'asc' ? aDate - bDate : bDate - aDate;
    }
    return 0;
  });

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  return (
    <Box sx={{ width: '100vw', minHeight: 'calc(100vh - 64px)', bgcolor: '#f5f7fa', p: { xs: 2, md: 6 } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 2 }}>
        <TimelineIcon color="primary" sx={{ fontSize: 40, mr: 1 }} />
        <Typography variant="h3" fontWeight={900} color="primary" sx={{ letterSpacing: 1, mr: 2 }}>
          Campaign History
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={handleExport}
          sx={{ borderRadius: 3, fontWeight: 600, px: 3, py: 1.2 }}
        >
          Export
        </Button>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={fetchCampaignHistory}
          sx={{ borderRadius: 3, fontWeight: 600, px: 3, py: 1.2 }}
        >
          Refresh
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 14, mb: 4, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* Stats 2x2 grid */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 3, minWidth: 340, py: 2 }}>
          <Card sx={{ borderRadius: 3, boxShadow: 2, display: 'flex', alignItems: 'center', p: 2 }}>
            <BarChartIcon color="primary" sx={{ fontSize: 36, mr: 2 }} />
            <Box>
              <Typography color="textSecondary" gutterBottom fontWeight={600}>
                Total Campaigns
              </Typography>
              <Typography variant="h4" fontWeight={900}>
                {formatNumber(deliveryStats.total)}
              </Typography>
            </Box>
          </Card>
          <Card sx={{ borderRadius: 3, boxShadow: 2, display: 'flex', alignItems: 'center', p: 2 }}>
            <CheckCircleIcon color="success" sx={{ fontSize: 36, mr: 2 }} />
            <Box>
              <Typography color="textSecondary" gutterBottom fontWeight={600}>
                Successfully Sent
              </Typography>
              <Typography variant="h4" fontWeight={900}>
                {formatNumber(deliveryStats.sent)}
              </Typography>
            </Box>
          </Card>
          <Card sx={{ borderRadius: 3, boxShadow: 2, display: 'flex', alignItems: 'center', p: 2 }}>
            <ErrorOutlineIcon color="error" sx={{ fontSize: 36, mr: 2 }} />
            <Box>
              <Typography color="textSecondary" gutterBottom fontWeight={600}>
                Failed Deliveries
              </Typography>
              <Typography variant="h4" fontWeight={900}>
                {formatNumber(deliveryStats.failed)}
              </Typography>
            </Box>
          </Card>
          <Card sx={{ borderRadius: 3, boxShadow: 2, display: 'flex', alignItems: 'center', p: 2 }}>
            <PercentIcon color="primary" sx={{ fontSize: 36, mr: 2 }} />
            <Box>
              <Typography color="textSecondary" gutterBottom fontWeight={600}>
                Success Rate
              </Typography>
              <Typography variant="h4" fontWeight={900}>
                {formatPercentage(deliveryStats.successRate)}
              </Typography>
            </Box>
          </Card>
        </Box>
        {/* Charts stacked vertically */}
        <Box sx={{ flex: 1, minWidth: 340, display: 'flex', flexDirection: 'column', gap: 4, py: 2 }}>
          
          <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 2, minHeight: 320 }}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Success Rate by Campaign
            </Typography>
            <Box sx={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={campaigns} margin={{ top: 16, right: 24, left: 0, bottom: 16 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-30} textAnchor="end" height={80} />
                  <YAxis />
                  <RechartsTooltip />
                  <Bar dataKey="successRate" fill="#2196f3" name="Success Rate" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 3, mb: 5, flexWrap: 'wrap', alignItems: 'center' }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={setStartDate}
            renderInput={(params) => <TextField {...params} sx={{ minWidth: 160, borderRadius: 2, bgcolor: 'white' }} />}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={setEndDate}
            renderInput={(params) => <TextField {...params} sx={{ minWidth: 160, borderRadius: 2, bgcolor: 'white' }} />}
          />
        </LocalizationProvider>
        <FormControl sx={{ minWidth: 220, borderRadius: 2, bgcolor: 'white' }}>
          <InputLabel>Campaign</InputLabel>
          <Select
            value={selectedCampaign}
            label="Campaign"
            onChange={(e) => setSelectedCampaign(e.target.value)}
          >
            <MenuItem value="all">All Campaigns</MenuItem>
            {campaigns.map((campaign) => (
              <MenuItem key={campaign._id} value={campaign._id}>
                {campaign.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Paper elevation={6} sx={{ borderRadius: 4, boxShadow: 3, mt: 5 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f0f4fa' }}>
                <TableCell sx={{ fontWeight: 800, fontSize: 18, cursor: 'pointer' }} onClick={() => handleSort('name')}>
                  Campaign Name {sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                </TableCell>
                <TableCell sx={{ fontWeight: 800, fontSize: 18, cursor: 'pointer' }} onClick={() => handleSort('date')}>
                  Date {sortConfig.key === 'date' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 800, fontSize: 18 }}>Audience Size</TableCell>
                <TableCell align="right" sx={{ fontWeight: 800, fontSize: 18 }}>Sent</TableCell>
                <TableCell align="right" sx={{ fontWeight: 800, fontSize: 18 }}>Failed</TableCell>
                <TableCell align="right" sx={{ fontWeight: 800, fontSize: 18 }}>Success Rate</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : sortedCampaigns.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No campaigns found in the selected date range
                  </TableCell>
                </TableRow>
              ) : (
                sortedCampaigns.map((campaign, idx) => (
                  <TableRow
                    key={campaign._id}
                    sx={{
                      bgcolor: idx % 2 === 0 ? '#f9fbfd' : 'white',
                      transition: 'background 0.2s',
                      '&:hover': { bgcolor: '#e3f2fd' }
                    }}
                  >
                    <TableCell sx={{ fontSize: 16, fontWeight: 600 }}>{campaign.name}</TableCell>
                    <TableCell sx={{ fontSize: 16 }}>{formatDate(campaign.date)}</TableCell>
                    <TableCell align="right" sx={{ fontSize: 16 }}>
                      {formatNumber(campaign.audienceSize)}
                    </TableCell>
                    <TableCell align="right" sx={{ fontSize: 16 }}>
                      {formatNumber(campaign.sent)}
                    </TableCell>
                    <TableCell align="right" sx={{ fontSize: 16 }}>
                      {formatNumber(campaign.failed)}
                    </TableCell>
                    <TableCell align="right" sx={{ fontSize: 16 }}>
                      {formatPercentage(campaign.successRate)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default CampaignHistory; 