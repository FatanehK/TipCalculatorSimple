import { View, StyleSheet } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import { useAtomValue } from 'jotai';
import { appSettingsAtom } from '../state/atoms';

interface TipSelectorProps {
  tipOptions: number[];
  value?: number;
  onValueChange?: (value: number) => void;
}

export default function TipSelector({
  tipOptions,
  value,
  onValueChange,
}: TipSelectorProps) {
  const theme = useTheme();
  const appSettings = useAtomValue(appSettingsAtom);

  const getMode = (tip: number) => {
    return value === tip ? 'contained' : 'outlined';
  };

  return (
    <View>
      <View style={styles.buttonsContainer}>
        {tipOptions.map((tip, index) => (
          <Button
            key={index}
            style={styles.buttonStyle}
            mode={getMode(tip)}
            onPress={() => onValueChange?.(tip)}
            labelStyle={{ fontSize: 14 * appSettings.fontSizeScale }}
          >
            {tip}%
          </Button>
        ))}
      </View>
      <View style={styles.sliderContainer}>
        <Text>Tip ({value}%)</Text>
        <Slider
          value={value}
          step={1}
          minimumValue={0}
          maximumValue={100}
          onValueChange={onValueChange}
          minimumTrackTintColor={theme.colors.primary}
        />
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  buttonStyle: {
    marginBottom: 2,
  },
  sliderContainer: {
    margin: 8,
  },
});
