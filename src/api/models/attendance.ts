export interface AttendanceModel {
  attendanceTypeId: string;
  attendanceTypeName: string;
  dateAdded: string;
  userId: string;
  userEmail: string;
  isPresent: boolean;
  rating: number;
}

export interface ApologyModel {
  id: string;
  for: string;
  attendanceTypeId: string;
  date: string;
  reason: string;
  isRejected: boolean;
  rejectionReason: string;
  isResolved: boolean;
  userId: string;
  userEmail: string;
}

export interface CreateApologyPayload {
  attendanceTypeId: string;
  absenteeReason: string;
  date: string;
}

export interface AttendanceTypeModel {
  id: string;
  name: string;
}
