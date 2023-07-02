export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginSuccess {
  message: string;
  token: string;
}

export interface UserModel {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  photoUrl: string;
  roles: string[];
  phoneNumber: string;
  gender: string;
  isCommunicant: boolean;
  department: {
    id: string;
    name: string;
  };
  rank: string;
  address: string;
  uniqueCode: string;
}

export interface UpdateMyAccountPayload {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  phoneNumber: string;
  gender: string;
  isCommunicant: boolean;
  address: string;
}

export interface RegisterMyAccountPayload {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  phoneNumber: string;
  departmentId: string;
  dateOfBirth: string;
  gender: string;
  isCommunicant: boolean;
  address: string;
}
