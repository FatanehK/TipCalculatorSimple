import { useAtomValue } from 'jotai';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { appSettingsAtom } from '../state/atoms';
import { IAppSettings } from '../Types';

interface AmountTextProps {
  title: string;
  value: number;
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export default function AmountText({ title, value }: AmountTextProps) {
  const appSettings = useAtomValue(appSettingsAtom);
  const styles = getStyles(appSettings);
  const formattedValue = currencyFormatter.format(value);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.valueText}>{formattedValue}</Text>
    </View>
  );
}

const getStyles = (appSettings: IAppSettings) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    titleText: {
      fontSize: 20,
      padding: 8,
    },
    valueText: {
      fontSize: 24 * appSettings.fontSizeScale,
      fontWeight: 'bold',
      padding: 8,
    },
  });
};
