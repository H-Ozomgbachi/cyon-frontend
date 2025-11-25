import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import {
  Groups2Outlined,
  FeedOutlined,
  AccountBalanceOutlined,
  AutoStoriesOutlined,
  EventAvailableOutlined,
  NotificationsActiveOutlined,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { customHistory } from "../..";
import { ROUTES } from "../../routes";
import { OrganizationColors } from "../../colors";
import "./LandingPage.css";
import { JustLogo } from "../shared/organization-title/OrganizationTitle";
import UpcomingEventsSection from "./UpcomingEventsSection";
import { observer } from "mobx-react-lite";
import { useStore } from "../../api/main/appStore";
import { CampaignModel } from "../../api/models/educationImpact";

const LandingPage = observer(() => {
  const { educationImpactStore } = useStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [activeCampaign, setActiveCampaign] = useState<CampaignModel | null>(null);

  useEffect(() => {
    // Load active campaign on component mount
    const loadActiveCampaign = async () => {
      try {
        const campaign = await educationImpactStore.getActiveCampaign();
        setActiveCampaign(campaign);
      } catch (error) {
        // No active campaign, keep it null
        setActiveCampaign(null);
      }
    };
    loadActiveCampaign();
  }, [educationImpactStore]);

  const features = [
    {
      icon: <FeedOutlined sx={{ fontSize: 48, color: OrganizationColors.green }} />,
      title: "Stay Connected",
      description: "Get real-time updates, announcements, and news from our organization.",
    },
    {
      icon: <AutoStoriesOutlined sx={{ fontSize: 48, color: OrganizationColors.deepYellow }} />,
      title: "Track Attendance",
      description: "Easily mark and monitor attendance for all meetings and events.",
    },
    {
      icon: <Groups2Outlined sx={{ fontSize: 48, color: OrganizationColors.green }} />,
      title: "Manage Meetings",
      description: "Schedule, organize, and participate in meetings with ease.",
    },
    {
      icon: <AccountBalanceOutlined sx={{ fontSize: 48, color: OrganizationColors.deepYellow }} />,
      title: "Financial Management",
      description: "Keep track of personal and organizational finances transparently.",
    },
    {
      icon: <EventAvailableOutlined sx={{ fontSize: 48, color: OrganizationColors.green }} />,
      title: "Event Planning",
      description: "Stay informed about upcoming events and activities.",
    },
    {
      icon: <NotificationsActiveOutlined sx={{ fontSize: 48, color: OrganizationColors.deepYellow }} />,
      title: "Instant Notifications",
      description: "Never miss important updates with real-time notifications.",
    },
  ];

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
    { label: "Home", action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
    { label: "Features", action: () => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" }) },
    { label: "Login", action: () => customHistory.push(ROUTES.login) },
    { label: "Register", action: () => customHistory.push(ROUTES.register) },
  ];

  // Get the campaign year from the openDate
  const getCampaignYear = () => {
    if (activeCampaign?.openDate) {
      return new Date(activeCampaign.openDate).getFullYear();
    }
    return new Date().getFullYear();
  };

  return (
    <Box className="landing-page">
      {/* Navigation Bar */}
      <AppBar position="sticky" sx={{ backgroundColor: OrganizationColors.deepYellow }}>
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <Box sx={{ backgroundColor: "#fff", p: 0.5, borderRadius: 1, mr: 2 }}>
              <JustLogo />
            </Box>
            <Typography variant="h6" component="div" sx={{ display: { xs: "none", sm: "block" } }}>
              CYON
            </Typography>
          </Box>

          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
              >
                <Box
                  sx={{ width: 250 }}
                  role="presentation"
                  onClick={toggleDrawer(false)}
                  onKeyDown={toggleDrawer(false)}
                >
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
              <Button color="inherit" onClick={navigationItems[1].action}>
                Features
              </Button>
              <Button color="inherit" onClick={() => customHistory.push(ROUTES.login)}>
                Login
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#fff",
                  color: OrganizationColors.deepYellow,
                  "&:hover": { backgroundColor: "#f0f0f0" },
                }}
                onClick={() => customHistory.push(ROUTES.register)}
              >
                Register
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box className="hero-section" sx={{ 
        minHeight: { xs: "70vh", md: "80vh" },
        display: "flex",
        alignItems: "center",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${require("../../assets/img/church_altar.jpg")})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "#fff",
        textAlign: "center",
        py: { xs: 6, md: 10 },
      }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
              mb: 3,
              textShadow: "2px 2px 8px rgba(0, 0, 0, 0.9)",
              color: "#fff",
            }}
          >
            Welcome to CYON
          </Typography>
          <Typography
            variant="h5"
            component="p"
            sx={{
              mb: 5,
              fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
              maxWidth: "800px",
              mx: "auto",
              fontWeight: 400,
              textShadow: "1px 1px 6px rgba(0, 0, 0, 0.9)",
              lineHeight: 1.6,
              color: "#fff",
            }}
          >
            This is the official website of the Catholic Youth Organization of Nigeria, SS. Peter &amp; Paul, Shomolu. Empowering youth through faith, community, and service.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: OrganizationColors.deepYellow,
                color: "#fff",
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: 600,
                "&:hover": { backgroundColor: "rgb(130, 94, 13)" },
              }}
              onClick={() => customHistory.push(ROUTES.register)}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: "#fff",
                borderWidth: 2,
                color: "#fff",
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: 600,
                "&:hover": { 
                  borderColor: "#fff",
                  borderWidth: 2,
                  backgroundColor: "rgba(255,255,255,0.2)"
                },
              }}
              onClick={() => customHistory.push(ROUTES.login)}
            >
              Login
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Box id="features" className="features-section" sx={{ py: { xs: 6, md: 10 }, backgroundColor: "#f5f5f5" }}>
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
            Features & Benefits
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            sx={{ mb: 6, fontSize: { xs: "1rem", md: "1.25rem" } }}
          >
            Everything you need to manage your relationship with CYON effectively.
          </Typography>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  className={index % 2 === 0 ? "floating-shape" : ""}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: "center", p: 4 }}>
                    <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                    <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Education Impact Section - Only show when there's an active campaign */}
      {activeCampaign && activeCampaign.isOpen && (
        <Box
          sx={{
            py: { xs: 6, md: 10 },
            background: `linear-gradient(135deg, ${OrganizationColors.green} 0%, ${OrganizationColors.deepYellow} 100%)`,
            color: "#fff",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={7}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <AutoStoriesOutlined sx={{ fontSize: 40, mr: 2 }} />
                  <Typography variant="h3" component="h2" sx={{ fontWeight: 700, fontSize: { xs: "1.75rem", sm: "2.5rem" } }}>
                    {activeCampaign.title}
                  </Typography>
                </Box>
                <Typography variant="h5" sx={{ mb: 3, opacity: 0.95, fontWeight: 400, lineHeight: 1.6 }}>
                  Transform Your Educational Journey with Our Scholarship Program
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, fontSize: "1.1rem", lineHeight: 1.8, opacity: 0.9 }}>
                  {activeCampaign.description || "We're investing in the next generation of leaders! Apply now for:"}
                </Typography>
                <Grid container spacing={2} sx={{ mb: 4 }}>
                  <Grid item xs={12} sm={6}>
                    <Card sx={{ backgroundColor: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)" }}>
                      <CardContent sx={{ color: "#fff" }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: "flex", alignItems: "center" }}>
                          📚 JAMB Support
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                          {activeCampaign.maxJambApplicants} slots available for JAMB candidates
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1, fontWeight: 600 }}>
                          ✓ Registration fees covered
                          <br />
                          ✓ Study materials provided
                          <br />
                          ✓ Mentorship included
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Card sx={{ backgroundColor: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)" }}>
                      <CardContent sx={{ color: "#fff" }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: "flex", alignItems: "center" }}>
                          🎓 Tertiary Scholarship
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                          Top {activeCampaign.maxTertiaryApplicants} students receive scholarships
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1, fontWeight: 600 }}>
                          ✓ ₦{activeCampaign.tertiarySupportAmount.toLocaleString()} tuition support
                          <br />
                          ✓ Based on academic merit
                          <br />
                          ✓ Recognition & awards
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      backgroundColor: "#fff",
                      color: OrganizationColors.green,
                      px: 4,
                      py: 1.5,
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      "&:hover": { backgroundColor: "#f0f0f0", transform: "translateY(-2px)" },
                      transition: "all 0.3s",
                    }}
                    onClick={() => customHistory.push(ROUTES.educationImpact)}
                  >
                    Apply Now
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: "#fff",
                      borderWidth: 2,
                      color: "#fff",
                      px: 4,
                      py: 1.5,
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      "&:hover": {
                        borderColor: "#fff",
                        borderWidth: 2,
                        backgroundColor: "rgba(255,255,255,0.2)",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s",
                    }}
                    onClick={() => customHistory.push(ROUTES.educationImpact)}
                  >
                    View Details
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={5}>
                <Box
                  sx={{
                    position: "relative",
                    textAlign: "center",
                    p: 4,
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: 200, md: 300 },
                      height: { xs: 200, md: 300 },
                      borderRadius: "50%",
                      backgroundColor: "rgba(255,255,255,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      position: "relative",
                      animation: "pulse 2s ease-in-out infinite",
                      "@keyframes pulse": {
                        "0%, 100%": { transform: "scale(1)" },
                        "50%": { transform: "scale(1.05)" },
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: 160, md: 240 },
                        height: { xs: 160, md: 240 },
                        borderRadius: "50%",
                        backgroundColor: "rgba(255,255,255,0.3)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <EventAvailableOutlined sx={{ fontSize: { xs: 60, md: 80 }, mb: 2 }} />
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {getCampaignYear()}
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        Applications Open
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}

      {/* Upcoming Events Section */}
      <UpcomingEventsSection />

      {/* About Us Section with Group Photo */}
      <Box
        sx={{
          py: { xs: 6, md: 10 },
          backgroundColor: "#fff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
            <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
              <Typography
                variant="h3"
                component="h2"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" },
                  color: OrganizationColors.deepYellow,
                  mb: 3,
                }}
              >
                About CYON
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mb: 3,
                  color: "text.primary",
                  lineHeight: 1.8,
                  fontWeight: 500,
                }}
              >
                Catholic Youth Organization of Nigeria (CYON)
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 3,
                  color: "text.secondary",
                  lineHeight: 1.8,
                  fontSize: "1.1rem",
                }}
              >
                We are a vibrant community of young Catholics dedicated to spiritual growth, 
                fellowship, and service to God and humanity. Our organization brings together 
                passionate youth who are committed to living out their faith through active 
                participation, community engagement, and continuous development.
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" sx={{ mb: 2, display: "flex", alignItems: "flex-start" }}>
                  <Box
                    component="span"
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: OrganizationColors.deepYellow,
                      mr: 2,
                      mt: 1,
                      flexShrink: 0,
                    }}
                  />
                  <span>
                    <strong>Our Mission:</strong> To nurture young Catholics in their faith journey 
                    and empower them to be active witnesses of Christ in their communities.
                  </span>
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, display: "flex", alignItems: "flex-start" }}>
                  <Box
                    component="span"
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: OrganizationColors.deepYellow,
                      mr: 2,
                      mt: 1,
                      flexShrink: 0,
                    }}
                  />
                  <span>
                    <strong>Our Vision:</strong> Building a generation of spiritually mature, 
                    socially responsible, and morally upright young Catholics.
                  </span>
                </Typography>
                <Typography variant="body1" sx={{ display: "flex", alignItems: "flex-start" }}>
                  <Box
                    component="span"
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: OrganizationColors.deepYellow,
                      mr: 2,
                      mt: 1,
                      flexShrink: 0,
                    }}
                  />
                  <span>
                    <strong>Our Values:</strong> Faith, Unity, Service, Excellence, and Accountability 
                    in all our endeavors.
                  </span>
                </Typography>
              </Box>
              <Button
                variant="contained"
                size="large"
                sx={{
                  mt: 2,
                  backgroundColor: OrganizationColors.deepYellow,
                  color: "#fff",
                  px: 4,
                  py: 1.5,
                  "&:hover": { backgroundColor: OrganizationColors.green },
                }}
                onClick={() => customHistory.push(ROUTES.register)}
              >
                Join Our Community
              </Button>
            </Grid>
            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
              <Box
                component="img"
                src={require("../../assets/img/group-photo.jpg")}
                alt="CYON Community Group Photo"
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 4,
                  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
                  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: "0 25px 70px rgba(0, 0, 0, 0.4)",
                  },
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box
        className="cta-section"
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
            Ready to Get Started?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              fontSize: { xs: "1rem", md: "1.25rem" },
              opacity: 0.95,
            }}
          >
            There is no better time than now to join CYON and be part of a vibrant community of faith and service.
          </Typography>
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
            onClick={() => customHistory.push(ROUTES.register)}
          >
            Sign Up Now
          </Button>
        </Container>
      </Box>

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
            © {new Date().getFullYear()} CYON. All rights reserved.
          </Typography>
          <Typography variant="body2" color="inherit" sx={{ opacity: 0.8 }}>
            For God and For Youth... Through Christ
          </Typography>
        </Container>
      </Box>
    </Box>
  );
});

export default LandingPage;
