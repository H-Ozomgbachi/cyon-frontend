import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import {
  SchoolOutlined,
  MenuBookOutlined,
  EmojiEventsOutlined,
  ExpandMoreOutlined,
  CheckCircleOutline,
  AccessTime,
  Menu as MenuIcon,
  HomeOutlined,
} from "@mui/icons-material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../api/main/appStore";
import { customHistory } from "../..";
import { ROUTES } from "../../routes";
import { OrganizationColors } from "../../colors";
import { JustLogo } from "../shared/organization-title/OrganizationTitle";
import { CampaignModel } from "../../api/models/educationImpact";

const EducationImpactLanding = observer(() => {
  const { educationImpactStore } = useStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [campaign, setCampaign] = useState<CampaignModel | null>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    loadActiveCampaign();
  }, []);

  const loadActiveCampaign = async () => {
    const activeCampaign = await educationImpactStore.getActiveCampaign();
    setCampaign(activeCampaign);
  };

  useEffect(() => {
    if (!campaign || !campaign.isOpen) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const closeDate = new Date(campaign.closeDate).getTime();
      const distance = closeDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [campaign]);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const navigationItems = [
    { label: "Home", action: () => customHistory.push(ROUTES.home) },
    { label: "Features", action: () => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" }) },
    { label: "How It Works", action: () => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" }) },
    { label: "FAQ", action: () => document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" }) },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const calculateSlotsRemaining = (total: number, used: number) => {
    const remaining = Math.max(0, total - used);
    return remaining;
  };

  const getProgressPercentage = (total: number, used: number) => {
    return Math.min((used / total) * 100, 100);
  };

  const faqs = [
    {
      question: "Who is eligible to apply?",
      answer:
        "JAMB applicants must be parishioners and preparing for UTME. Tertiary applicants must be in 200 level or above with a minimum CGPA requirement. Being a CYON member is an advantage but not mandatory.",
    },
    {
      question: "What documents do I need?",
      answer:
        "You'll need a passport photograph, valid ID, and for tertiary students: student ID, admission letter, and academic transcript showing your CGPA.",
    },
    {
      question: "When will I hear back about my application?",
      answer:
        "Applications are reviewed on a rolling basis. You'll receive an email notification about your application status within 2-3 weeks of submission.",
    },
    {
      question: "How are recipients selected?",
      answer:
        "JAMB recipients are selected based on academic potential, and commitment. Tertiary recipients are ranked by CGPA, achievements, financial need, and extracurricular activities.",
    },
    {
      question: "Can I apply for both programs?",
      answer:
        "No, you can only apply for one category - either JAMB support or Tertiary scholarship, depending on your current educational status.",
    },
  ];

  return (
    <Box>
      {/* Navigation Bar */}
      <AppBar position="sticky" sx={{ backgroundColor: OrganizationColors.green }}>
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <Box sx={{ backgroundColor: "#fff", p: 0.5, borderRadius: 1, mr: 2 }}>
              <JustLogo />
            </Box>
            <Typography variant="h6" component="div" sx={{ display: { xs: "none", sm: "block" } }}>
              Education Impact 2026
            </Typography>
          </Box>

          {isMobile ? (
            <>
              <IconButton color="inherit" aria-label="open drawer" edge="end" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
                  <List>
                    {navigationItems.map((item) => (
                      <ListItem key={item.label} disablePadding>
                        <ListItemButton onClick={item.action}>
                          <ListItemText primary={item.label} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button color="inherit" onClick={() => customHistory.push(ROUTES.home)}>
                <HomeOutlined sx={{ mr: 1 }} /> Home
              </Button>
              {navigationItems.slice(1).map((item) => (
                <Button key={item.label} color="inherit" onClick={item.action}>
                  {item.label}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          minHeight: { xs: "60vh", md: "70vh" },
          display: "flex",
          alignItems: "center",
          background: `linear-gradient(135deg, ${OrganizationColors.green} 0%, ${OrganizationColors.deepYellow} 100%)`,
          color: "#fff",
          textAlign: "center",
          py: { xs: 6, md: 10 },
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M50 0L61.8 38.2H100L69.1 61.8L80.9 100L50 76.4L19.1 100L30.9 61.8L0 38.2H38.2z" fill="white" fill-opacity="0.05"/%3E%3C/svg%3E")',
            backgroundSize: "100px 100px",
            animation: "float 20s ease-in-out infinite",
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <EmojiEventsOutlined sx={{ fontSize: { xs: 60, md: 80 }, mb: 2 }} />
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
              mb: 2,
            }}
          >
            Education Impact Project 2026
          </Typography>
          <Typography
            variant="h5"
            component="p"
            sx={{
              mb: 4,
              fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" },
              maxWidth: "900px",
              mx: "auto",
              fontWeight: 400,
              opacity: 0.95,
            }}
          >
            CYON Empowering Tomorrow's Leaders Through Education - Supporting JAMB Candidates and Tertiary Students
          </Typography>

          {campaign && campaign.isOpen && (
            <Box sx={{ mb: 4 }}>
              <Chip
                icon={<CheckCircleOutline />}
                label="Applications Open"
                color="success"
                sx={{
                  fontSize: "1rem",
                  py: 2.5,
                  px: 2,
                  backgroundColor: "#4caf50",
                  color: "#fff",
                  fontWeight: 600,
                }}
              />
            </Box>
          )}

          {campaign && !campaign.isOpen && (
            <Box sx={{ mb: 4 }}>
              <Chip
                label="Applications Closed"
                sx={{
                  fontSize: "1rem",
                  py: 2.5,
                  px: 2,
                  backgroundColor: "#f44336",
                  color: "#fff",
                  fontWeight: 600,
                }}
              />
            </Box>
          )}

          {!campaign && (
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              No active campaign at the moment. Check back soon!
            </Typography>
          )}
        </Container>
      </Box>

      {/* Countdown Timer */}
      {campaign && campaign.isOpen && (
        <Box sx={{ py: 4, backgroundColor: "#f5f5f5" }}>
          <Container maxWidth="md">
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                <AccessTime sx={{ mr: 1, verticalAlign: "middle" }} />
                Application Deadline
              </Typography>
              <Grid container spacing={2} justifyContent="center">
                {[
                  { value: timeLeft.days, label: "Days" },
                  { value: timeLeft.hours, label: "Hours" },
                  { value: timeLeft.minutes, label: "Minutes" },
                  { value: timeLeft.seconds, label: "Seconds" },
                ].map((item, index) => (
                  <Grid item xs={6} sm={3} key={index}>
                    <Card
                      sx={{
                        backgroundColor: OrganizationColors.green,
                        color: "#fff",
                        py: 2,
                      }}
                    >
                      <Typography variant="h3" sx={{ fontWeight: 700 }}>
                        {item.value}
                      </Typography>
                      <Typography variant="body1">{item.label}</Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
                Closes on {new Date(campaign.closeDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
            </Box>
          </Container>
        </Box>
      )}

      {/* Program Cards Section */}
      <Box id="features" sx={{ py: { xs: 6, md: 10 }, backgroundColor: "#fff" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" },
            }}
          >
            Choose Your Path
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            sx={{ mb: 6, fontSize: { xs: "1rem", md: "1.25rem" } }}
          >
            We offer support for two categories of applicants
          </Typography>

          <Grid container spacing={4}>
            {/* JAMB Card */}
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  border: `3px solid ${OrganizationColors.green}`,
                  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 8,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 4 }}>
                  <Box sx={{ textAlign: "center", mb: 3 }}>
                    <MenuBookOutlined
                      sx={{
                        fontSize: 80,
                        color: OrganizationColors.green,
                        mb: 2,
                      }}
                    />
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                      JAMB Support
                    </Typography>
                    <Chip
                      label={campaign ? `${calculateSlotsRemaining(campaign.maxJambApplicants, campaign.totalJambApplications)} / ${campaign.maxJambApplicants} Slots Available` : "7 Slots"}
                      color="primary"
                      sx={{ mb: 2 }}
                    />
                  </Box>

                  {campaign && (
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Application Progress
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={getProgressPercentage(campaign.maxJambApplicants, campaign.totalJambApplications)}
                        sx={{
                          height: 10,
                          borderRadius: 5,
                          backgroundColor: "#e0e0e0",
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: OrganizationColors.green,
                          },
                        }}
                      />
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>
                        {campaign.totalJambApplications} applications received
                      </Typography>
                    </Box>
                  )}

                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: OrganizationColors.green }}>
                    Benefits:
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    {[
                      "JAMB UTME Registration",
                      "Study Materials & Past Questions",
                      campaign ? formatCurrency(campaign.jambSupportAmount) : "Financial Support",
                      "Mentorship & Guidance",
                    ].map((benefit, index) => (
                      <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                        <CheckCircleOutline sx={{ color: OrganizationColors.green, mr: 1 }} />
                        <Typography variant="body1">{benefit}</Typography>
                      </Box>
                    ))}
                  </Box>

                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
                    Eligibility:
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    • Age: 14-35 years
                    <br />
                    • Preparing for UTME
                    <br />
                    • Demonstrated financial need
                    <br />• Strong academic potential
                  </Typography>

                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={!campaign || !campaign.isOpen}
                    sx={{
                      mt: 3,
                      backgroundColor: OrganizationColors.green,
                      color: "#fff",
                      py: 1.5,
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      "&:hover": { backgroundColor: "rgb(0, 128, 40)" },
                      "&:disabled": {
                        backgroundColor: "#ccc",
                        color: "#666",
                      },
                    }}
                    onClick={() => customHistory.push(ROUTES.educationImpactJambApplication)}
                  >
                    {campaign && campaign.isOpen ? "Apply for JAMB Support" : "Applications Closed"}
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            {/* Tertiary Card */}
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  border: `3px solid ${OrganizationColors.deepYellow}`,
                  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 8,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 4 }}>
                  <Box sx={{ textAlign: "center", mb: 3 }}>
                    <SchoolOutlined
                      sx={{
                        fontSize: 80,
                        color: OrganizationColors.deepYellow,
                        mb: 2,
                      }}
                    />
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                      Tertiary Scholarship
                    </Typography>
                    <Chip
                      label="Top 3 Students"
                      sx={{
                        mb: 2,
                        backgroundColor: OrganizationColors.deepYellow,
                        color: "#fff",
                      }}
                    />
                  </Box>

                  {campaign && (
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Total Applications
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: OrganizationColors.deepYellow }}>
                          {campaign.totalTertiaryApplications}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          applicants competing
                        </Typography>
                      </Box>
                    </Box>
                  )}

                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: OrganizationColors.deepYellow }}>
                    Benefits:
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    {[
                      campaign ? `${formatCurrency(campaign.tertiarySupportAmount)} Tuition Support` : "₦100,000 Tuition Support",
                      "Academic Excellence Recognition",
                      "Leadership Development",
                      "Networking Opportunities",
                    ].map((benefit, index) => (
                      <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                        <CheckCircleOutline sx={{ color: OrganizationColors.deepYellow, mr: 1 }} />
                        <Typography variant="body1">{benefit}</Typography>
                      </Box>
                    ))}
                  </Box>

                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
                    Eligibility:
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    • 200 level and above
                    <br />
                    • Minimum CGPA requirement
                    <br />
                    • Nigerian university student
                    <br />• Academic & extracurricular excellence
                  </Typography>

                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={!campaign || !campaign.isOpen}
                    sx={{
                      mt: 3,
                      backgroundColor: OrganizationColors.deepYellow,
                      color: "#fff",
                      py: 1.5,
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      "&:hover": { backgroundColor: "rgb(130, 94, 13)" },
                      "&:disabled": {
                        backgroundColor: "#ccc",
                        color: "#666",
                      },
                    }}
                    onClick={() => customHistory.push(ROUTES.educationImpactTertiaryApplication)}
                  >
                    {campaign && campaign.isOpen ? "Apply for Scholarship" : "Applications Closed"}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box id="how-it-works" sx={{ py: { xs: 6, md: 10 }, backgroundColor: "#f5f5f5" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 700,
              mb: 6,
              fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" },
            }}
          >
            How It Works
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                step: "1",
                title: "Check Eligibility",
                description: "Review the requirements for your category and ensure you meet all criteria.",
              },
              {
                step: "2",
                title: "Prepare Documents",
                description: "Gather all required documents including passport photo, ID, and academic records.",
              },
              {
                step: "3",
                title: "Complete Application",
                description: "Fill out the online application form carefully with accurate information.",
              },
              {
                step: "4",
                title: "Review Process",
                description: "Our team reviews all applications based on merit, need, and eligibility.",
              },
              {
                step: "5",
                title: "Notification",
                description: "Successful applicants will be notified via email and phone.",
              },
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    textAlign: "center",
                    p: 3,
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      backgroundColor: OrganizationColors.green,
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "2rem",
                      fontWeight: 700,
                      mx: "auto",
                      mb: 2,
                    }}
                  >
                    {item.step}
                  </Box>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box id="faq" sx={{ py: { xs: 6, md: 10 }, backgroundColor: "#fff" }}>
        <Container maxWidth="md">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 700,
              mb: 6,
              fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" },
            }}
          >
            Frequently Asked Questions
          </Typography>

          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              sx={{
                mb: 2,
                "&:before": { display: "none" },
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" color="text.secondary">
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Box>

      {/* Call to Action */}
      {campaign && campaign.isOpen && (
        <Box
          sx={{
            py: { xs: 6, md: 10 },
            background: `linear-gradient(135deg, ${OrganizationColors.deepYellow} 0%, ${OrganizationColors.green} 100%)`,
            color: "#fff",
            textAlign: "center",
          }}
        >
          <Container maxWidth="md">
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: 700,
                fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" },
                mb: 3,
              }}
            >
              Ready to Transform Your Future?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: 4,
                fontSize: { xs: "1rem", md: "1.25rem" },
                opacity: 0.95,
              }}
            >
              Don't miss this opportunity to receive support for your educational journey. Apply today!
            </Typography>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: "#fff",
                  color: OrganizationColors.green,
                  px: 5,
                  py: 2,
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  "&:hover": { backgroundColor: "#f0f0f0" },
                }}
                onClick={() => customHistory.push(ROUTES.educationImpactJambApplication)}
              >
                Apply for JAMB
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: "#fff",
                  borderWidth: 2,
                  color: "#fff",
                  px: 5,
                  py: 2,
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  "&:hover": {
                    borderColor: "#fff",
                    borderWidth: 2,
                    backgroundColor: "rgba(255,255,255,0.2)",
                  },
                }}
                onClick={() => customHistory.push(ROUTES.educationImpactTertiaryApplication)}
              >
                Apply for Tertiary
              </Button>
            </Box>
          </Container>
        </Box>
      )}

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 4,
          backgroundColor: "#2c3e50",
          color: "#ecf0f1",
          textAlign: "center",
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body1" sx={{ mb: 1 }}>
            © {new Date().getFullYear()} CYON Education Impact Project. All rights reserved.
          </Typography>
          <Typography variant="body2" color="inherit" sx={{ opacity: 0.8 }}>
            For God and For Youth... Through Christ!
          </Typography>
        </Container>
      </Box>
    </Box>
  );
});

export default EducationImpactLanding;
