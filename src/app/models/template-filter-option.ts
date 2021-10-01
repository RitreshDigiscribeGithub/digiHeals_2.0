export interface TemplateFilterOption {
  id: string;
  name: string;
  labelPlaceholder: string;
  shouldShow: boolean;
  shouldShowLabel: boolean;
  canBeFreeFloating: boolean;
  isFreeFloating?: boolean;
  grouped?: boolean;

  rect?: {
    left: string;
    top: string;
    // bottom?: number;
  };
}
