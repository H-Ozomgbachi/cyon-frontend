export const ROUTES = {
  myAccount: "/account",
  dashboard: "/dashboard",
  home: "/",
  adminPanel: "/admin",
  setupAdmin: "/admin/setup",
  accountMgtAdmin: "/admin/account-management",
  notifications: "/admin/notifications",
  login: "/account/login",
  register: "/account/register",
  forgotPassword: "/account/forgot-password",
  resetPassword: "/account/reset-password",
  confirmEmail: "/account/confirm-email",
  
  // Education Impact Routes
  educationImpact: "/education-impact",
  educationImpactJambApplication: "/education-impact/apply/jamb",
  educationImpactTertiaryApplication: "/education-impact/apply/tertiary",
  educationImpactApplicationSuccess: "/education-impact/application-success",
  
  // Admin Education Impact Routes
  educationImpactAdmin: "/admin/education-impact",
  educationImpactCampaigns: "/admin/education-impact/campaigns",
  educationImpactCreateCampaign: "/admin/education-impact/campaigns/new",
  educationImpactEditCampaign: "/admin/education-impact/campaigns/edit",
  educationImpactCampaignStatistics: "/admin/education-impact/campaigns/statistics",
  educationImpactJambApplications: "/admin/education-impact/jamb",
  educationImpactJambApplicationDetail: "/admin/education-impact/jamb/detail",
  educationImpactTertiaryApplications: "/admin/education-impact/tertiary",
  educationImpactTertiaryApplicationDetail: "/admin/education-impact/tertiary/detail",
  educationImpactTopApplicants: "/admin/education-impact/tertiary/top",

  // Election Routes
  elections: "/elections",
  electionVote: "/elections/vote",
  electionResults: "/elections/results",

  // Admin Election Routes
  electionsAdmin: "/admin/elections",
  electionBuilder: "/admin/elections/builder",
};
