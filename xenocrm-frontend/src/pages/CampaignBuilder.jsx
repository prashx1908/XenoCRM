import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  TextField, 
  Paper, 
  Grid, 
  MenuItem, 
  Select, 
  InputLabel, 
  FormControl, 
  Snackbar, 
  Alert,
  IconButton,
  Divider,
  FormHelperText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Lightbulb as LightbulbIcon } from '@mui/icons-material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:4000/api';

const FIELD_OPTIONS = [
  { value: 'spend', label: 'Total Spend' },
  { value: 'visits', label: 'Number of Visits' },
  { value: 'inactive_days', label: 'Days Since Last Visit' },
  { value: 'avg_order_value', label: 'Average Order Value' },
  { value: 'last_purchase_date', label: 'Last Purchase Date' }
];

const OPERATOR_OPTIONS = [
  { value: '>', label: 'Greater Than' },
  { value: '<', label: 'Less Than' },
  { value: '=', label: 'Equals' },
  { value: '>=', label: 'Greater Than or Equal' },
  { value: '<=', label: 'Less Than or Equal' },
  { value: '!=', label: 'Not Equal' }
];

function CampaignBuilder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaignName, setCampaignName] = useState('');
  const [message, setMessage] = useState('');
  const [ruleGroups, setRuleGroups] = useState([
    {
      id: 1,
      operator: 'AND',
      rules: [{ id: 1, field: 'spend', operator: '>', value: '10000' }]
    }
  ]);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [errors, setErrors] = useState({});
  const [previewDialog, setPreviewDialog] = useState({ open: false, data: null });
  const [suggestionsDialog, setSuggestionsDialog] = useState({ open: false, suggestions: [] });
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  useEffect(() => {
    if (id) {
      fetchCampaign();
    }
  }, [id]);

  const fetchCampaign = async () => {
    try {
      const response = await axios.get(`${API_URL}/campaigns/${id}`);
      const campaign = response.data;
      setCampaignName(campaign.name);
      setMessage(campaign.message);
      setRuleGroups(campaign.ruleGroups || [
        {
          id: 1,
          operator: 'AND',
          rules: [{ id: 1, field: 'spend', operator: '>', value: '10000' }]
        }
      ]);
    } catch (error) {
      setNotification({
        open: true,
        message: 'Error loading campaign: ' + (error.response?.data?.message || error.message),
        severity: 'error'
      });
    }
  };

  const handleAddRuleGroup = () => {
    const newGroupId = Math.max(...ruleGroups.map(g => g.id), 0) + 1;
    setRuleGroups([
      ...ruleGroups,
      {
        id: newGroupId,
        operator: 'AND',
        rules: [{ id: 1, field: 'spend', operator: '>', value: '' }]
      }
    ]);
  };

  const handleAddRule = (groupId) => {
    const newRuleId = Math.max(...ruleGroups.flatMap(g => g.rules.map(r => r.id)), 0) + 1;
    setRuleGroups(ruleGroups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          rules: [...group.rules, { id: newRuleId, field: 'spend', operator: '>', value: '' }]
        };
      }
      return group;
    }));
  };

  const handleRuleChange = (groupId, ruleId, field, value) => {
    setRuleGroups(ruleGroups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          rules: group.rules.map(rule => {
            if (rule.id === ruleId) {
              return { ...rule, [field]: value };
            }
            return rule;
          })
        };
      }
      return group;
    }));
  };

  const handleGroupOperatorChange = (groupId, operator) => {
    setRuleGroups(ruleGroups.map(group => {
      if (group.id === groupId) {
        return { ...group, operator };
      }
      return group;
    }));
  };

  const handleDeleteRule = (groupId, ruleId) => {
    setRuleGroups(ruleGroups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          rules: group.rules.filter(rule => rule.id !== ruleId)
        };
      }
      return group;
    }));
  };

  const handleDeleteGroup = (groupId) => {
    setRuleGroups(ruleGroups.filter(group => group.id !== groupId));
  };

  const validateRules = () => {
    const newErrors = {};
    if (!campaignName.trim()) {
      newErrors.campaignName = 'Campaign name is required';
    }
    if (!message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    ruleGroups.forEach((group, groupIndex) => {
      group.rules.forEach((rule, ruleIndex) => {
        if (!rule.value.trim()) {
          newErrors[`rule_${groupIndex}_${ruleIndex}`] = 'Value is required';
        }
        if (rule.field === 'spend' || rule.field === 'avg_order_value') {
          if (isNaN(rule.value) || parseFloat(rule.value) < 0) {
            newErrors[`rule_${groupIndex}_${ruleIndex}`] = 'Must be a positive number';
          }
        }
        if (rule.field === 'visits' || rule.field === 'inactive_days') {
          if (isNaN(rule.value) || !Number.isInteger(parseFloat(rule.value))) {
            newErrors[`rule_${groupIndex}_${ruleIndex}`] = 'Must be a whole number';
          }
        }
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveCampaign = async () => {
    if (!validateRules()) {
      setNotification({
        open: true,
        message: 'Please fix the validation errors before saving',
        severity: 'error'
      });
      return;
    }

    try {
      const campaignData = {
        name: campaignName,
        message,
        ruleGroups
      };

      if (id) {
        await axios.put(`${API_URL}/campaigns/${id}`, campaignData);
        setNotification({
          open: true,
          message: 'Campaign updated successfully!',
          severity: 'success'
        });
      } else {
        await axios.post(`${API_URL}/campaigns`, campaignData);
        setNotification({
          open: true,
          message: 'Campaign created successfully!',
          severity: 'success'
        });
        // Reset form only for new campaigns
        setCampaignName('');
        setMessage('');
        setRuleGroups([
          {
            id: 1,
            operator: 'AND',
            rules: [{ id: 1, field: 'spend', operator: '>', value: '10000' }]
          }
        ]);
      }
      
      // Navigate back to campaign list after a short delay
      setTimeout(() => {
        navigate('/campaigns');
      }, 1500);
    } catch (error) {
      setNotification({
        open: true,
        message: 'Error saving campaign: ' + (error.response?.data?.message || error.message),
        severity: 'error'
      });
    }
  };

  const handlePreviewAudience = async () => {
    if (!validateRules()) {
      setNotification({
        open: true,
        message: 'Please fix the validation errors before previewing',
        severity: 'error'
      });
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/campaigns/preview`, {
        ruleGroups
      });
      
      // Show preview in a dialog
      setPreviewDialog({
        open: true,
        data: response.data
      });
    } catch (error) {
      setNotification({
        open: true,
        message: 'Error previewing audience: ' + (error.response?.data?.message || error.message),
        severity: 'error'
      });
    }
  };

  const handleClosePreviewDialog = () => {
    setPreviewDialog({ open: false, data: null });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const handleSuggestMessages = async () => {
    setLoadingSuggestions(true);
    try {
      const response = await axios.post(`${API_URL}/ai/message-suggestions`, {
        objective: campaignName || 'your campaign objective'
      });
      setSuggestionsDialog({ open: true, suggestions: response.data.suggestions || [] });
    } catch (error) {
      setNotification({
        open: true,
        message: 'Error fetching suggestions: ' + (error.response?.data?.message || error.message),
        severity: 'error'
      });
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const handlePickSuggestion = (suggestion) => {
    setMessage(suggestion);
    setSuggestionsDialog({ open: false, suggestions: [] });
  };

  return (
    <Box sx={{ width: '100vw', minHeight: 'calc(100vh - 64px)', bgcolor: '#f5f7fa', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', py: 6 }}>
      <Paper elevation={4} sx={{ width: '100%', maxWidth: 800, p: 4, borderRadius: 4 }}>
        <Typography variant="h4" fontWeight={800} gutterBottom>
          {id ? 'Edit Campaign' : 'Create Campaign'}
        </Typography>
        
        <TextField
          label="Campaign Name"
          fullWidth
          sx={{ mb: 3 }}
          value={campaignName}
          onChange={e => setCampaignName(e.target.value)}
          error={!!errors.campaignName}
          helperText={errors.campaignName}
        />
        
        <TextField
          label="Message"
          fullWidth
          multiline
          minRows={2}
          sx={{ mb: 3 }}
          value={message}
          onChange={e => setMessage(e.target.value)}
          error={!!errors.message}
          helperText={errors.message}
        />

        <Button
          variant="outlined"
          color="secondary"
          startIcon={<LightbulbIcon />}
          onClick={handleSuggestMessages}
          sx={{ mb: 2 }}
          disabled={loadingSuggestions}
        >
          {loadingSuggestions ? 'Loading...' : 'Suggest Messages'}
        </Button>

        <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
          Audience Rules
        </Typography>

        {ruleGroups.map((group, groupIndex) => (
          <Box key={group.id} sx={{ mb: 4, p: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Group Operator</InputLabel>
                <Select 
                  value={group.operator} 
                  label="Group Operator"
                  onChange={(e) => handleGroupOperatorChange(group.id, e.target.value)}
                >
                  <MenuItem value="AND">AND</MenuItem>
                  <MenuItem value="OR">OR</MenuItem>
                </Select>
              </FormControl>
              <IconButton 
                onClick={() => handleDeleteGroup(group.id)}
                color="error"
                disabled={ruleGroups.length === 1}
              >
                <DeleteIcon />
              </IconButton>
            </Box>

            {group.rules.map((rule, ruleIndex) => (
              <Box key={rule.id} sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'flex-start' }}>
                <FormControl sx={{ minWidth: 180 }}>
                  <InputLabel>Field</InputLabel>
                  <Select 
                    value={rule.field} 
                    label="Field"
                    onChange={(e) => handleRuleChange(group.id, rule.id, 'field', e.target.value)}
                  >
                    {FIELD_OPTIONS.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 120 }}>
                  <InputLabel>Operator</InputLabel>
                  <Select 
                    value={rule.operator} 
                    label="Operator"
                    onChange={(e) => handleRuleChange(group.id, rule.id, 'operator', e.target.value)}
                  >
                    {OPERATOR_OPTIONS.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField 
                  label="Value" 
                  value={rule.value} 
                  sx={{ minWidth: 120 }}
                  onChange={(e) => handleRuleChange(group.id, rule.id, 'value', e.target.value)}
                  error={!!errors[`rule_${groupIndex}_${ruleIndex}`]}
                  helperText={errors[`rule_${groupIndex}_${ruleIndex}`]}
                />

                <IconButton 
                  onClick={() => handleDeleteRule(group.id, rule.id)}
                  color="error"
                  disabled={group.rules.length === 1}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}

            <Button 
              startIcon={<AddIcon />}
              onClick={() => handleAddRule(group.id)}
              sx={{ mt: 1 }}
            >
              Add Rule
            </Button>
          </Box>
        ))}

        <Button 
          startIcon={<AddIcon />}
          variant="outlined" 
          onClick={handleAddRuleGroup}
          sx={{ mb: 3 }}
        >
          Add Rule Group
        </Button>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button variant="outlined" color="primary" onClick={handlePreviewAudience}>
            Preview Audience
          </Button>
          <Button variant="contained" color="primary" onClick={handleSaveCampaign}>
            {id ? 'Update Campaign' : 'Save Campaign'}
          </Button>
        </Box>
      </Paper>

      {/* Preview Dialog */}
      <Dialog 
        open={previewDialog.open} 
        onClose={handleClosePreviewDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" component="div">
            Audience Preview
          </Typography>
        </DialogTitle>
        <DialogContent>
          {previewDialog.data && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                Estimated Audience Size: {previewDialog.data.estimatedAudienceSize}
              </Typography>
              
              {previewDialog.data.sampleCustomers && previewDialog.data.sampleCustomers.length > 0 && (
                <>
                  <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                    Sample Customers:
                  </Typography>
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Spend</TableCell>
                          <TableCell>Visits</TableCell>
                          <TableCell>Inactive Days</TableCell>
                          <TableCell>Total Orders</TableCell>
                          <TableCell>Avg Order Value</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {previewDialog.data.sampleCustomers.map((customer) => (
                          <TableRow key={customer.id}>
                            <TableCell>{customer.name}</TableCell>
                            <TableCell>{customer.email}</TableCell>
                            <TableCell>${customer.spend}</TableCell>
                            <TableCell>{customer.visits}</TableCell>
                            <TableCell>{customer.inactive_days}</TableCell>
                            <TableCell>{customer.total_orders}</TableCell>
                            <TableCell>${customer.avg_order_value}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePreviewDialog}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Suggestions Dialog */}
      <Dialog open={suggestionsDialog.open} onClose={() => setSuggestionsDialog({ open: false, suggestions: [] })}>
        <DialogTitle>AI Message Suggestions</DialogTitle>
        <DialogContent>
          {suggestionsDialog.suggestions.length === 0 ? (
            <Typography>No suggestions available.</Typography>
          ) : (
            suggestionsDialog.suggestions.map((s, idx) => (
              <Box key={idx} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 2, cursor: 'pointer', '&:hover': { bgcolor: '#f5f5f5' } }} onClick={() => handlePickSuggestion(s)}>
                <Typography>{s}</Typography>
              </Box>
            ))
          )}
          <Typography variant="caption" color="text.secondary">Click a suggestion to use it as your campaign message.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSuggestionsDialog({ open: false, suggestions: [] })}>Close</Button>
        </DialogActions>
      </Dialog>

      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default CampaignBuilder; 