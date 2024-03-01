import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../../theme/theme';
import MyText from '../Text';
import useTheme from '../../hooks/useTheme';

interface LabelInfo {
  content: string;
  label: string;
}
const OrderSpanInfo: React.FC<LabelInfo> = ({content, label}) => {
  const {currentTheme} = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          borderBottomColor:
            currentTheme === 'dark'
              ? COLORS.borderColorDark
              : COLORS.borderColorLight,
        },
      ]}>
      <MyText style={styles.labelText}>{label}</MyText>
      <MyText style={styles.contentText}> {content} </MyText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 6,
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  labelText: {
    fontSize: 18,
    fontWeight: '300',
  },
  contentText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default OrderSpanInfo;
