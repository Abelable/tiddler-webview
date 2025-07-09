export interface Manager {
  id: number;
  roleId: number;
  userId: number;
  avatar: string;
  nickname: string;
  mobile: string;
  scenicIds: number[];
}

export interface ManagerDetail {
  id: number | undefined;
  roleId: number | undefined;
  userId: number | undefined;
  avatar: string;
  nickname: string;
  mobile: string;
  scenicIds: number[];
}
