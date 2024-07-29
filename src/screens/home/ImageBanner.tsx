import React from 'react';
import {StyleSheet, View, Dimensions, FlatList, Image} from 'react-native';
import {verticalSpace, COLORS, heightPixel} from '../../constants';
import {BANNER_IMAGES} from '../../constants';

const {width} = Dimensions.get('window');

const ImageBanner = () => {
  const {container, outerWrapper, imageWrapper, imageStyles} = styles;

  return (
    <View style={container}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        data={BANNER_IMAGES}
        keyExtractor={(_, index) => `images${index}`}
        renderItem={({item, index}) => {
          return (
            <View style={outerWrapper}>
              <View style={imageWrapper}>
                <Image source={item} style={imageStyles} />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default ImageBanner;

const styles = StyleSheet.create({
  container: {
    width,
    marginVertical: verticalSpace(20),
  },
  outerWrapper: {
    width,
    backgroundColor: COLORS.BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalSpace(10),
    overflow: 'hidden',
  },
  imageWrapper: {
    height: heightPixel(220),
    width: '90%',
    backgroundColor: COLORS.BACKGROUND,
    elevation: 10,
    borderRadius: 10,
  },
  imageStyles: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
});
