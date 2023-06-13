export interface ScenicOption {
  id: number;
  name: string;
}

export interface ProviderScenicSpot {
  id: number;
  status: number;
  failureReason: string;
  scenicId: number;
  scenicImage: string;
  scenicName: string;
  scenicLevel: string;
  scenicAddress: string;
  createdAt: string;
  updatedAt: string;
}
