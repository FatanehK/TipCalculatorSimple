import { IAppSettings } from './Types';

export const enum AppScreen {
  'Home' = 'Home',
  'Settings' = 'Settings',
}

export enum FontSizeScale {
  'Small' = 1,
  'Medium' = 1.3,
  'Large' = 1.5,
}

export const InitialAppSettings: IAppSettings = {
  lastTipPercentage: 15,
  tipOptions: [10, 15, 18, 20],
  rememberLastTipPercentage: true,
  ThemeType: 'Round',
  ThemeColor: 'Purple',
  fontSizeScale: FontSizeScale.Medium,
};
