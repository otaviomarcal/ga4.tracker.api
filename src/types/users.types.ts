export interface UserData {
  userId: string;
  sessions: UserSession[];
}

export interface UserSession {
  session: string;
  averageSessionDuration: string;
  engagedSessions: string;
  pageReferrer: string;
  pages: string[];
  deviceCategory: string;
  operatingSystem: string;
  browser: string;
  city: string;
  language: string;
  date: string;
}

export interface PaginatedUserData {
  data: UserSession[];
  pagination: PaginationInfo;
}

export interface PaginationInfo {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
}
