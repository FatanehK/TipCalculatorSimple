import { useAtom } from 'jotai';
import { useState } from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import {
  Button,
  Divider,
  Surface,
  ToggleButton,
  useTheme,
  Text,
  MD3Theme,
} from 'react-native-paper';
import { appSettingsAtom } from '../state/atoms';
import { styles as tipSelectorStyles } from '../components/TipSelector';
import Slider from '@react-native-community/slider';
import { useDebouncedCallback } from 'use-debounce';
import { FontSizeScale, InitialAppSettings } from '../Constants';
import { Themes } from '../theming/ThemeConstants';
import { IAppSettings } from '../Types';

export default function SettingsScreen() {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const [appSettings, setAppSettings] = useAtom(appSettingsAtom);
  const [selectedTipOption, setSelectedTipOption] = useState<number>(0);
  const [sliderValue, setSliderValue] = useState<number>(
    appSettings.tipOptions[0],
  );
  const saveStateDebounced = useDebouncedCallback((value: number) => {
    const newOptions = [...appSettings.tipOptions];
    newOptions[selectedTipOption] = value;
    setAppSettings({
      ...appSettings,
      tipOptions: newOptions,
    });
  }, 0);
  const styles = getStyles(appSettings, theme);

  const onSliderValueChange = (value: number) => {
    setSliderValue(value);
    saveStateDebounced(value);
  };

  const onTipOptionsChange = (index: number, value: number) => {
    setSelectedTipOption(index);
    setSliderValue(value);
  };

  const onThemeTypeChange = (value: string) => {
    if (value === 'Round' || value === 'Square') {
      setAppSettings({ ...appSettings, ThemeType: value });
    }
  };

  const onFontSizeChange = (value: string) => {
    let fontSizeScale = InitialAppSettings.fontSizeScale;
    switch (value) {
      case 'Small':
        fontSizeScale = FontSizeScale.Small;
        break;
      case 'Medium':
        fontSizeScale = FontSizeScale.Medium;
        break;
      case 'Large':
        fontSizeScale = FontSizeScale.Large;
        break;
    }

    setAppSettings({
      ...appSettings,
      fontSizeScale: fontSizeScale,
    });
  };

  return (
    <View style={styles.container}>
      <Surface style={styles.surface}>
        <Text style={styles.titleText}>Tip Options</Text>
        <Text style={styles.text}>
          Update tip options by choosing one and using the slider to chnage the
          value.
        </Text>
        <View style={tipSelectorStyles.buttonsContainer}>
          {appSettings.tipOptions.map((tip, index) => (
            <Button
              key={index}
              style={tipSelectorStyles.buttonStyle}
              mode={selectedTipOption === index ? 'contained' : 'outlined'}
              onPress={() => onTipOptionsChange(index, tip)}
              labelStyle={{ fontSize: 14 * appSettings.fontSizeScale }}
            >
              {tip}%
            </Button>
          ))}
        </View>
        <View style={tipSelectorStyles.sliderContainer}>
          <Slider
            value={sliderValue}
            step={1}
            minimumValue={1}
            maximumValue={99}
            onValueChange={onSliderValueChange}
            minimumTrackTintColor={theme.colors.primary}
          />
        </View>
        <Button
          onPress={() => {
            setAppSettings({
              ...appSettings,
              tipOptions: InitialAppSettings.tipOptions,
            });
            setSliderValue(appSettings.tipOptions[selectedTipOption]);
          }}
        >
          Restore Defaults
        </Button>
      </Surface>
      <Surface style={styles.surface}>
        <Text style={styles.titleText}>Theme Options</Text>
        <View style={styles.horizontalView}>
          <View>
            <Text style={styles.text}>Font Size</Text>
            <ToggleButton.Row
              onValueChange={onFontSizeChange}
              value={getFontSize(appSettings.fontSizeScale)}
              style={styles.toggleButtonRow}
            >
              <ToggleButton icon="size-s" value="Small" />
              <ToggleButton icon="size-m" value="Medium" />
              <ToggleButton icon="size-l" value="Large" />
            </ToggleButton.Row>
          </View>
          <View>
            <Text style={styles.text}>Layout Style</Text>
            <ToggleButton.Row
              onValueChange={onThemeTypeChange}
              value={appSettings.ThemeType}
              style={styles.toggleButtonRow}
            >
              <ToggleButton icon="square-rounded-outline" value="Round" />
              <ToggleButton icon="crop-square" value="Square" />
            </ToggleButton.Row>
          </View>
        </View>
        <Divider style={styles.divider} />
        <Text style={styles.text}>Theme</Text>
        <View style={styles.themeButtonsContainer}>
          {Object.keys(Themes).map((themeName, index) => (
            <Button
              key={index}
              style={[
                styles.themeButton,
                {
                  backgroundColor:
                    themeName === appSettings.ThemeColor
                      ? theme.colors.primary
                      : Themes[themeName as keyof typeof Themes][
                          colorScheme ?? 'light'
                        ].secondaryContainer,
                },
              ]}
              mode={
                themeName === appSettings.ThemeColor
                  ? 'contained'
                  : 'contained-tonal'
              }
              onPress={() => {
                setAppSettings({
                  ...appSettings,
                  ThemeColor: themeName as keyof typeof Themes,
                });
              }}
            >
              {themeName}
            </Button>
          ))}
        </View>
      </Surface>
    </View>
  );
}

const getFontSize = (fontSizeScale: FontSizeScale) => {
  switch (fontSizeScale) {
    case FontSizeScale.Small:
      return 'Small';
    case FontSizeScale.Medium:
      return 'Medium';
    case FontSizeScale.Large:
      return 'Large';
  }
};

const getStyles = (appSettings: IAppSettings, theme: MD3Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignContent: 'space-between',
      padding: 10,
      backgroundColor: theme.colors.surface,
    },
    horizontalView: {
      flexDirection: 'row',
    },
    surface: {
      marginTop: 3,
      marginBottom: 3,
      paddingTop: 5,
      paddingBottom: 5,
      elevation: 4,
    },
    toggleButtonRow: {
      padding: 5,
    },
    titleText: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
      padding: 5,
    },
    text: {
      fontSize: 14,
      marginBottom: 5,
      padding: 5,
    },
    divider: { marginTop: 10, marginBottom: 10 },
    themeButtonsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    themeButton: {
      margin: 5,
      width: 100,
      fontSize: 12 * appSettings.fontSizeScale,
    },
  });
};
