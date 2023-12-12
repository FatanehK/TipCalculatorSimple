import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Platform,
} from 'react-native';
import {
  Button,
  Surface,
  Divider,
  TextInput,
  useTheme,
  MD3Theme,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AppScreen } from '../Constants';
import { IAppSettings, NavigationProps } from '../Types';
import { useState } from 'react';
import TipSelector from '../components/TipSelector';
import AmountText from '../components/AmountText';
import { useAtom } from 'jotai';
import { appSettingsAtom } from '../state/atoms';
import { AdBannerContainer } from '../components/AdBannerContainer';

interface State {
  billValueStr: string;
  billValue: number;
  tipPercentage: number;
  tip: number;
  total: number;
}

// Round to 2 decimal places
const round = (value: number) => {
  return Math.round((value + Number.EPSILON) * 100) / 100;
};

export default function HomeScreen() {
  const theme = useTheme();
  const [appSettings, setAppSettings] = useAtom(appSettingsAtom);
  const navigation = useNavigation<NavigationProps>();
  const [state, setState] = useState<State>({
    billValueStr: '0.00',
    billValue: 0,
    tipPercentage: appSettings.lastTipPercentage,
    tip: 0,
    total: 0,
  });
  const { billValueStr, billValue, tipPercentage, tip, total } = state;
  const styles = getStyles(appSettings, theme);

  const calculateTip = (newBillValue: number, newTip: number) => {
    const tipAmount = round(newBillValue * (newTip / 100));
    const totalAmount = newBillValue + tipAmount;
    return { tipAmount, totalAmount };
  };

  const setBillValue = (value: string) => {
    const newValue = Number(value);
    const { tipAmount, totalAmount } = calculateTip(newValue, tipPercentage);
    setState({
      ...state,
      billValueStr: value,
      billValue: newValue,
      tip: tipAmount,
      total: totalAmount,
    });
  };

  const setTipValue = (value: number) => {
    const { tipAmount, totalAmount } = calculateTip(billValue, value);
    setState({
      ...state,
      tipPercentage: value,
      tip: tipAmount,
      total: totalAmount,
    });

    // Update last tip percentage
    if (appSettings.rememberLastTipPercentage) {
      setAppSettings({
        ...appSettings,
        lastTipPercentage: value,
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <AdBannerContainer />
        <Surface style={styles.surface}>
          <TextInput
            dense={true}
            label={'Bill  $'}
            style={styles.billValueInput}
            onChangeText={setBillValue}
            value={billValueStr}
            keyboardType="decimal-pad"
            selectTextOnFocus={true}
            onFocus={e => {
              // Workaround for selectTextOnFocus={true} not working on IOS
              if (Platform.OS === 'ios') {
                e.currentTarget.setNativeProps({
                  selection: { start: 0, end: billValueStr?.length },
                });
              }
            }}
            right={
              <TextInput.Icon
                icon="autorenew"
                onPress={() => setBillValue('0.00')}
              />
            }
          />
        </Surface>
        <Surface style={styles.surface}>
          <TipSelector
            tipOptions={appSettings.tipOptions}
            value={tipPercentage}
            onValueChange={setTipValue}
          />
        </Surface>
        <Surface style={styles.surface}>
          <AmountText title="Tip" value={tip} />
          <Divider />
          <AmountText title="Total" value={total} />
        </Surface>
        <Button
          style={styles.settingsButton}
          icon={'cog'}
          mode="elevated"
          onPress={() => navigation.navigate(AppScreen.Settings)}
        >
          Settings
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
}

const getStyles = (appSettings: IAppSettings, theme: MD3Theme) => {
  return StyleSheet.create({
    surface: {
      marginTop: 3,
      marginBottom: 3,
      paddingTop: 5,
      paddingBottom: 5,
      elevation: 4,
    },
    container: {
      flex: 1,
      alignContent: 'space-between',
      padding: 10,
      backgroundColor: theme.colors.surface,
    },
    billValueInput: {
      fontSize: 24 * appSettings.fontSizeScale,
      fontWeight: 'bold',
      padding: 10,
      textAlign: 'right',
    },
    clearButton: {
      marginTop: 20,
      alignSelf: 'flex-end',
    },
    settingsButton: {
      position: 'absolute',
      bottom: 30,
      right: 20,
    },
  });
};
