import { useState, useEffect } from "react";
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
  genderOptions,
} from "../../data/educationImpactData";
import { CreateJambApplicationDto } from "../../api/models/educationImpact";

const steps = [
  "Personal Information",
  "Academic Information",
  "Guardian Information",
  "Documents",
  "Statement",
  "Review & Submit",
];

const JambApplicationForm = observer(() => {
  const { educationImpactStore, commonStore } = useStore();
  const [activeStep, setActiveStep] = useState(0);
  const [campaignId, setCampaignId] = useState("");
  const [formData, setFormData] = useState<CreateJambApplicationDto>({
    campaignId: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "Male",
    address: "",
    stateOfOrigin: "",
    lga: "",
    intendedCourse: "",
    firstChoiceInstitution: "",
    secondChoiceInstitution: "",
    jambSubjectCombination: "",
    passportPhotoUrl: "",
    identificationDocumentUrl: "",
    whyYouDeserveSupport: "",
    familyBackgroundInfo: "",
    guardianName: "",
    guardianPhoneNumber: "",
  });

  const [uploadProgress, setUploadProgress] = useState({
    passport: 0,
    id: 0,
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
    const draft = localStorage.getItem("jambApplicationDraft");
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
    localStorage.setItem("jambApplicationDraft", JSON.stringify(formData));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeStep < steps.length - 1) {
        saveDraft();
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [formData]);

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
        else {
          const age = calculateAge(formData.dateOfBirth);
          if (age < 14 || age > 35)
            newErrors.dateOfBirth = "Age must be between 15 and 30";
        }
        if (!formData.address.trim()) newErrors.address = "Address is required";
        if (!formData.stateOfOrigin)
          newErrors.stateOfOrigin = "State of origin is required";
        if (!formData.lga) newErrors.lga = "LGA is required";
        break;

      case 1: // Academic Information
        if (!formData.intendedCourse.trim())
          newErrors.intendedCourse = "Intended course is required";
        if (!formData.firstChoiceInstitution.trim())
          newErrors.firstChoiceInstitution =
            "First choice institution is required";
        if (!formData.secondChoiceInstitution.trim())
          newErrors.secondChoiceInstitution =
            "Second choice institution is required";
        if (!formData.jambSubjectCombination.trim())
          newErrors.jambSubjectCombination =
            "JAMB subject combination is required";
        break;

      case 3: // Documents
        if (!formData.passportPhotoUrl)
          newErrors.passportPhotoUrl = "Passport photograph is required";
        if (!formData.identificationDocumentUrl)
          newErrors.identificationDocumentUrl =
            "Identification document is required";
        break;

      case 4: // Statement
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

  const calculateAge = (dateOfBirth: string): number => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
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
    fieldName: "passportPhotoUrl" | "identificationDocumentUrl"
  ) => {
    try {
      const progressField = fieldName === "passportPhotoUrl" ? "passport" : "id";
      setUploadProgress((prev) => ({ ...prev, [progressField]: 10 }));

      const url = await educationImpactStore.uploadDocument(file);

      setUploadProgress((prev) => ({ ...prev, [progressField]: 100 }));
      setFormData((prev) => ({ ...prev, [fieldName]: url }));

      setTimeout(() => {
        setUploadProgress((prev) => ({ ...prev, [progressField]: 0 }));
      }, 1000);
    } catch (error) {
      setUploadProgress((prev) => ({ ...prev, passport: 0, id: 0 }));
      commonStore.setAlertText("Failed to upload file", true);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    try {
      const result = await educationImpactStore.submitJambApplication(formData);
      customHistory.push(
        `${ROUTES.educationImpactApplicationSuccess}/${result.id}`
      );
    } catch (error) {
      // Error is handled by the store
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
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
                helperText={errors.dateOfBirth || "Age must be between 15-30"}
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

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Intended Course of Study"
                required
                value={formData.intendedCourse}
                onChange={(e) =>
                  setFormData({ ...formData, intendedCourse: e.target.value })
                }
                error={!!errors.intendedCourse}
                helperText={errors.intendedCourse}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="First Choice Institution"
                required
                value={formData.firstChoiceInstitution}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    firstChoiceInstitution: e.target.value,
                  })
                }
                error={!!errors.firstChoiceInstitution}
                helperText={errors.firstChoiceInstitution}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Second Choice Institution"
                required
                value={formData.secondChoiceInstitution}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    secondChoiceInstitution: e.target.value,
                  })
                }
                error={!!errors.secondChoiceInstitution}
                helperText={errors.secondChoiceInstitution}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="JAMB Subject Combination"
                required
                value={formData.jambSubjectCombination}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    jambSubjectCombination: e.target.value,
                  })
                }
                error={!!errors.jambSubjectCombination}
                helperText={
                  errors.jambSubjectCombination ||
                  "e.g., Mathematics, English, Physics, Chemistry"
                }
              />
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Alert severity="info" sx={{ mb: 2 }}>
                Guardian information is optional but recommended
              </Alert>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Guardian's Full Name"
                value={formData.guardianName}
                onChange={(e) =>
                  setFormData({ ...formData, guardianName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Guardian's Phone Number"
                value={formData.guardianPhoneNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    guardianPhoneNumber: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
        );

      case 3:
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
                    Identification Document *
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Upload valid ID (Birth Certificate, National ID, or Student ID - Max 5MB)
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
                        if (file)
                          handleFileUpload(file, "identificationDocumentUrl");
                      }}
                    />
                  </Button>
                  {uploadProgress.id > 0 && (
                    <LinearProgress
                      variant="determinate"
                      value={uploadProgress.id}
                      sx={{ mt: 2 }}
                    />
                  )}
                  {formData.identificationDocumentUrl && (
                    <Chip
                      label="Uploaded Successfully"
                      color="success"
                      icon={<CheckCircle />}
                      sx={{ mt: 2 }}
                    />
                  )}
                  {errors.identificationDocumentUrl && (
                    <Typography variant="caption" color="error" display="block" sx={{ mt: 1 }}>
                      {errors.identificationDocumentUrl}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        );

      case 4:
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
                label="Family Background Information (Optional)"
                multiline
                rows={4}
                value={formData.familyBackgroundInfo}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    familyBackgroundInfo: e.target.value,
                  })
                }
                helperText="Share any relevant information about your family background"
              />
            </Grid>
          </Grid>
        );

      case 5:
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
                  <Typography variant="body2" color="text.secondary">Date of Birth:</Typography>
                  <Typography variant="body1">{formData.dateOfBirth}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Gender:</Typography>
                  <Typography variant="body1">{formData.gender}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">State of Origin:</Typography>
                  <Typography variant="body1">{formData.stateOfOrigin}</Typography>
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
                  <Typography variant="body2" color="text.secondary">Intended Course:</Typography>
                  <Typography variant="body1">{formData.intendedCourse}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">First Choice Institution:</Typography>
                  <Typography variant="body1">{formData.firstChoiceInstitution}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">JAMB Subjects:</Typography>
                  <Typography variant="body1">{formData.jambSubjectCombination}</Typography>
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
                {formData.identificationDocumentUrl && (
                  <Chip label="ID Document ✓" color="success" />
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
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: OrganizationColors.green }}>
          JAMB Support Application
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Complete all steps to submit your application
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
                backgroundColor: OrganizationColors.green,
                "&:hover": { backgroundColor: "rgb(0, 128, 40)" },
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
                backgroundColor: OrganizationColors.green,
                "&:hover": { backgroundColor: "rgb(0, 128, 40)" },
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

export default JambApplicationForm;
