import { UserModel } from "./authentication";

export interface DeactivateAccountRequest {
  reason: string;
}

export interface GenerateRandomGroupDto {
  groupTitles: string[];
  numberOfUsersPerGroup: number;
}

export interface RandomGroupsModel {
  groupTitle: string;
  members: UserModel[];
}

export interface NumberOfActiveUsers {
  numberOfActiveUsers: number;
}

export interface AccountDeactivateRequestModel {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  reasonToDeactivate: string;
  phone: string;
}
