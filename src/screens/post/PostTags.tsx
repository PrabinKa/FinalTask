import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  COLORS,
  verticalSpace,
  horizontalSpace,
  heightPixel,
  fontSize,
} from '../../constants';

interface PostTagsInterface {
  data: string[];
}

const PostTags = ({data}: PostTagsInterface) => {
  const {container, tagsWrapper, tagStyles} = styles;
  return (
    <View style={container}>
      {data.map((tag, i) => {
        return (
          <View key={i} style={tagsWrapper}>
            <Text style={tagStyles}>{tag}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default PostTags;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: '#888',
    borderTopWidth: 0.5,
    marginVertical: verticalSpace(10),
    paddingTop: verticalSpace(3),
  },
  tagsWrapper: {
    backgroundColor: COLORS.ERROR,
    paddingHorizontal: horizontalSpace(5),
    paddingVertical: verticalSpace(2),
    marginRight: horizontalSpace(5),
    borderRadius: heightPixel(3),
  },
  tagStyles: {
    color: COLORS.WHITE,
    fontSize: fontSize(14),
    fontWeight: 'bold',
  },
});
