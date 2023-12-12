import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import { ActivityIndicator } from 'react-native-paper';
import { AppScreen, InitialAppSettings } from './Constants';
import { RootStackParamList, IAppSettings } from './Types';
import { useAtom, useAtomValue } from 'jotai';
import { appSettingsAtom } from './state/atoms';
import { Suspense } from 'react';
import ThemeProvider from './theming/ThemeProvider';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Preloader = () => {
  useAtomValue(appSettingsAtom); // Trigger the "onMount" function that will load the data from the store
  return null;
};

export default function AppRoot() {
  return (
    <Suspense fallback={<ActivityIndicator />}>
      <Preloader />
      <AppRootBase />
    </Suspense>
  );
}

function AppRootBase() {
  // Check if app settings has all the keys, if not, add them
  const [appConfig, setAppConfig] = useAtom(appSettingsAtom);
  const newAppConfig: Partial<IAppSettings> = { ...appConfig };
  let configUpdated = false;
  for (const key of Object.keys(InitialAppSettings) as (keyof IAppSettings)[]) {
    if (key && newAppConfig[key] === undefined) {
      newAppConfig[key] = InitialAppSettings[key] as any;
      configUpdated = true;
    }
  }
  if (configUpdated) {
    setAppConfig(newAppConfig as IAppSettings);
  }

  return (
    <ThemeProvider>
      <Stack.Navigator>
        <Stack.Screen
          name={AppScreen.Home}
          component={HomeScreen}
          options={{ title: 'Tip Calculator' }}
        />
        <Stack.Screen name={AppScreen.Settings} component={SettingsScreen} />
      </Stack.Navigator>
    </ThemeProvider>
  );
}
