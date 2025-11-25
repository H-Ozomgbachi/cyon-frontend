// Campaign Models
export interface CampaignModel {
  id: string;
  title: string;
  description: string;
  openDate: string;
  closeDate: string;
  isActive: boolean;
  isOpen: boolean;
  maxJambApplicants: number;
  maxTertiaryApplicants: number;
  jambSupportAmount: number;
  tertiarySupportAmount: number;
  additionalNotes: string;
  dateAdded: string;
  createdBy: string;
  totalJambApplications: number;
  totalTertiaryApplications: number;
}

export interface CampaignStatisticsModel {
  campaignId: string;
  campaignTitle: string;
  totalJambApplications: number;
  pendingJambApplications: number;
  approvedJambApplications: number;
  rejectedJambApplications: number;
  totalTertiaryApplications: number;
  pendingTertiaryApplications: number;
  approvedTertiaryApplications: number;
  rejectedTertiaryApplications: number;
  isOpen: boolean;
  openDate: string;
  closeDate: string;
}

export interface CreateCampaignDto {
  title: string;
  description: string;
  openDate: string;
  closeDate: string;
  maxJambApplicants: number;
  maxTertiaryApplicants: number;
  jambSupportAmount: number;
  tertiarySupportAmount: number;
  additionalNotes?: string;
}

export interface UpdateCampaignDto extends CreateCampaignDto {
  id: string;
}

// JAMB Application Models
export interface CreateJambApplicationDto {
  campaignId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  address: string;
  stateOfOrigin: string;
  lga: string;
  intendedCourse: string;
  firstChoiceInstitution: string;
  secondChoiceInstitution: string;
  jambSubjectCombination: string;
  passportPhotoUrl?: string;
  identificationDocumentUrl?: string;
  whyYouDeserveSupport: string;
  familyBackgroundInfo?: string;
  guardianName?: string;
  guardianPhoneNumber?: string;
}

export interface JambApplicantModel extends CreateJambApplicationDto {
  id: string;
  campaignTitle: string;
  applicationStatus: 'Pending' | 'Approved' | 'Rejected';
  reviewNotes: string;
  reviewedBy: string;
  reviewedDate: string | null;
  dateAdded: string;
}

// Tertiary Application Models
export interface CreateTertiaryApplicationDto {
  campaignId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  address: string;
  stateOfOrigin: string;
  lga: string;
  institution: string;
  courseOfStudy: string;
  department: string;
  faculty: string;
  currentLevel: 200 | 300 | 400 | 500 | 600 | 700;
  matricNumber: string;
  studentIdCardUrl?: string;
  currentCGPA: number;
  previousSessionCGPA: number;
  academicTranscriptUrl?: string;
  passportPhotoUrl?: string;
  admissionLetterUrl?: string;
  whyYouDeserveSupport: string;
  academicAchievements?: string;
  extracurricularActivities?: string;
  financialNeedStatement?: string;
}

export interface TertiaryApplicantModel extends CreateTertiaryApplicationDto {
  id: string;
  campaignTitle: string;
  applicationStatus: 'Pending' | 'Approved' | 'Rejected';
  reviewNotes: string;
  reviewedBy: string;
  reviewedDate: string | null;
  rankingScore: number;
  dateAdded: string;
}

// Review Models
export interface ReviewApplicationDto {
  applicationId: string;
  applicationStatus: 'Approved' | 'Rejected';
  reviewNotes: string;
  rankingScore?: number; // Only for tertiary applications
}
