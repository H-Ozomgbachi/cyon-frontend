import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Paper,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Autocomplete,
} from "@mui/material";
import {
  ArrowBack,
  ArrowForward,
  CheckCircle,
  CloudUpload,
} from "@mui/icons-material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../api/main/appStore";
import { customHistory } from "../..";
import { ROUTES } from "../../routes";
import { OrganizationColors } from "../../colors";
import {
  nigerianStates,
  nigerianUniversities,
  genderOptions,
  currentLevelOptions,
} from "../../data/educationImpactData";
import { CreateTertiaryApplicationDto } from "../../api/models/educationImpact";

const steps = [
  "Personal Information",
  "Academic Information",
  "Documents",
  "Achievements & Activities",
  "Review & Submit",
];

const TertiaryApplicationForm = observer(() => {
  const { educationImpactStore, commonStore } = useStore();
  const [activeStep, setActiveStep] = useState(0);
  const [campaignId, setCampaignId] = useState("");
  const [formData, setFormData] = useState<CreateTertiaryApplicationDto>({
    campaignId: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "Male",
    address: "",
    stateOfOrigin: "",
    lga: "",
    institution: "",
    courseOfStudy: "",
    department: "",
    faculty: "",
    currentLevel: 200,
    matricNumber: "",
    studentIdCardUrl: "",
    currentCGPA: 0,
    previousSessionCGPA: 0,
    academicTranscriptUrl: "",
    passportPhotoUrl: "",
    admissionLetterUrl: "",
    whyYouDeserveSupport: "",
    academicAchievements: "",
    extracurricularActivities: "",
    financialNeedStatement: "",
  });

  const [gradingSystem, setGradingSystem] = useState<4 | 5 | 7>(5);

  const [uploadProgress, setUploadProgress] = useState({
    passport: 0,
    studentId: 0,
    transcript: 0,
    admission: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    loadCampaign();
    loadDraft();
  }, []);

  const loadCampaign = async () => {
    try {
      const campaign = await educationImpactStore.getActiveCampaign();
      if (campaign && campaign.isOpen) {
        setCampaignId(campaign.id);
        setFormData((prev) => ({ ...prev, campaignId: campaign.id }));
      } else {
        // Silently redirect to landing page without error
        customHistory.push(ROUTES.educationImpact);
      }
    } catch (error) {
      // Silently redirect to landing page
      customHistory.push(ROUTES.educationImpact);
    }
  };

  const loadDraft = () => {
    const draft = localStorage.getItem("tertiaryApplicationDraft");
    if (draft) {
      try {
        const parsedDraft = JSON.parse(draft);
        setFormData(parsedDraft);
      } catch (error) {
        console.error("Failed to load draft:", error);
      }
    }
  };

  const saveDraft = () => {
    localStorage.setItem("tertiaryApplicationDraft", JSON.stringify(formData));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeStep < steps.length - 1) {
        saveDraft();
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [formData, activeStep]);

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 0: // Personal Information
        if (!formData.fullName.trim())
          newErrors.fullName = "Full name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
          newErrors.email = "Invalid email format";
        if (!formData.phoneNumber.trim())
          newErrors.phoneNumber = "Phone number is required";
        if (!formData.dateOfBirth)
          newErrors.dateOfBirth = "Date of birth is required";
        if (!formData.address.trim()) newErrors.address = "Address is required";
        if (!formData.stateOfOrigin)
          newErrors.stateOfOrigin = "State of origin is required";
        if (!formData.lga) newErrors.lga = "LGA is required";
        break;

      case 1: // Academic Information
        if (!formData.institution.trim())
          newErrors.institution = "Institution is required";
        if (!formData.courseOfStudy.trim())
          newErrors.courseOfStudy = "Course of study is required";
        if (!formData.department.trim())
          newErrors.department = "Department is required";
        if (!formData.faculty.trim())
          newErrors.faculty = "Faculty is required";
        if (!formData.matricNumber.trim())
          newErrors.matricNumber = "Matric number is required";
        if (formData.currentCGPA < 0 || formData.currentCGPA > gradingSystem)
          newErrors.currentCGPA = `CGPA must be between 0.00 and ${gradingSystem}.00`;
        if (formData.previousSessionCGPA < 0 || formData.previousSessionCGPA > gradingSystem)
          newErrors.previousSessionCGPA = `CGPA must be between 0.00 and ${gradingSystem}.00`;
        break;

      case 2: // Documents
        if (!formData.passportPhotoUrl)
          newErrors.passportPhotoUrl = "Passport photograph is required";
        if (!formData.studentIdCardUrl)
          newErrors.studentIdCardUrl = "Student ID card is required";
        if (!formData.academicTranscriptUrl)
          newErrors.academicTranscriptUrl = "Academic transcript is required";
        break;

      case 3: // Achievements & Activities
        if (!formData.whyYouDeserveSupport.trim())
          newErrors.whyYouDeserveSupport = "This statement is required";
        else if (formData.whyYouDeserveSupport.length < 100)
          newErrors.whyYouDeserveSupport =
            "Statement must be at least 100 characters";
        else if (formData.whyYouDeserveSupport.length > 2000)
          newErrors.whyYouDeserveSupport =
            "Statement must not exceed 2000 characters";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevStep) => prevStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFileUpload = async (
    file: File,
    fieldName: keyof CreateTertiaryApplicationDto
  ) => {
    try {
      const progressMap: Record<string, string> = {
        passportPhotoUrl: "passport",
        studentIdCardUrl: "studentId",
        academicTranscriptUrl: "transcript",
        admissionLetterUrl: "admission",
      };
      const progressField = progressMap[fieldName];

      if (progressField) {
        setUploadProgress((prev) => ({ ...prev, [progressField]: 10 }));
      }

      const url = await educationImpactStore.uploadDocument(file);

      if (progressField) {
        setUploadProgress((prev) => ({ ...prev, [progressField]: 100 }));
      }
      setFormData((prev) => ({ ...prev, [fieldName]: url }));

      setTimeout(() => {
        if (progressField) {
          setUploadProgress((prev) => ({ ...prev, [progressField]: 0 }));
        }
      }, 1000);
    } catch (error) {
      setUploadProgress({ passport: 0, studentId: 0, transcript: 0, admission: 0 });
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    try {
      const result = await educationImpactStore.submitTertiaryApplication(formData);
      customHistory.push(
        `${ROUTES.educationImpactApplicationSuccess}/${result.id}`
      );
    } catch (error) {
      // Error is handled by the store
    }
  };

  const getCGPAColor = (cgpa: number) => {
    const percentage = (cgpa / gradingSystem) * 100;
    if (percentage >= 70) return OrganizationColors.green;
    if (percentage >= 60) return "#4caf50";
    if (percentage >= 50) return "#ff9800";
    if (percentage >= 45) return "#ff5722";
    return "#f44336";
  };

  const getCGPALabel = (cgpa: number) => {
    const percentage = (cgpa / gradingSystem) * 100;
    if (percentage >= 70) return "First Class";
    if (percentage >= 60) return "Second Class Upper";
    if (percentage >= 50) return "Second Class Lower";
    if (percentage >= 45) return "Third Class";
    if (percentage >= 40) return "Pass";
    return "Below Pass";
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0: // Personal Information
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                required
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                error={!!errors.fullName}
                helperText={errors.fullName}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email Address"
                required
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone Number"
                required
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber || "Format: +234XXXXXXXXXX"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                required
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.dateOfBirth}
                onChange={(e) =>
                  setFormData({ ...formData, dateOfBirth: e.target.value })
                }
                error={!!errors.dateOfBirth}
                helperText={errors.dateOfBirth}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">Gender *</FormLabel>
                <RadioGroup
                  row
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      gender: e.target.value as "Male" | "Female" | "Other",
                    })
                  }
                >
                  {genderOptions.map((option) => (
                    <FormControlLabel
                      key={option.value}
                      value={option.value}
                      control={<Radio />}
                      label={option.label}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Residential Address"
                required
                multiline
                rows={2}
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                error={!!errors.address}
                helperText={errors.address}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="State of Origin"
                required
                value={formData.stateOfOrigin}
                onChange={(e) =>
                  setFormData({ ...formData, stateOfOrigin: e.target.value, lga: "" })
                }
                error={!!errors.stateOfOrigin}
                helperText={errors.stateOfOrigin}
              >
                {nigerianStates.map((state) => (
                  <MenuItem key={state.value} value={state.value}>
                    {state.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="LGA"
                required
                value={formData.lga}
                onChange={(e) =>
                  setFormData({ ...formData, lga: e.target.value })
                }
                error={!!errors.lga}
                helperText={errors.lga || "Local Government Area"}
              />
            </Grid>
          </Grid>
        );

      case 1: // Academic Information
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Autocomplete
                fullWidth
                options={nigerianUniversities}
                value={nigerianUniversities.find(uni => uni.value === formData.institution) || null}
                onChange={(event, newValue) =>
                  setFormData({ ...formData, institution: newValue?.value || "" })
                }
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Institution"
                    required
                    error={!!errors.institution}
                    helperText={errors.institution}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Institution Grading System"
                required
                value={gradingSystem}
                onChange={(e) => setGradingSystem(Number(e.target.value) as 4 | 5 | 7)}
                helperText="Select the maximum CGPA scale used by your institution"
              >
                <MenuItem value={4}>4.0 Scale</MenuItem>
                <MenuItem value={5}>5.0 Scale</MenuItem>
                <MenuItem value={7}>7.0 Scale</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Faculty"
                required
                value={formData.faculty}
                onChange={(e) =>
                  setFormData({ ...formData, faculty: e.target.value })
                }
                error={!!errors.faculty}
                helperText={errors.faculty}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Department"
                required
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
                error={!!errors.department}
                helperText={errors.department}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Course of Study"
                required
                value={formData.courseOfStudy}
                onChange={(e) =>
                  setFormData({ ...formData, courseOfStudy: e.target.value })
                }
                error={!!errors.courseOfStudy}
                helperText={errors.courseOfStudy}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Current Level"
                required
                value={formData.currentLevel}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    currentLevel: Number(e.target.value) as 200 | 300 | 400 | 500 | 600 | 700,
                  })
                }
              >
                {currentLevelOptions.map((level) => (
                  <MenuItem key={level.value} value={level.value}>
                    {level.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Matriculation Number"
                required
                value={formData.matricNumber}
                onChange={(e) =>
                  setFormData({ ...formData, matricNumber: e.target.value })
                }
                error={!!errors.matricNumber}
                helperText={errors.matricNumber}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Current CGPA"
                required
                type="number"
                inputProps={{ step: 0.01, min: 0, max: gradingSystem }}
                value={formData.currentCGPA || ""}
                onChange={(e) => {
                  const value = e.target.value === "" ? 0 : parseFloat(e.target.value);
                  if (e.target.value === "" || (!isNaN(value) && value >= 0 && value <= gradingSystem)) {
                    setFormData({
                      ...formData,
                      currentCGPA: value === 0 && e.target.value === "" ? 0 : Math.round(value * 100) / 100,
                    });
                  }
                }}
                error={!!errors.currentCGPA}
                helperText={errors.currentCGPA || `0.00 - ${gradingSystem}.00`}
              />
              {formData.currentCGPA > 0 && (
                <Chip
                  label={getCGPALabel(formData.currentCGPA)}
                  size="small"
                  sx={{
                    mt: 1,
                    backgroundColor: getCGPAColor(formData.currentCGPA),
                    color: "#fff",
                  }}
                />
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Previous Session CGPA"
                required
                type="number"
                inputProps={{ step: 0.01, min: 0, max: gradingSystem }}
                value={formData.previousSessionCGPA || ""}
                onChange={(e) => {
                  const value = e.target.value === "" ? 0 : parseFloat(e.target.value);
                  if (e.target.value === "" || (!isNaN(value) && value >= 0 && value <= gradingSystem)) {
                    setFormData({
                      ...formData,
                      previousSessionCGPA: value === 0 && e.target.value === "" ? 0 : Math.round(value * 100) / 100,
                    });
                  }
                }}
                error={!!errors.previousSessionCGPA}
                helperText={errors.previousSessionCGPA || `0.00 - ${gradingSystem}.00`}
              />
              {formData.previousSessionCGPA > 0 && (
                <Chip
                  label={getCGPALabel(formData.previousSessionCGPA)}
                  size="small"
                  sx={{
                    mt: 1,
                    backgroundColor: getCGPAColor(formData.previousSessionCGPA),
                    color: "#fff",
                  }}
                />
              )}
            </Grid>
          </Grid>
        );

      case 2: // Documents
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Passport Photograph *
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Upload a recent passport-sized photo (Max 2MB, JPG/PNG)
                  </Typography>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<CloudUpload />}
                    fullWidth
                  >
                    Choose File
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file, "passportPhotoUrl");
                      }}
                    />
                  </Button>
                  {uploadProgress.passport > 0 && (
                    <LinearProgress
                      variant="determinate"
                      value={uploadProgress.passport}
                      sx={{ mt: 2 }}
                    />
                  )}
                  {formData.passportPhotoUrl && (
                    <Chip
                      label="Uploaded Successfully"
                      color="success"
                      icon={<CheckCircle />}
                      sx={{ mt: 2 }}
                    />
                  )}
                  {errors.passportPhotoUrl && (
                    <Typography variant="caption" color="error" display="block" sx={{ mt: 1 }}>
                      {errors.passportPhotoUrl}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Student ID Card *
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Upload both sides of your student ID card (Max 5MB)
                  </Typography>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<CloudUpload />}
                    fullWidth
                  >
                    Choose File
                    <input
                      type="file"
                      hidden
                      accept="image/*,application/pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file, "studentIdCardUrl");
                      }}
                    />
                  </Button>
                  {uploadProgress.studentId > 0 && (
                    <LinearProgress
                      variant="determinate"
                      value={uploadProgress.studentId}
                      sx={{ mt: 2 }}
                    />
                  )}
                  {formData.studentIdCardUrl && (
                    <Chip
                      label="Uploaded Successfully"
                      color="success"
                      icon={<CheckCircle />}
                      sx={{ mt: 2 }}
                    />
                  )}
                  {errors.studentIdCardUrl && (
                    <Typography variant="caption" color="error" display="block" sx={{ mt: 1 }}>
                      {errors.studentIdCardUrl}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Academic Transcript *
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Upload your current academic transcript showing CGPA (Max 10MB, PDF)
                  </Typography>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<CloudUpload />}
                    fullWidth
                  >
                    Choose File
                    <input
                      type="file"
                      hidden
                      accept="application/pdf,image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file, "academicTranscriptUrl");
                      }}
                    />
                  </Button>
                  {uploadProgress.transcript > 0 && (
                    <LinearProgress
                      variant="determinate"
                      value={uploadProgress.transcript}
                      sx={{ mt: 2 }}
                    />
                  )}
                  {formData.academicTranscriptUrl && (
                    <Chip
                      label="Uploaded Successfully"
                      color="success"
                      icon={<CheckCircle />}
                      sx={{ mt: 2 }}
                    />
                  )}
                  {errors.academicTranscriptUrl && (
                    <Typography variant="caption" color="error" display="block" sx={{ mt: 1 }}>
                      {errors.academicTranscriptUrl}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Admission Letter (Optional)
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Upload your admission letter (Max 5MB, PDF)
                  </Typography>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<CloudUpload />}
                    fullWidth
                  >
                    Choose File
                    <input
                      type="file"
                      hidden
                      accept="application/pdf,image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file, "admissionLetterUrl");
                      }}
                    />
                  </Button>
                  {uploadProgress.admission > 0 && (
                    <LinearProgress
                      variant="determinate"
                      value={uploadProgress.admission}
                      sx={{ mt: 2 }}
                    />
                  )}
                  {formData.admissionLetterUrl && (
                    <Chip
                      label="Uploaded Successfully"
                      color="success"
                      icon={<CheckCircle />}
                      sx={{ mt: 2 }}
                    />
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        );

      case 3: // Achievements & Activities
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Why You Deserve This Support"
                required
                multiline
                rows={6}
                value={formData.whyYouDeserveSupport}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    whyYouDeserveSupport: e.target.value,
                  })
                }
                error={!!errors.whyYouDeserveSupport}
                helperText={
                  errors.whyYouDeserveSupport ||
                  `${formData.whyYouDeserveSupport.length}/2000 characters (minimum 100)`
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Academic Achievements (Optional)"
                multiline
                rows={4}
                value={formData.academicAchievements}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    academicAchievements: e.target.value,
                  })
                }
                helperText="List awards, honors, publications, dean's list, etc."
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Extracurricular Activities (Optional)"
                multiline
                rows={4}
                value={formData.extracurricularActivities}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    extracurricularActivities: e.target.value,
                  })
                }
                helperText="Leadership roles, volunteer work, clubs, sports, etc."
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Financial Need Statement (Optional)"
                multiline
                rows={4}
                value={formData.financialNeedStatement}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    financialNeedStatement: e.target.value,
                  })
                }
                helperText="Explain your financial situation and why you need this scholarship"
              />
            </Grid>
          </Grid>
        );

      case 4: // Review & Submit
        return (
          <Box>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Review Your Application
            </Typography>
            <Alert severity="warning" sx={{ mb: 3 }}>
              Please review all information carefully before submitting. You cannot edit your application after submission.
            </Alert>

            {/* Personal Information Summary */}
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: OrganizationColors.green }}>
                Personal Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Full Name:</Typography>
                  <Typography variant="body1">{formData.fullName}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Email:</Typography>
                  <Typography variant="body1">{formData.email}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Phone:</Typography>
                  <Typography variant="body1">{formData.phoneNumber}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Gender:</Typography>
                  <Typography variant="body1">{formData.gender}</Typography>
                </Grid>
              </Grid>
            </Paper>

            {/* Academic Information Summary */}
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: OrganizationColors.green }}>
                Academic Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">Institution:</Typography>
                  <Typography variant="body1">{formData.institution}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Course of Study:</Typography>
                  <Typography variant="body1">{formData.courseOfStudy}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Current Level:</Typography>
                  <Typography variant="body1">{formData.currentLevel} Level</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Current CGPA:</Typography>
                  <Typography variant="body1">
                    {formData.currentCGPA.toFixed(2)} - {getCGPALabel(formData.currentCGPA)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Previous CGPA:</Typography>
                  <Typography variant="body1">{formData.previousSessionCGPA.toFixed(2)}</Typography>
                </Grid>
              </Grid>
            </Paper>

            {/* Documents Summary */}
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: OrganizationColors.green }}>
                Documents
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                {formData.passportPhotoUrl && (
                  <Chip label="Passport Photo ✓" color="success" />
                )}
                {formData.studentIdCardUrl && (
                  <Chip label="Student ID ✓" color="success" />
                )}
                {formData.academicTranscriptUrl && (
                  <Chip label="Transcript ✓" color="success" />
                )}
                {formData.admissionLetterUrl && (
                  <Chip label="Admission Letter ✓" color="success" />
                )}
              </Box>
            </Paper>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: { xs: 2, md: 4 } }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: OrganizationColors.deepYellow }}>
          Tertiary Scholarship Application
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Complete all steps to submit your application for the Top 3 scholarship
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ minHeight: 400 }}>{renderStepContent(activeStep)}</Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Button
            variant="outlined"
            onClick={handleBack}
            disabled={activeStep === 0}
            startIcon={<ArrowBack />}
          >
            Back
          </Button>

          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                backgroundColor: OrganizationColors.deepYellow,
                "&:hover": { backgroundColor: "rgb(130, 94, 13)" },
              }}
            >
              Submit Application
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
              endIcon={<ArrowForward />}
              sx={{
                backgroundColor: OrganizationColors.deepYellow,
                "&:hover": { backgroundColor: "rgb(130, 94, 13)" },
              }}
            >
              Next
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
});

export default TertiaryApplicationForm;
