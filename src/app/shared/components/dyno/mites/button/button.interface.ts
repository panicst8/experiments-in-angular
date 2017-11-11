export interface ButtonInterface {
  icon?: IconConfig;
  name?: string;
  action?: string;
  buttonColor?: string;
  debounceTime?: number;
  // buttonType: ButtonTypes; // turning off enum till ng language service stops complaining in vscode
  buttonType: string;
  buttonDisabled?: boolean;
  buttonCursor?: 'progress';
  isVertical?: boolean;
  [propName: string]: any;
}

interface IconConfig {
  iconName: string;
  iconColor?: ButtonColors;
}

enum ButtonTypes {
  toggle = <any>'toggle',
  fab = <any>'fab',
  standard = <any>'standard',
  miniFab = <any>'miniFab',
  iconButton = <any>'iconButton',
  raised = <any>'raised',
  basic = <any>'basic',
}

enum ButtonColors {
  primary = <any>'primary',
  accent = <any>'accent',
  warn = <any>'warn',
}
