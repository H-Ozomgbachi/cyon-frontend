export interface NavModel {
  title: string;
  linkUrl?: string;
  scope?: string;
  action?: () => void;
}
