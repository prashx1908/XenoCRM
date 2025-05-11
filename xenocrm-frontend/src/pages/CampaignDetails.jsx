import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Paper, CircularProgress, Divider, Chip } from '@mui/material';

const API_URL = 'http://localhost:4000/api';

export default function CampaignDetails() {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`${API_URL}/campaigns/${id}`)
      .then(res => setCampaign(res.data))
      .catch(err => setError('Campaign not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}><CircularProgress /></Box>;
  if (error || !campaign) return <Typography color="error" sx={{ mt: 8, textAlign: 'center' }}>{error || 'Campaign not found.'}</Typography>;

  return (
    <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
      <Paper sx={{ p: 4, maxWidth: 600, width: '100%' }}>
        <Typography variant="h4" fontWeight={800} gutterBottom>{campaign.name}</Typography>
        <Chip label={campaign.status} color={
          campaign.status === 'active' ? 'success' :
          campaign.status === 'draft' ? 'default' :
          campaign.status === 'paused' ? 'warning' :
          campaign.status === 'completed' ? 'info' : 'default'
        } sx={{ mb: 2 }} />
        <Divider sx={{ mb: 2 }} />
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Message:
        </Typography>
        <Typography sx={{ mb: 2 }}>{campaign.message}</Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Rules:
        </Typography>
        {campaign.ruleGroups && campaign.ruleGroups.length > 0 ? (
          campaign.ruleGroups.map((group, i) => (
            <Box key={group.id} sx={{ mb: 1, pl: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Group {i + 1} ({group.operator}):
              </Typography>
              {group.rules.map(rule => (
                <Typography key={rule.id} variant="body2" sx={{ ml: 2 }}>
                  {rule.field} {rule.operator} {rule.value}
                </Typography>
              ))}
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">No rules defined.</Typography>
        )}
        <Divider sx={{ my: 2 }} />
        <Typography variant="body2" color="text.secondary">
          Created: {new Date(campaign.createdAt).toLocaleString()}<br />
          Last Updated: {new Date(campaign.updatedAt).toLocaleString()}
        </Typography>
      </Paper>
    </Box>
  );
} 