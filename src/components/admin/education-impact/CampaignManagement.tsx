import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Typography,
  Alert,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  LockOpen,
  Lock,
  BarChart,
} from "@mui/icons-material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";
import { OrganizationColors } from "../../../colors";
import {
  CampaignModel,
  CreateCampaignDto,
  UpdateCampaignDto,
} from "../../../api/models/educationImpact";

interface CampaignManagementProps {
  onCampaignChange?: () => void;
}

const CampaignManagement = observer(({ onCampaignChange }: CampaignManagementProps) => {
  const { educationImpactStore, commonStore } = useStore();
  const [campaigns, setCampaigns] = useState<CampaignModel[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignModel | null>(null);
  const [formData, setFormData] = useState<CreateCampaignDto>({
    title: "",
    description: "",
    openDate: "",
    closeDate: "",
    maxJambApplicants: 7,
    maxTertiaryApplicants: 3,
    jambSupportAmount: 50000,
    tertiarySupportAmount: 100000,
    additionalNotes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      const data = await educationImpactStore.getAllCampaigns(0, 50);
      setCampaigns(data);
    } catch (error) {
      console.error("Failed to load campaigns");
    }
  };

  const handleOpenDialog = (campaign?: CampaignModel) => {
    if (campaign) {
      setSelectedCampaign(campaign);
      setFormData({
        title: campaign.title,
        description: campaign.description,
        openDate: campaign.openDate.split("T")[0],
        closeDate: campaign.closeDate.split("T")[0],
        maxJambApplicants: campaign.maxJambApplicants,
        maxTertiaryApplicants: campaign.maxTertiaryApplicants,
        jambSupportAmount: campaign.jambSupportAmount,
        tertiarySupportAmount: campaign.tertiarySupportAmount,
        additionalNotes: campaign.additionalNotes || "",
      });
    } else {
      setSelectedCampaign(null);
      setFormData({
        title: "",
        description: "",
        openDate: "",
        closeDate: "",
        maxJambApplicants: 7,
        maxTertiaryApplicants: 3,
        jambSupportAmount: 50000,
        tertiarySupportAmount: 100000,
        additionalNotes: "",
      });
    }
    setErrors({});
    setOpenDialog(true);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.openDate) newErrors.openDate = "Open date is required";
    if (!formData.closeDate) newErrors.closeDate = "Close date is required";
    else if (new Date(formData.closeDate) <= new Date(formData.openDate))
      newErrors.closeDate = "Close date must be after open date";
    if (formData.maxJambApplicants < 1) newErrors.maxJambApplicants = "Must be at least 1";
    if (formData.maxTertiaryApplicants < 1) newErrors.maxTertiaryApplicants = "Must be at least 1";
    if (formData.jambSupportAmount < 0) newErrors.jambSupportAmount = "Must be positive";
    if (formData.tertiarySupportAmount < 0) newErrors.tertiarySupportAmount = "Must be positive";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      if (selectedCampaign) {
        const updateData: UpdateCampaignDto = {
          ...formData,
          id: selectedCampaign.id,
        };
        await educationImpactStore.updateCampaign(updateData);
      } else {
        await educationImpactStore.createCampaign(formData);
      }
      setOpenDialog(false);
      loadCampaigns();
      onCampaignChange?.();
    } catch (error) {
      // Error handled by store
    }
  };

  const handleToggleCampaign = async (campaign: CampaignModel) => {
    try {
      if (campaign.isOpen) {
        await educationImpactStore.closeCampaign(campaign.id);
      } else {
        await educationImpactStore.openCampaign(campaign.id);
      }
      loadCampaigns();
      onCampaignChange?.();
    } catch (error) {
      // Error handled by store
    }
  };

  const handleDelete = async () => {
    if (!selectedCampaign) return;
    try {
      await educationImpactStore.deleteCampaign(selectedCampaign.id);
      setOpenDeleteDialog(false);
      setSelectedCampaign(null);
      loadCampaigns();
      onCampaignChange?.();
    } catch (error) {
      // Error handled by store
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Box>
      <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Campaign Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          sx={{
            backgroundColor: OrganizationColors.green,
            "&:hover": { backgroundColor: "rgb(0, 128, 40)" },
          }}
        >
          Create Campaign
        </Button>
      </Box>

      {campaigns.length === 0 ? (
        <Alert severity="info">
          No campaigns found. Create your first campaign to get started!
        </Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Open Date</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Close Date</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>JAMB Apps</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Tertiary Apps</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.id} hover>
                  <TableCell>{campaign.title}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1, flexDirection: "column" }}>
                      <Chip
                        label={campaign.isActive ? "Active" : "Inactive"}
                        color={campaign.isActive ? "success" : "default"}
                        size="small"
                      />
                      <Chip
                        label={campaign.isOpen ? "Open" : "Closed"}
                        color={campaign.isOpen ? "primary" : "default"}
                        size="small"
                      />
                    </Box>
                  </TableCell>
                  <TableCell>{formatDate(campaign.openDate)}</TableCell>
                  <TableCell>{formatDate(campaign.closeDate)}</TableCell>
                  <TableCell>
                    {campaign.totalJambApplications} / {campaign.maxJambApplicants}
                  </TableCell>
                  <TableCell>{campaign.totalTertiaryApplications}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 0.5 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleToggleCampaign(campaign)}
                        title={campaign.isOpen ? "Close Campaign" : "Open Campaign"}
                      >
                        {campaign.isOpen ? <Lock /> : <LockOpen />}
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDialog(campaign)}
                        title="Edit"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => {
                          setSelectedCampaign(campaign);
                          setOpenDeleteDialog(true);
                        }}
                        title="Delete"
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedCampaign ? "Edit Campaign" : "Create New Campaign"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Campaign Title"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                error={!!errors.title}
                helperText={errors.title}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                required
                multiline
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                error={!!errors.description}
                helperText={errors.description}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Open Date"
                type="date"
                required
                InputLabelProps={{ shrink: true }}
                value={formData.openDate}
                onChange={(e) => setFormData({ ...formData, openDate: e.target.value })}
                error={!!errors.openDate}
                helperText={errors.openDate}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Close Date"
                type="date"
                required
                InputLabelProps={{ shrink: true }}
                value={formData.closeDate}
                onChange={(e) => setFormData({ ...formData, closeDate: e.target.value })}
                error={!!errors.closeDate}
                helperText={errors.closeDate}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Max JAMB Applicants"
                type="number"
                required
                value={formData.maxJambApplicants}
                onChange={(e) =>
                  setFormData({ ...formData, maxJambApplicants: parseInt(e.target.value) })
                }
                error={!!errors.maxJambApplicants}
                helperText={errors.maxJambApplicants}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Max Tertiary Applicants"
                type="number"
                required
                value={formData.maxTertiaryApplicants}
                onChange={(e) =>
                  setFormData({ ...formData, maxTertiaryApplicants: parseInt(e.target.value) })
                }
                error={!!errors.maxTertiaryApplicants}
                helperText={errors.maxTertiaryApplicants}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="JAMB Support Amount (₦)"
                type="number"
                required
                value={formData.jambSupportAmount}
                onChange={(e) =>
                  setFormData({ ...formData, jambSupportAmount: parseFloat(e.target.value) })
                }
                error={!!errors.jambSupportAmount}
                helperText={errors.jambSupportAmount}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tertiary Support Amount (₦)"
                type="number"
                required
                value={formData.tertiarySupportAmount}
                onChange={(e) =>
                  setFormData({ ...formData, tertiarySupportAmount: parseFloat(e.target.value) })
                }
                error={!!errors.tertiarySupportAmount}
                helperText={errors.tertiarySupportAmount}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Additional Notes (Optional)"
                multiline
                rows={2}
                value={formData.additionalNotes}
                onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              backgroundColor: OrganizationColors.green,
              "&:hover": { backgroundColor: "rgb(0, 128, 40)" },
            }}
          >
            {selectedCampaign ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this campaign? This action cannot be undone.
          </Typography>
          {selectedCampaign && selectedCampaign.totalJambApplications + selectedCampaign.totalTertiaryApplications > 0 && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              This campaign has existing applications. Deleting it may affect applicant data.
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
});

export default CampaignManagement;
