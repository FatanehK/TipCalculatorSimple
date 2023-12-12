import {
  BannerAd,
  TestIds,
  BannerAdSize,
} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-8710571547862077/5864840273';

export const AdBannerContainer = () => {
  return (
    <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.FLUID}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
      onAdFailedToLoad={error => {
        console.log('Advert failed to load: ', error);
      }}
    />
  );
};
