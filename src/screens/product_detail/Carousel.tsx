// import React from 'react';
// import {
//   View,
//   Text,
//   Animated,
//   Dimensions,
//   Image,
//   ImageProps,
//   ImageSourcePropType,
// } from 'react-native';
// import {COLORS, heightPixel, verticalSpace} from '../../constants';

// const {width: screenWidth} = Dimensions.get('window');

// type ImageTypes = {image: ImageProps};

// interface CarouselProps {
//   images: ImageProps[];
//   scrollX: Animated.Value;
// }

// const Carousel = ({images, scrollX}: CarouselProps) => {
// //   console.log(images);

//   const imageSource = images.map(imageUrl => ({uri: imageUrl}));
//   return (
//     <Animated.FlatList
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       pagingEnabled
//       data={imageSource}
//       keyExtractor={(_, index) =>
//         `images${Number.parseInt(`${Math.random() * 100}`)}`
//       }
//       onScroll={Animated.event(
//         [
//           {
//             nativeEvent: {
//               contentOffset: {x: scrollX},
//             },
//           },
//         ],
//         {useNativeDriver: false},
//       )}
//       renderItem={({item, index}) => {
//         // console.log('imageUri', item);
//         return (
//           <View
//             style={{
//               height: heightPixel(350),
//               width: screenWidth,
//               backgroundColor: COLORS.BACKGROUND,
//               paddingVertical: verticalSpace(20),
//             }}>
//             <Image
//               source={{uri: item}}
//               style={{
//                 height: '100%',
//                 width: '100%',
//                 resizeMode: 'contain',
//               }}
//             />
//           </View>
//         );
//       }}
//     />
//   );
// };

// export default Carousel;
