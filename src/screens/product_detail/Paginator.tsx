import React from 'react';
import {
  StyleSheet,
  Animated,
  Dimensions,
  ImageProps,
} from 'react-native';
import {COLORS} from '../../constants';

const {width: ITEM_WIDTH} = Dimensions.get('window');

type ImageTypes = {image: ImageProps};

interface PaginatorProps {
  data: ImageTypes[];
  scrollX: Animated.Value;
}

const Paginator = ({data, scrollX}: PaginatorProps) => {

  return (
    <Animated.View style={{flexDirection: 'row', height: 64}}>
      {data.map((data, index) => {
        const inputRange = [
          (index - 1) * ITEM_WIDTH,
          index * ITEM_WIDTH,
          (index + 1) * ITEM_WIDTH,
        ];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [5, 10, 5],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.5, 1, 0.5],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            style={[styles.dot, {width: dotWidth, opacity}]}
            key={index.toString()}
          />
        );
      })}
    </Animated.View>
  );
};

export default Paginator;

const styles = StyleSheet.create({
  dot: {
    height: 5,
    borderRadius: 5,
    backgroundColor: COLORS.SECONDARY,
    marginHorizontal: 2,
  },
});
