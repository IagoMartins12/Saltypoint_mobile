import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../../theme/theme';

interface LabelInfo {
  content: string;
  label: string;
}
const OrderSpanInfo: React.FC<LabelInfo> = ({content, label}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>{label}</Text>
      <Text style={styles.contentText}> {content} </Text>
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
    borderBottomWidth: 0.75,
  },
  labelText: {
    fontSize: 18,
    color: COLORS.primaryBlackHex,
    fontWeight: '300',
  },
  contentText: {
    fontSize: 16,
    color: COLORS.primaryBlackHex,
    fontWeight: '500',
  },
});

export default OrderSpanInfo;
