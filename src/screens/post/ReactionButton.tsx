import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, fontSize, horizontalSpace} from '../../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface ReactionButtonProps {
  data: number;
  icon: string;
}

const ReactionButton = ({data, icon}: ReactionButtonProps) => {
  const {wrapper, reactionStyles} = styles;
  return (
    <View style={wrapper}>
      <AntDesign name={icon} size={18} color={COLORS.PRIMARY} />
      <Text style={reactionStyles}>{data}</Text>
    </View>
  );
};

export default ReactionButton;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginRight: horizontalSpace(10),
  },
  reactionStyles: {
    fontSize: fontSize(16),
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '600',
    marginLeft: 3,
  },
});
