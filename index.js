import { registerRootComponent } from 'expo';
import App from './App';
import mobileAds from 'react-native-google-mobile-ads';

mobileAds()
  .initialize()
  .then(adapterStatuses => {
    console.log('Admobe Initialization complete!');
    // Check if any adapters encountered an error initializing:
    adapterStatuses.forEach(status => {
      if (status.state === 'error') {
        console.error(
          'Adapter failed to initialize: ' +
            status.adapterClass +
            ': ' +
            status.description,
        );
      }
    });
  });

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
