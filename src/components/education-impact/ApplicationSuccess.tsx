import React from "react";
import { Box, Container, Typography, Button, Card, CardContent, Chip } from "@mui/material";
import { CheckCircleOutline, HomeOutlined, EmailOutlined } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { customHistory } from "../..";
import { ROUTES } from "../../routes";
import { OrganizationColors } from "../../colors";

const ApplicationSuccess: React.FC = () => {
  const { id: applicationId } = useParams<{ id: string }>();

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Card
        sx={{
          textAlign: "center",
          p: { xs: 3, md: 6 },
          background: `linear-gradient(135deg, ${OrganizationColors.green}15 0%, ${OrganizationColors.deepYellow}15 100%)`,
        }}
      >
        <CardContent>
          <CheckCircleOutline
            sx={{
              fontSize: 120,
              color: OrganizationColors.green,
              mb: 3,
            }}
          />
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, color: OrganizationColors.green }}>
            Application Submitted Successfully!
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Thank you for applying to the CYON Education Impact Project 2026
          </Typography>

          {applicationId && (
            <Chip
              label={`Reference ID: ${applicationId.substring(0, 8).toUpperCase()}`}
              sx={{
                fontSize: "1rem",
                py: 2.5,
                px: 2,
                mb: 4,
                backgroundColor: OrganizationColors.deepYellow,
                color: "#fff",
                fontWeight: 600,
              }}
            />
          )}

          <Box
            sx={{
              backgroundColor: "#fff",
              borderRadius: 2,
              p: 3,
              mb: 4,
              textAlign: "left",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: "flex", alignItems: "center" }}>
              <EmailOutlined sx={{ mr: 1, color: OrganizationColors.green }} />
              What Happens Next?
            </Typography>
            <Box component="ul" sx={{ pl: 2 }}>
              <li>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Our team will carefully review your application based on eligibility, merit, and need.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Successful applicants will be notified via email or phone.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  Please check your email (including spam folder) regularly for updates.
                </Typography>
              </li>
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<HomeOutlined />}
              sx={{
                backgroundColor: OrganizationColors.green,
                color: "#fff",
                px: 4,
                py: 1.5,
                "&:hover": { backgroundColor: "rgb(0, 128, 40)" },
              }}
              onClick={() => customHistory.push(ROUTES.home)}
            >
              Return Home
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: OrganizationColors.green,
                color: OrganizationColors.green,
                px: 4,
                py: 1.5,
                "&:hover": {
                  borderColor: OrganizationColors.green,
                  backgroundColor: `${OrganizationColors.green}10`,
                },
              }}
              onClick={() => customHistory.push(ROUTES.educationImpact)}
            >
              View Program Details
            </Button>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
            For inquiries, please contact us through any CYON executive in the Parish.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ApplicationSuccess;
