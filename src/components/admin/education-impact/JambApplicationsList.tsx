import React, { useEffect, useState } from "react";
import {
  Box,
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
  Button,
  TextField,
  Grid,
  Typography,
  MenuItem,
  Alert,
  Collapse,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
} from "@mui/material";
import {
  Visibility,
  ExpandMore,
  ExpandLess,
  CheckCircle,
  Cancel,
  FilterList,
} from "@mui/icons-material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";
import { OrganizationColors } from "../../../colors";
import { JambApplicantModel, ReviewApplicationDto } from "../../../api/models/educationImpact";

interface JambApplicationsListProps {
  onReviewComplete?: () => void;
}

const JambApplicationsList = observer(({ onReviewComplete }: JambApplicationsListProps) => {
  const { educationImpactStore } = useStore();
  const [applications, setApplications] = useState<JambApplicantModel[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<JambApplicantModel[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<JambApplicantModel | null>(null);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [openReviewDialog, setOpenReviewDialog] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    searchTerm: "",
  });
  const [reviewData, setReviewData] = useState<ReviewApplicationDto>({
    applicationId: "",
    applicationStatus: "Approved",
    reviewNotes: "",
  });

  useEffect(() => {
    loadApplications();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, applications]);

  const loadApplications = async () => {
    try {
      const data = await educationImpactStore.getAllJambApplications(0, 100);
      setApplications(data);
    } catch (error) {
      console.error("Failed to load applications");
    }
  };

  const applyFilters = () => {
    let filtered = [...applications];

    if (filters.status) {
      filtered = filtered.filter((app) => app.applicationStatus === filters.status);
    }

    if (filters.searchTerm) {
      const search = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (app) =>
          app.fullName.toLowerCase().includes(search) ||
          app.email.toLowerCase().includes(search) ||
          app.intendedCourse.toLowerCase().includes(search)
      );
    }

    setFilteredApplications(filtered);
  };

  const handleViewDetails = async (application: JambApplicantModel) => {
    try {
      const fullDetails = await educationImpactStore.getJambApplicationById(application.id);
      setSelectedApplication(fullDetails);
      setOpenDetailDialog(true);
    } catch (error) {
      console.error("Failed to load application details");
    }
  };

  const handleOpenReview = (application: JambApplicantModel) => {
    setSelectedApplication(application);
    setReviewData({
      applicationId: application.id,
      applicationStatus: "Approved",
      reviewNotes: "",
    });
    setOpenReviewDialog(true);
  };

  const handleSubmitReview = async () => {
    if (reviewData.reviewNotes.trim().length < 10) {
      return;
    }

    try {
      await educationImpactStore.reviewJambApplication(reviewData);
      setOpenReviewDialog(false);
      setOpenDetailDialog(false);
      loadApplications();
      onReviewComplete?.();
    } catch (error) {
      // Error handled by store
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "success";
      case "Rejected":
        return "error";
      default:
        return "warning";
    }
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <Box>
      <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          JAMB Applications ({filteredApplications.length})
        </Typography>
        <Button
          startIcon={<FilterList />}
          onClick={() => setShowFilters(!showFilters)}
          variant="outlined"
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
      </Box>

      {/* Filters */}
      <Collapse in={showFilters}>
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Search by name, email, or course"
                  value={filters.searchTerm}
                  onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Filter by Status"
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                >
                  <MenuItem value="">All Status</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Approved">Approved</MenuItem>
                  <MenuItem value="Rejected">Rejected</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Collapse>

      {filteredApplications.length === 0 ? (
        <Alert severity="info">No applications found matching your criteria.</Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: 600 }}>Applicant</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Contact</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Course</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Age</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Submitted</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredApplications.map((application) => (
                <TableRow key={application.id} hover>
                  <TableCell>{application.fullName}</TableCell>
                  <TableCell>
                    <Typography variant="body2">{application.email}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {application.phoneNumber}
                    </Typography>
                  </TableCell>
                  <TableCell>{application.intendedCourse}</TableCell>
                  <TableCell>{calculateAge(application.dateOfBirth)} years</TableCell>
                  <TableCell>
                    <Chip
                      label={application.applicationStatus}
                      color={getStatusColor(application.applicationStatus) as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{formatDate(application.dateAdded)}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 0.5 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleViewDetails(application)}
                        title="View Details"
                      >
                        <Visibility />
                      </IconButton>
                      {application.applicationStatus === "Pending" && (
                        <IconButton
                          size="small"
                          onClick={() => handleOpenReview(application)}
                          title="Review"
                          color="primary"
                        >
                          <CheckCircle />
                        </IconButton>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Application Details Dialog */}
      <Dialog
        open={openDetailDialog}
        onClose={() => setOpenDetailDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Application Details
          {selectedApplication && (
            <Chip
              label={selectedApplication.applicationStatus}
              color={getStatusColor(selectedApplication.applicationStatus) as any}
              size="small"
              sx={{ ml: 2 }}
            />
          )}
        </DialogTitle>
        <DialogContent>
          {selectedApplication && (
            <Grid container spacing={3}>
              {/* Personal Information */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ color: OrganizationColors.green }}>
                  Personal Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" color="text.secondary">
                  Full Name
                </Typography>
                <Typography variant="body1">{selectedApplication.fullName}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body1">{selectedApplication.email}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" color="text.secondary">
                  Phone Number
                </Typography>
                <Typography variant="body1">{selectedApplication.phoneNumber}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" color="text.secondary">
                  Date of Birth
                </Typography>
                <Typography variant="body1">
                  {formatDate(selectedApplication.dateOfBirth)} ({calculateAge(selectedApplication.dateOfBirth)} years)
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" color="text.secondary">
                  Gender
                </Typography>
                <Typography variant="body1">{selectedApplication.gender}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" color="text.secondary">
                  State of Origin
                </Typography>
                <Typography variant="body1">{selectedApplication.stateOfOrigin}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  Address
                </Typography>
                <Typography variant="body1">{selectedApplication.address}</Typography>
              </Grid>

              {/* Academic Information */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ color: OrganizationColors.green, mt: 2 }}>
                  Academic Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  Intended Course
                </Typography>
                <Typography variant="body1">{selectedApplication.intendedCourse}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" color="text.secondary">
                  First Choice Institution
                </Typography>
                <Typography variant="body1">{selectedApplication.firstChoiceInstitution}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" color="text.secondary">
                  Second Choice Institution
                </Typography>
                <Typography variant="body1">{selectedApplication.secondChoiceInstitution}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  JAMB Subject Combination
                </Typography>
                <Typography variant="body1">{selectedApplication.jambSubjectCombination}</Typography>
              </Grid>

              {/* Guardian Information */}
              {(selectedApplication.guardianName || selectedApplication.guardianPhoneNumber) && (
                <>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom sx={{ color: OrganizationColors.green, mt: 2 }}>
                      Guardian Information
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                  </Grid>
                  {selectedApplication.guardianName && (
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2" color="text.secondary">
                        Guardian Name
                      </Typography>
                      <Typography variant="body1">{selectedApplication.guardianName}</Typography>
                    </Grid>
                  )}
                  {selectedApplication.guardianPhoneNumber && (
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2" color="text.secondary">
                        Guardian Phone
                      </Typography>
                      <Typography variant="body1">{selectedApplication.guardianPhoneNumber}</Typography>
                    </Grid>
                  )}
                </>
              )}

              {/* Statement */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ color: OrganizationColors.green, mt: 2 }}>
                  Why They Deserve Support
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                  {selectedApplication.whyYouDeserveSupport}
                </Typography>
              </Grid>

              {selectedApplication.familyBackgroundInfo && (
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom sx={{ color: OrganizationColors.green, mt: 2 }}>
                    Family Background
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                    {selectedApplication.familyBackgroundInfo}
                  </Typography>
                </Grid>
              )}

              {/* Review Information */}
              {selectedApplication.reviewedDate && (
                <>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom sx={{ color: OrganizationColors.green, mt: 2 }}>
                      Review Information
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2" color="text.secondary">
                      Reviewed By
                    </Typography>
                    <Typography variant="body1">{selectedApplication.reviewedBy || "N/A"}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2" color="text.secondary">
                      Review Date
                    </Typography>
                    <Typography variant="body1">{formatDate(selectedApplication.reviewedDate)}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      Review Notes
                    </Typography>
                    <Typography variant="body1">{selectedApplication.reviewNotes}</Typography>
                  </Grid>
                </>
              )}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          {selectedApplication && selectedApplication.applicationStatus === "Pending" && (
            <Button
              onClick={() => {
                handleOpenReview(selectedApplication);
                setOpenDetailDialog(false);
              }}
              variant="contained"
              sx={{
                backgroundColor: OrganizationColors.green,
                "&:hover": { backgroundColor: "rgb(0, 128, 40)" },
              }}
            >
              Review Application
            </Button>
          )}
          <Button onClick={() => setOpenDetailDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Review Dialog */}
      <Dialog open={openReviewDialog} onClose={() => setOpenReviewDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Review Application</DialogTitle>
        <DialogContent>
          {selectedApplication && (
            <Box sx={{ pt: 2 }}>
              <Typography variant="body1" gutterBottom>
                <strong>Applicant:</strong> {selectedApplication.fullName}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {selectedApplication.email}
              </Typography>

              <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
                <FormLabel component="legend">Decision *</FormLabel>
                <RadioGroup
                  value={reviewData.applicationStatus}
                  onChange={(e) =>
                    setReviewData({
                      ...reviewData,
                      applicationStatus: e.target.value as "Approved" | "Rejected",
                    })
                  }
                >
                  <FormControlLabel
                    value="Approved"
                    control={<Radio />}
                    label="Approve Application"
                  />
                  <FormControlLabel
                    value="Rejected"
                    control={<Radio />}
                    label="Reject Application"
                  />
                </RadioGroup>
              </FormControl>

              <TextField
                fullWidth
                label="Review Notes"
                required
                multiline
                rows={4}
                value={reviewData.reviewNotes}
                onChange={(e) => setReviewData({ ...reviewData, reviewNotes: e.target.value })}
                helperText="Minimum 10 characters. Provide detailed feedback for the applicant."
                error={reviewData.reviewNotes.length > 0 && reviewData.reviewNotes.length < 10}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenReviewDialog(false)}>Cancel</Button>
          <Button
            onClick={handleSubmitReview}
            variant="contained"
            disabled={reviewData.reviewNotes.trim().length < 10}
            sx={{
              backgroundColor: OrganizationColors.green,
              "&:hover": { backgroundColor: "rgb(0, 128, 40)" },
            }}
          >
            Submit Review
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
});

export default JambApplicationsList;
