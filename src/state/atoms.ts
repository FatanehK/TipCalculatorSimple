import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import { InitialAppSettings } from '../Constants';
import { IAppSettings } from '../Types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppSettingsStorageKey = 'TipCalculatorSettings_v1';
const storage = createJSONStorage<IAppSettings>(() => AsyncStorage);
export const appSettingsAtom = atomWithStorage<IAppSettings>(
  AppSettingsStorageKey,
  InitialAppSettings,
  storage,
);

// const PolyfillConfigs = () => {
//   const [appConfig, setAppConfig] = useAtom(appSettingsAtom); // Trigger the "onMount" function that will load the data from the store
//   const newAppConfig = { ...appConfig };

//   for (const key of Object.keys(InitialAppSettings)) {
//     if (newAppConfig[key] === undefined) {
//       newAppConfig[key] = InitialAppSettings[key];
//     }
//   }
//   setAppConfig(newAppConfig);
//   return null;
// };

// PolyfillConfigs();
