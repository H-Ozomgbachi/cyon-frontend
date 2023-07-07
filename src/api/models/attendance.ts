export interface AttendanceModel {
  attendanceTypeId: string;
  attendanceTypeName: string;
  dateAdded: string;
  userId: string;
  name: string;
  isPresent: boolean;
  rating: number;
  userCode: string;
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
  userCode: string;
  name: string;
}

export interface CreateApologyPayload {
  attendanceTypeId: string;
  absenteeReason: string;
  date: string;
  name: string;
}

export interface AttendanceTypeModel {
  id: string;
  name: string;
}

export interface AttendanceSummaryModel {
  presence: string;
  absence: string;
}

export interface ApologySummaryModel {
  approved: string;
  declined: string;
}

export interface TakeAttendance {
  attendanceTypeId: string;
  date: string;
  attendanceData: AttendanceDatum[];
}

export interface AttendanceDatum {
  userCode: string;
  rating: number;
  name: string;
}

export interface MarkAbsentees {
  dateEventHeld: string;
  attendanceTypeId: string;
}
