import { ButtonColors, ButtonTypes } from './button.enum';

export interface ButtonInterface {
  icon?: IconConfig;
  name?: string;
  action?: string;
  buttonColor?: ButtonColors;
  debounceTime?: number;
  buttonType: ButtonTypes;
  buttonDisabled?: boolean;
  buttonCursor?: 'progress';
  isVertical?: boolean;
  [propName: string]: any;
}

interface IconConfig {
  iconName: string;
  iconColor?: ButtonColors;
}
