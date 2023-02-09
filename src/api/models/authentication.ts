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
}
