import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import {
  COLORS,
  fontSize,
  heightPixel,
  horizontalSpace,
  verticalSpace,
} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PostTags from './PostTags';
import {PlainButton} from '../../components';
import {editPost} from '../../services/PostService';

interface EditPostScreenProps {
  navigation: any;
  route: any;
}

const EditPostScreen: React.FC<EditPostScreenProps> = ({navigation, route}) => {
  const {
    container,
    headerContainer,
    buttonStyles,
    screenTitleStyles,
    buttonWrapper,
  } = styles;

  const [item] = useState(route.params);

  const [postCredentials, setPostCredentials] = useState({
    title: item.title,
    body: item.body,
  });

  //handler for editing post
  const postEditHandler = async (id: number) => {
    try {
      const response = await editPost(id, postCredentials);
      if (response.ok) {
        navigation.goBack();
        ToastAndroid.show('Post edited successfully!', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log('error updating post', error);
    }
  };

  return (
    <SafeAreaView style={container}>
      <View style={headerContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          style={buttonStyles}>
          <Ionicons name="chevron-back" size={30} color={COLORS.TEXT_PRIMARY} />
        </TouchableOpacity>
        <Text style={screenTitleStyles}>Edit Post</Text>
      </View>
      <View style={{paddingTop: verticalSpace(40)}}>
        <TextInput
          placeholder="Post Title"
          placeholderTextColor={COLORS.PRIMARY}
          selectionColor={COLORS.PRIMARY}
          style={{
            fontSize: fontSize(20),
            color: COLORS.TEXT_PRIMARY,
          }}
          value={postCredentials.title}
          onChangeText={text =>
            setPostCredentials({...postCredentials, title: text})
          }
        />
        <PostTags data={item.tags} />
        <TextInput
          placeholder="Post descriptions"
          multiline
          placeholderTextColor={COLORS.PRIMARY}
          selectionColor={COLORS.PRIMARY}
          style={{
            fontSize: fontSize(18),
            color: COLORS.TEXT_PRIMARY,
          }}
          value={postCredentials.body}
          onChangeText={text =>
            setPostCredentials({...postCredentials, body: text})
          }
        />
        <View style={buttonWrapper}>
          <PlainButton
            onPress={() => navigation.goBack()}
            containerStyle={{
              height: heightPixel(45),
              borderRadius: verticalSpace(5),
            }}
            textStyle={{
              color: COLORS.WHITE,
            }}>
            Cancel
          </PlainButton>
          <PlainButton
            onPress={() => postEditHandler(item.id)}
            containerStyle={{
              height: heightPixel(45),
              borderRadius: verticalSpace(5),
              backgroundColor: COLORS.ERROR,
            }}
            textStyle={{
              color: COLORS.WHITE,
            }}>
            Update
          </PlainButton>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    paddingHorizontal: horizontalSpace(15),
  },
  headerContainer: {
    height: heightPixel(80),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonStyles: {
    height: heightPixel(50),
    width: heightPixel(50),
    backgroundColor: COLORS.WHITE,
    borderRadius: heightPixel(25),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  screenTitleStyles: {
    fontSize: fontSize(22),
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '700',
    marginLeft: horizontalSpace(50),
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalSpace(30),
  },
});
