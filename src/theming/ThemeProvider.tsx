import { useAtomValue } from 'jotai';
import { useColorScheme } from 'react-native';
import {
  Provider as PaperProvider,
  MD2LightTheme as SquareLightTheme,
  MD2DarkTheme as SquareDarkTheme,
  MD3LightTheme as RoundLightTheme,
  MD3DarkTheme as RoundDarkTheme,
  adaptNavigationTheme,
} from 'react-native-paper';
import { appSettingsAtom } from '../state/atoms';
import { Themes } from './ThemeConstants';
import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
  Theme,
  NavigationContainer,
} from '@react-navigation/native';

const { LightTheme: NavLightTheme, DarkTheme: NavDarkTheme } =
  adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const appSettings = useAtomValue(appSettingsAtom);
  const colorScheme = useColorScheme();

  const roundTheme = colorScheme === 'dark' ? RoundDarkTheme : RoundLightTheme;
  const squareTheme =
    colorScheme === 'dark' ? SquareDarkTheme : SquareLightTheme;
  const baseTheme =
    appSettings.ThemeType === 'Round' ? roundTheme : squareTheme;
  const navTheme = colorScheme === 'dark' ? NavDarkTheme : NavLightTheme;

  // Merge the base theme with the navigation theme
  const theme: Theme = {
    ...baseTheme,
    ...navTheme,
    colors: {
      ...baseTheme.colors,
      ...navTheme.colors,
    },
  };

  // Merge the theme with the app color scheme user selected in the settings
  theme.colors = {
    ...theme.colors,
    ...Themes[appSettings.ThemeColor][colorScheme ?? 'light'],
  };

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>{children}</NavigationContainer>
    </PaperProvider>
  );
}
