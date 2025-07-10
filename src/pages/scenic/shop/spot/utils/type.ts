import type { UploaderFileListItem } from "vant";

export interface ShopScenicSpot {
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

interface FormOpenTime {
  openMonth: number | undefined;
  closeMonth: number | undefined;
  openTime: string;
  closeTime: string;
  tips: string;
}
interface OpenTime {
  openMonth: number;
  closeMonth: number;
  openTime: string;
  closeTime: string;
  tips: string;
}

interface Policy {
  crowd: string;
  condition: string;
  content: string;
}

interface Facility {
  facilityId: number;
  content: string;
}

interface FormProject {
  image: UploaderFileListItem[];
  name: string;
}
interface Project {
  image: string;
  name: string;
}

interface Tips {
  title: string;
  content: string;
}

export interface FormScenicInfo {
  name: string;
  level: string;
  categoryId: number | undefined;
  price: number | undefined;
  video: UploaderFileListItem[];
  imageList: UploaderFileListItem[];
  longitude: number | undefined;
  latitude: number | undefined;
  address: string;
  brief: string;
  openTimeList: FormOpenTime[];
  policyList: Policy[];
  hotlineList: string[];
  facilityList: Facility[];
  projectList: FormProject[];
  tipsList: Tips[];
  featureTagList: string[];
}

export interface ScenicInfo {
  id: number;
  name: string;
  level: string;
  categoryId: number;
  price: number;
  video: string;
  imageList: string[];
  longitude: number;
  latitude: number;
  address: string;
  brief: string;
  openTimeList: OpenTime[];
  policyList: Policy[];
  hotlineList: string[];
  facilityList: Facility[];
  projectList: Project[];
  tipsList: Tips[];
  featureTagList: string[];
}
