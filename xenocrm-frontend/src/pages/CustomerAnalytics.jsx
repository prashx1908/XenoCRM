import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Container,
  CssBaseline
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import axios from 'axios';

// Axios Setup
const api = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

api.interceptors.request.use(request => {
  console.log('Starting Request:', request);
  return request;
});

api.interceptors.response.use(
  response => {
    console.log('Response:', response);
    return response;
  },
  error => {
    console.error('Response Error:', error);
    return Promise.reject(error);
  }
);

const COLORS = ['#7b2cbf', '#3c096c', '#ffafcc', '#80ed99', '#57cc99'];

const CustomerAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [metrics, setMetrics] = useState({});
  const [segmentation, setSegmentation] = useState([]);
  const [activity, setActivity] = useState([]);
  const [spending, setSpending] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);
  const [growth, setGrowth] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          metricsRes,
          segmentationRes,
          activityRes,
          spendingRes,
          topCustomersRes,
          growthRes
        ] = await Promise.all([
          api.get('/api/analytics/customers/metrics'),
          api.get('/api/analytics/customers/segmentation/status'),
          api.get('/api/analytics/customers/activity'),
          api.get('/api/analytics/customers/spending'),
          api.get('/api/analytics/customers/top-customers'),
          api.get('/api/analytics/customers/growth')
        ]);

        setMetrics(metricsRes.data);
        setSegmentation(segmentationRes.data);
        setActivity(activityRes.data);
        setSpending(spendingRes.data);
        setTopCustomers(topCustomersRes.data);
        setGrowth(growthRes.data);
      } catch (err) {
        setError('Failed to load analytics data. Please check your backend and try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh" width="100%">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3} width="100%">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <>
      <CssBaseline />
      <Container 
        maxWidth={false} 
        disableGutters 
        sx={{ 
          width: '100%', 
          height: '100%',
          overflow: 'hidden'
        }}
      >
        <Box 
          sx={{
            width: '100%',
            p: 3,
            boxSizing: 'border-box'
          }}
        >
          <Typography 
            variant="h4" 
            fontWeight={600} 
            gutterBottom 
            align="center" 
            sx={{ 
              color: '#2563eb', 
              mb: 4, 
              mt: 2,
              width: '100%'
            }}
          >
            📊 Customer Analytics Dashboard
          </Typography>

          {/* Metric Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }} justifyContent="center">
            {[
              { label: 'Total Customers', value: metrics?.totalCustomers, color: '#2563eb' },
              { label: 'Active Customers', value: metrics?.activeCustomers, color: '#3c096c' },
              { label: 'Total Spend', value: `₹${metrics?.totalSpend?.toLocaleString()}`, color: '#57cc99' },
              { label: 'Avg Order Value', value: `₹${metrics?.avgOrderValue?.toLocaleString()}`, color: '#ffafcc' }
            ].map((item, index) => (
              <Grid key={index} item xs={12} sm={6} md={3}>
                <Card sx={{ 
                  borderRadius: 3, 
                  boxShadow: 3, 
                  '&:hover': { boxShadow: 6 },
                  borderTop: `4px solid ${item.color}`,
                  height: '100%'
                }}>
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="subtitle1" color="textSecondary" gutterBottom align="center">
                      {item.label}
                    </Typography>
                    <Typography variant="h5" fontWeight={600} align="center" sx={{ color: item.color }}>
                      {item.value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

         {/* Charts Section */}
<Box sx={{ display: 'flex', flexDirection: 'row', gap: 3, mb: 3, flexWrap: 'nowrap', overflow: 'auto' }}>
  {/* Customer Segmentation Pie Chart */}
  <Paper elevation={3} sx={{ p: 3, borderRadius: 3, flex: '1 0 22%', minWidth: '250px' }}>
    <Typography variant="h6" gutterBottom align="center" sx={{ color: '#3c096c' }}>Customer Segmentation</Typography>
    <Box sx={{ width: '100%', height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={segmentation} dataKey="count" nameKey="_id" outerRadius={90} label>
            {segmentation.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  </Paper>

  {/* Activity Bar Chart */}
  <Paper elevation={3} sx={{ p: 3, borderRadius: 3, flex: '1 0 22%', minWidth: '250px' }}>
    <Typography variant="h6" gutterBottom align="center" sx={{ color: '#3c096c' }}>Inactive Customer Days</Typography>
    <Box sx={{ width: '100%', height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={activity}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#3c096c" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  </Paper>

  {/* Spending Bar Chart */}
  <Paper elevation={3} sx={{ p: 3, borderRadius: 3, flex: '1 0 22%', minWidth: '250px' }}>
    <Typography variant="h6" gutterBottom align="center" sx={{ color: '#57cc99' }}>Spending Distribution</Typography>
    <Box sx={{ width: '100%', height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={spending}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#57cc99" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  </Paper>

  {/* Growth Over Time */}
  <Paper elevation={3} sx={{ p: 3, borderRadius: 3, flex: '1 0 22%', minWidth: '250px' }}>
    <Typography variant="h6" gutterBottom align="center" sx={{ color: '#ffafcc' }}>Customer Growth Over Time</Typography>
    <Box sx={{ width: '100%', height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={growth}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id.month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#ffafcc" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  </Paper>
</Box>

          {/* Top Customers Table */}
          <Box mt={2} width="100%">
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" gutterBottom align="center" sx={{ color: '#2563eb', mb: 3 }}>
                Top Customers by Spend
              </Typography>
              <TableContainer sx={{ maxWidth: '100%' }}>
                <Table sx={{ width: '100%', tableLayout: 'fixed' }}>
                  <TableHead sx={{ backgroundColor: '#dbeafe' }}>
                    <TableRow>
                      <TableCell width="20%"><strong>Name</strong></TableCell>
                      <TableCell width="30%"><strong>Email</strong></TableCell>
                      <TableCell width="20%" align="right"><strong>Total Spend</strong></TableCell>
                      <TableCell width="15%" align="right"><strong>Orders</strong></TableCell>
                      <TableCell width="15%" align="right"><strong>Avg Order Value</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topCustomers.map((customer) => (
                      <TableRow key={customer._id} hover>
                        <TableCell>{customer.name}</TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell align="right">₹{customer.spend.toLocaleString()}</TableCell>
                        <TableCell align="right">{customer.total_orders}</TableCell>
                        <TableCell align="right">₹{customer.avg_order_value.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default CustomerAnalytics;