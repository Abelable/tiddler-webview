export interface Staff {
  id: number;
  roleId: number;
  userId: number;
  avatar: string;
  nickname: string;
  mobile: string;
}

export interface StaffDetail {
  id: number | undefined;
  roleId: number | undefined;
  userId: number | undefined;
  avatar: string;
  nickname: string;
  mobile: string;
}
