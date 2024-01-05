export interface OssConfig {
  accessId: string;
  host: string;
  policy: string;
  signature: string;
  expire: number;
  callback: string;
  dir: string;
}

export interface RegionOption {
  label: string;
  value: string;
  children?: RegionOption[];
}

export interface ApiOption {
  id: number;
  name: string;
}

export interface Option {
  text: string;
  value: number;
}
