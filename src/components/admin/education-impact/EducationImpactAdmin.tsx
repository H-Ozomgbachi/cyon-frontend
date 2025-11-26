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
  Tabs,
  Tab,
  IconButton,
  Divider,
} from "@mui/material";
import {
  SchoolOutlined,
  MenuBookOutlined,
  PendingActionsOutlined,
  CheckCircleOutlined,
  CancelOutlined,
  AddCircleOutline,
  BarChartOutlined,
  ArrowBack,
} from "@mui/icons-material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";
import { customHistory } from "../../..";
import { ROUTES } from "../../../routes";
import { OrganizationColors } from "../../../colors";
import CampaignManagement from "./CampaignManagement";
import JambApplicationsList from "./JambApplicationsList";
import TertiaryApplicationsList from "./TertiaryApplicationsList";
import HeaderNav from "../../shared/header-nav";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const EducationImpactAdmin = observer(() => {
  const { educationImpactStore } = useStore();
  const [activeTab, setActiveTab] = useState(0);
  const [stats, setStats] = useState({
    totalJamb: 0,
    pendingJamb: 0,
    approvedJamb: 0,
    rejectedJamb: 0,
    totalTertiary: 0,
    pendingTertiary: 0,
    approvedTertiary: 0,
    rejectedTertiary: 0,
  });

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      const campaign = await educationImpactStore.getActiveCampaign();
      if (campaign) {
        const campaignStats = await educationImpactStore.getCampaignStatistics(campaign.id);
        setStats({
          totalJamb: campaignStats.totalJambApplications,
          pendingJamb: campaignStats.pendingJambApplications,
          approvedJamb: campaignStats.approvedJambApplications,
          rejectedJamb: campaignStats.rejectedJambApplications,
          totalTertiary: campaignStats.totalTertiaryApplications,
          pendingTertiary: campaignStats.pendingTertiaryApplications,
          approvedTertiary: campaignStats.approvedTertiaryApplications,
          rejectedTertiary: campaignStats.rejectedTertiaryApplications,
        });
      }
    } catch (error) {
      console.error("Failed to load statistics");
    }
  };

  const StatCard = ({ title, value, icon, color }: any) => (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, color }}>
              {value}
            </Typography>
          </Box>
          <Box sx={{ color, opacity: 0.3, fontSize: 48 }}>{icon}</Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <HeaderNav />
      <Divider />
      
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton 
            onClick={() => customHistory.push(ROUTES.adminPanel)}
            sx={{ 
              color: OrganizationColors.green,
              "&:hover": { backgroundColor: "rgba(0, 148, 50, 0.1)" }
            }}
          >
            <ArrowBack />
          </IconButton>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Education Impact Administration
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage campaigns, review applications, and track statistics
            </Typography>
          </Box>
        </Box>

      {/* Statistics Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total JAMB Applications"
            value={stats.totalJamb}
            icon={<MenuBookOutlined />}
            color={OrganizationColors.green}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending JAMB Reviews"
            value={stats.pendingJamb}
            icon={<PendingActionsOutlined />}
            color="#ff9800"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Tertiary Applications"
            value={stats.totalTertiary}
            icon={<SchoolOutlined />}
            color={OrganizationColors.deepYellow}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending Tertiary Reviews"
            value={stats.pendingTertiary}
            icon={<PendingActionsOutlined />}
            color="#ff9800"
          />
        </Grid>
      </Grid>

      {/* Quick Stats Cards */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: `${OrganizationColors.green}15` }}>
            <CardContent sx={{ textAlign: "center" }}>
              <CheckCircleOutlined sx={{ fontSize: 40, color: OrganizationColors.green, mb: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {stats.approvedJamb}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                JAMB Approved
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: "#f4433615" }}>
            <CardContent sx={{ textAlign: "center" }}>
              <CancelOutlined sx={{ fontSize: 40, color: "#f44336", mb: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {stats.rejectedJamb}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                JAMB Rejected
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: `${OrganizationColors.deepYellow}15` }}>
            <CardContent sx={{ textAlign: "center" }}>
              <CheckCircleOutlined sx={{ fontSize: 40, color: OrganizationColors.deepYellow, mb: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {stats.approvedTertiary}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tertiary Approved
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: "#f4433615" }}>
            <CardContent sx={{ textAlign: "center" }}>
              <CancelOutlined sx={{ fontSize: 40, color: "#f44336", mb: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {stats.rejectedTertiary}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tertiary Rejected
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content Tabs */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab label="Campaigns" />
            <Tab label="JAMB Applications" />
            <Tab label="Tertiary Applications" />
          </Tabs>
        </Box>

        <TabPanel value={activeTab} index={0}>
          <CampaignManagement onCampaignChange={loadStatistics} />
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <JambApplicationsList onReviewComplete={loadStatistics} />
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <TertiaryApplicationsList onReviewComplete={loadStatistics} />
        </TabPanel>
      </Card>
      </Container>
    </Box>
  );
});

export default EducationImpactAdmin;
