export interface MenuNode {
  name: string;
  children?: MenuNode[];
  url: string;
  icon: string;
  singlePathName?: string;
  availableForPermisions?: Array<string>;
}
