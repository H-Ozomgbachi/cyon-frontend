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
  Slider,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import {
  Visibility,
  FilterList,
  EmojiEvents,
} from "@mui/icons-material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";
import { OrganizationColors } from "../../../colors";
import { TertiaryApplicantModel, ReviewApplicationDto } from "../../../api/models/educationImpact";

interface TertiaryApplicationsListProps {
  onReviewComplete?: () => void;
}

const TertiaryApplicationsList = observer(({ onReviewComplete }: TertiaryApplicationsListProps) => {
  const { educationImpactStore } = useStore();
  const [applications, setApplications] = useState<TertiaryApplicantModel[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<TertiaryApplicantModel[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<TertiaryApplicantModel | null>(null);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [openReviewDialog, setOpenReviewDialog] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"all" | "top3">("all");
  const [filters, setFilters] = useState({
    status: "",
    searchTerm: "",
    minCgpa: "",
    maxCgpa: "",
  });
  const [reviewData, setReviewData] = useState<ReviewApplicationDto>({
    applicationId: "",
    applicationStatus: "Approved",
    reviewNotes: "",
    rankingScore: 50,
  });

  useEffect(() => {
    loadApplications();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, applications, viewMode]);

  const loadApplications = async () => {
    try {
      const data = await educationImpactStore.getAllTertiaryApplications(0, 100);
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
          app.courseOfStudy.toLowerCase().includes(search) ||
          app.institution.toLowerCase().includes(search)
      );
    }

    if (filters.minCgpa) {
      const minCgpa = parseFloat(filters.minCgpa);
      filtered = filtered.filter((app) => app.currentCGPA >= minCgpa);
    }

    if (filters.maxCgpa) {
      const maxCgpa = parseFloat(filters.maxCgpa);
      filtered = filtered.filter((app) => app.currentCGPA <= maxCgpa);
    }

    // Sort by ranking score (highest first) for top 3 view
    filtered.sort((a, b) => (b.rankingScore || 0) - (a.rankingScore || 0));

    // If viewing top 3, filter to only approved applications with scores
    if (viewMode === "top3") {
      filtered = filtered
        .filter((app) => app.applicationStatus === "Approved" && (app.rankingScore || 0) > 0)
        .slice(0, 3);
    }

    setFilteredApplications(filtered);
  };

  const handleViewDetails = async (application: TertiaryApplicantModel) => {
    try {
      const fullDetails = await educationImpactStore.getTertiaryApplicationById(application.id);
      setSelectedApplication(fullDetails);
      setOpenDetailDialog(true);
    } catch (error) {
      console.error("Failed to load application details");
    }
  };

  const handleOpenReview = (application: TertiaryApplicantModel) => {
    setSelectedApplication(application);
    setReviewData({
      applicationId: application.id,
      applicationStatus: "Approved",
      reviewNotes: "",
      rankingScore: application.rankingScore || 50,
    });
    setOpenReviewDialog(true);
  };

  const handleSubmitReview = async () => {
    if (reviewData.reviewNotes.trim().length < 10) {
      return;
    }

    try {
      await educationImpactStore.reviewTertiaryApplication(reviewData);
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

  const getCgpaColor = (cgpa: number) => {
    if (cgpa >= 4.5) return OrganizationColors.green;
    if (cgpa >= 3.5) return OrganizationColors.deepYellow;
    return "inherit";
  };

  const getRankBadge = (index: number) => {
    const colors = ["gold", "silver", "#cd7f32"];
    if (index < 3) {
      return (
        <Chip
          icon={<EmojiEvents />}
          label={`#${index + 1}`}
          size="small"
          sx={{
            backgroundColor: colors[index],
            color: "white",
            fontWeight: 600,
          }}
        />
      );
    }
    return null;
  };

  return (
    <Box>
      <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Tertiary Applications ({filteredApplications.length})
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(_, newMode) => newMode && setViewMode(newMode)}
            size="small"
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="top3">Top 3</ToggleButton>
          </ToggleButtonGroup>
          <Button
            startIcon={<FilterList />}
            onClick={() => setShowFilters(!showFilters)}
            variant="outlined"
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
        </Box>
      </Box>

      {/* Filters */}
      <Collapse in={showFilters}>
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Search by name, email, course, or institution"
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
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Minimum CGPA"
                  value={filters.minCgpa}
                  onChange={(e) => setFilters({ ...filters, minCgpa: e.target.value })}
                  inputProps={{ min: 0, max: 5, step: 0.01 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Maximum CGPA"
                  value={filters.maxCgpa}
                  onChange={(e) => setFilters({ ...filters, maxCgpa: e.target.value })}
                  inputProps={{ min: 0, max: 5, step: 0.01 }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Collapse>

      {filteredApplications.length === 0 ? (
        <Alert severity="info">
          {viewMode === "top3"
            ? "No top 3 applications available. Please review and rank approved applications."
            : "No applications found matching your criteria."}
        </Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                {viewMode === "top3" && <TableCell sx={{ fontWeight: 600 }}>Rank</TableCell>}
                <TableCell sx={{ fontWeight: 600 }}>Applicant</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Contact</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Institution</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Course</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>CGPA</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Score</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Submitted</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredApplications.map((application, index) => (
                <TableRow key={application.id} hover>
                  {viewMode === "top3" && <TableCell>{getRankBadge(index)}</TableCell>}
                  <TableCell>{application.fullName}</TableCell>
                  <TableCell>
                    <Typography variant="body2">{application.email}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {application.phoneNumber}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{application.institution}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {application.department}
                    </Typography>
                  </TableCell>
                  <TableCell>{application.courseOfStudy}</TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 600,
                        color: getCgpaColor(application.currentCGPA),
                      }}
                    >
                      {application.currentCGPA.toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {application.rankingScore ? (
                      <Chip
                        label={application.rankingScore}
                        size="small"
                        color={application.rankingScore >= 70 ? "success" : "default"}
                      />
                    ) : (
                      <Typography variant="caption" color="text.secondary">
                        Not ranked
                      </Typography>
                    )}
                  </TableCell>
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
                          title="Review & Rank"
                          color="primary"
                        >
                          <EmojiEvents />
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
                <Typography variant="body1">{formatDate(selectedApplication.dateOfBirth)}</Typography>
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
              <Grid item xs={12} md={6}>
                <Typography variant="body2" color="text.secondary">
                  Institution
                </Typography>
                <Typography variant="body1">{selectedApplication.institution}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" color="text.secondary">
                  Faculty
                </Typography>
                <Typography variant="body1">{selectedApplication.faculty}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" color="text.secondary">
                  Department
                </Typography>
                <Typography variant="body1">{selectedApplication.department}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" color="text.secondary">
                  Course of Study
                </Typography>
                <Typography variant="body1">{selectedApplication.courseOfStudy}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" color="text.secondary">
                  Matric Number
                </Typography>
                <Typography variant="body1">{selectedApplication.matricNumber}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" color="text.secondary">
                  Current CGPA
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 600, color: getCgpaColor(selectedApplication.currentCGPA) }}
                >
                  {selectedApplication.currentCGPA.toFixed(2)}
                </Typography>
              </Grid>

              {/* Achievements & Activities */}
              {selectedApplication.academicAchievements && (
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom sx={{ color: OrganizationColors.green, mt: 2 }}>
                    Academic Achievements
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                    {selectedApplication.academicAchievements}
                  </Typography>
                </Grid>
              )}

              {selectedApplication.extracurricularActivities && (
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom sx={{ color: OrganizationColors.green, mt: 2 }}>
                    Extracurricular Activities
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                    {selectedApplication.extracurricularActivities}
                  </Typography>
                </Grid>
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

              {selectedApplication.financialNeedStatement && (
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom sx={{ color: OrganizationColors.green, mt: 2 }}>
                    Financial Need Statement
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                    {selectedApplication.financialNeedStatement}
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
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2" color="text.secondary">
                      Ranking Score
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {selectedApplication.rankingScore || "Not ranked"}
                    </Typography>
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
              Review & Rank Application
            </Button>
          )}
          <Button onClick={() => setOpenDetailDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Review Dialog */}
      <Dialog open={openReviewDialog} onClose={() => setOpenReviewDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Review & Rank Application</DialogTitle>
        <DialogContent>
          {selectedApplication && (
            <Box sx={{ pt: 2 }}>
              <Typography variant="body1" gutterBottom>
                <strong>Applicant:</strong> {selectedApplication.fullName}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {selectedApplication.email}
              </Typography>
              <Typography variant="body2" sx={{ mb: 3 }}>
                <strong>CGPA:</strong>{" "}
                <span style={{ color: getCgpaColor(selectedApplication.currentCGPA), fontWeight: 600 }}>
                  {selectedApplication.currentCGPA.toFixed(2)}
                </span>
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

              {reviewData.applicationStatus === "Approved" && (
                <Box sx={{ mb: 3 }}>
                  <FormLabel component="legend" sx={{ mb: 2 }}>
                    Ranking Score (0-100) *
                  </FormLabel>
                  <Slider
                    value={reviewData.rankingScore || 50}
                    onChange={(_, value) =>
                      setReviewData({ ...reviewData, rankingScore: value as number })
                    }
                    valueLabelDisplay="on"
                    min={0}
                    max={100}
                    marks={[
                      { value: 0, label: "0" },
                      { value: 50, label: "50" },
                      { value: 100, label: "100" },
                    ]}
                    sx={{
                      color: (reviewData.rankingScore || 0) >= 70 ? OrganizationColors.green : "primary",
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    Score based on academic performance, achievements, need, and potential impact.
                    Top 3 highest scores will be selected for the scholarship.
                  </Typography>
                </Box>
              )}

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

export default TertiaryApplicationsList;
