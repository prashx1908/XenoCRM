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
  IconButton,
  Chip,
  Button,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon, 
  Visibility as VisibilityIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Stop as StopIcon,
  Send as SendIcon,
  TableChart as TableChartIcon
} from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:4000/api';

const STATUS_OPTIONS = [
  { value: 'all', label: 'All Status' },
  { value: 'draft', label: 'Draft' },
  { value: 'completed', label: 'Completed' }
];

function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();

  const fetchCampaigns = async () => {
    try {
      const response = await axios.get(`${API_URL}/campaigns`);
      setCampaigns(response.data);
      setFilteredCampaigns(response.data);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  useEffect(() => {
    filterCampaigns();
  }, [searchTerm, statusFilter, campaigns]);

  const filterCampaigns = () => {
    let filtered = [...campaigns];
    
    if (searchTerm) {
      filtered = filtered.filter(campaign => 
        campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply  filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(campaign => campaign.status === statusFilter);
    }
    
    setFilteredCampaigns(filtered);
  };

  const handleDelete = async (id) => {
    setCampaignToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${API_URL}/campaigns/${campaignToDelete}`);
      fetchCampaigns();
      setDeleteDialogOpen(false);
      setCampaignToDelete(null);
    } catch (error) {
      console.error('Error deleting campaign:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/campaigns/edit/${id}`);
  };

  const handleView = (id) => {
    navigate(`/campaigns/${id}`);
  };

  const handleStatusChange = async (id, newStatus) => {
  
    setCampaigns(prev =>
      prev.map(c => c._id === id ? { ...c, status: newStatus } : c)
    );
    try {
      await axios.patch(`${API_URL}/campaigns/${id}/status`, { status: newStatus });
      fetchCampaigns();
    } catch (error) {
      console.error('Error updating campaign status:', error);
  
      fetchCampaigns();
    }
  };

  const handleSendCampaign = async (id) => {
    try {
      await axios.post(`${API_URL}/campaigns/${id}/deliver`);
      setNotification({
        open: true,
        message: 'Campaign delivery initiated successfully!',
        severity: 'success'
      });
  
      fetchCampaigns();
    } catch (error) {
      setNotification({
        open: true,
        message: 'Error sending campaign: ' + (error.response?.data?.message || error.message),
        severity: 'error'
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'paused':
        return 'warning';
      case 'completed':
        return 'info';
      case 'draft':
        return 'default';
      default:
        return 'default';
    }
  };

  const formatRules = (ruleGroups) => {
    return ruleGroups.map(group => {
      const rules = group.rules.map(rule => 
        `${rule.field} ${rule.operator} ${rule.value}`
      ).join(` ${group.operator} `);
      return `(${rules})`;
    }).join(' AND ');
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <Box sx={{ width: '100vw', minHeight: 'calc(100vh - 64px)', bgcolor: '#f5f7fa', p: { xs: 2, md: 6 } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 2 }}>
        <TableChartIcon color="primary" sx={{ fontSize: 40, mr: 1 }} />
        <Typography variant="h3" fontWeight={900} color="primary" sx={{ letterSpacing: 1, mr: 2 }}>
          Campaigns
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => navigate('/campaigns/new')}
          sx={{ borderRadius: 3, fontWeight: 600, px: 3, py: 1.2 }}
        >
          Create New Campaign
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <TextField
          placeholder="Search campaigns..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1, bgcolor: 'white', borderRadius: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <FormControl sx={{ minWidth: 200, bgcolor: 'white', borderRadius: 2 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {STATUS_OPTIONS.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      
      <TableContainer component={Paper} elevation={6} sx={{ borderRadius: 4, boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#f0f4fa' }}>
              <TableCell sx={{ fontWeight: 800, fontSize: 18 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 800, fontSize: 18 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 800, fontSize: 18 }}>Rules</TableCell>
              <TableCell sx={{ fontWeight: 800, fontSize: 18 }}>Created At</TableCell>
              <TableCell sx={{ fontWeight: 800, fontSize: 18 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCampaigns.map((campaign, idx) => (
              <TableRow
                key={campaign._id}
                sx={{
                  bgcolor: idx % 2 === 0 ? '#f9fbfd' : 'white',
                  transition: 'background 0.2s',
                  '&:hover': { bgcolor: '#e3f2fd' }
                }}
              >
                <TableCell sx={{ fontSize: 16, fontWeight: 600 }}>{campaign.name}</TableCell>
                <TableCell>
                  <Chip 
                    label={campaign.status === 'draft' ? 'Draft' : 'Completed'} 
                    color={getStatusColor(campaign.status)}
                    size="small"
                    sx={{ fontWeight: 700, fontSize: 15, px: 2, py: 1 }}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {Array.isArray(campaign.ruleGroups) && campaign.ruleGroups.length > 0 ? (
                      campaign.ruleGroups.flatMap((group, gi) =>
                        group.rules.map((rule, ri) => (
                          <Tooltip key={gi + '-' + ri} title={`${rule.field} ${rule.operator} ${rule.value}`} arrow>
                            <Chip
                              label={`${rule.field} ${rule.operator} ${rule.value}`}
                              color="primary"
                              size="small"
                              sx={{ fontWeight: 500, fontSize: 13, bgcolor: '#e3f2fd', color: '#1976d2', px: 1.5 }}
                            />
                          </Tooltip>
                        ))
                      )
                    ) : (
                      <Chip label="No rules" size="small" sx={{ bgcolor: '#eee', color: '#888' }} />
                    )}
                  </Box>
                </TableCell>
                <TableCell sx={{ fontSize: 16 }}>{new Date(campaign.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Edit Campaign">
                      <IconButton onClick={() => handleEdit(campaign._id)} size="medium" sx={{ color: '#1976d2' }}>
                        <EditIcon fontSize="medium" />
                      </IconButton>
                    </Tooltip>
                    {campaign.status === 'draft' && (
                      <Tooltip title="Send Campaign">
                        <IconButton 
                          onClick={() => handleSendCampaign(campaign._id)} 
                          size="medium"
                          sx={{ color: '#1976d2' }}
                        >
                          <SendIcon fontSize="medium" />
                        </IconButton>
                      </Tooltip>
                    )}
                    <Tooltip title="Delete Campaign">
                      <IconButton 
                        onClick={() => handleDelete(campaign._id)} 
                        size="medium" 
                        sx={{ color: '#e53935' }}
                      >
                        <DeleteIcon fontSize="medium" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Campaign</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this campaign? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default CampaignList; 