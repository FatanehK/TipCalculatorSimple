import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Themes } from './theming/ThemeConstants';

export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
};

type NavigationRouteProps = NativeStackScreenProps<RootStackParamList>;
export type NavigationProps = NavigationRouteProps['navigation'];
export type RouteProps = NavigationRouteProps['route'];

export type IAppSettings = {
  lastTipPercentage: number;
  tipOptions: number[];
  rememberLastTipPercentage: boolean;
  ThemeType: 'Round' | 'Square';
  ThemeColor: keyof typeof Themes;
  fontSizeScale: number;
};
