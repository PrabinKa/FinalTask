import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {Header, Loader, UserInputs} from '../../components';
import {getPosts, searchPosts, deletePost} from '../../services/PostService';
import {COLORS, verticalSpace, horizontalSpace, STRINGS} from '../../constants';
import {PostInterface} from '../../types/PostTypes';
import ReactionButton from './ReactionButton';
import PostTags from './PostTags';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from './Styles';

interface PostProps {
  navigation: any;
}

const Post: React.FC<PostProps> = ({navigation}) => {
  const {
    container,
    postContainer,
    postWrapper,
    postTitle,
    postDescription,
    reactionsContainer,
    reactionWrapper,
    viewsStyles,
    viewsTextStyles,
  } = styles;

  const [postsData, setPostsData] = useState<PostInterface[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [debounceTimeout, setDebounceTimeout] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  useEffect(() => {
    fetchInitialData();
  }, []);

  //initially fetch 10 posts details
  const fetchInitialData = async () => {
    setIsLoading(true);
    try {
      const response = await getPosts('/posts?limit=10');
      const data = await response.json();

      setPostsData(data.posts);
    } catch (error) {
      console.error('Error fetching initial data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  //fetch more 10 posts details on every pull to refresh
  const handleRefresh = async () => {
    setRefreshing(true);

    try {
      const response = await getPosts('/posts?limit=10&skip=10');
      const data = await response.json();
      setPostsData(prevData => [...prevData, ...data.posts]);
    } catch (error) {
      console.error('Error fetching refreshed data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  //search posts from api
  const fetchSearchData = async (query: string) => {
    setIsLoading(true);
    try {
      const data = await searchPosts(query);
      setPostsData(data.posts);
    } catch (error) {
      console.error('Error searching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  //debouncing functionality for search
  const handleSearch = (text: string) => {
    // Clear the previous debounce timeout
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Set a new debounce timeout
    const timeout = setTimeout(() => {
      fetchSearchData(text);
    }, 500);

    setDebounceTimeout(timeout);
  };

  //deletes post
  const postDeleteHandler = async (id: number) => {
    setIsLoading(true);
    try {
      // Optimistically update the UI
      setPostsData(prevPosts =>
        prevPosts.map(post =>
          post.id === id
            ? {...post, isDeleted: true, deletedOn: new Date().toISOString()}
            : post,
        ),
      );

      // Call the delete API
      const response = await deletePost(id);
      const data = await response.json();

      if (data) {
        // Update the UI with the actual deleted post
        setPostsData(prevPosts => prevPosts.filter(post => post.id !== id));
      } else {
        // Revert the optimistic update
        setPostsData(prevPosts =>
          prevPosts.map(post =>
            post.id === id
              ? {...post, isDeleted: false, deletedOn: null}
              : post,
          ),
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Header navigation={navigation}>
        <View style={container}>
          <UserInputs
            icon="search-sharp"
            placeholder="Search posts.."
            placeholderTextColor={COLORS.PRIMARY}
            selectionColor={COLORS.PRIMARY}
            containerStyle={{
              marginTop: verticalSpace(40),
              marginBottom: verticalSpace(10),
              marginHorizontal: horizontalSpace(15),
              elevation: 3,
            }}
            onChangeText={handleSearch}
          />
          {postsData.length != 0 && (
            <FlatList
              data={postsData}
              keyExtractor={(item, index) => `${item.userId}Posts${index}`}
              showsVerticalScrollIndicator={false}
              onRefresh={handleRefresh}
              refreshing={refreshing}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('EditPost', item)}
                    style={postContainer}>
                    <View style={postWrapper}>
                      <View
                        style={[
                          reactionWrapper,
                          {justifyContent: 'space-between'},
                        ]}>
                        <Text style={postTitle}>{item.title}</Text>
                        <TouchableOpacity
                          onPress={() => postDeleteHandler(item.id)}>
                          <MaterialCommunityIcons
                            name="delete-outline"
                            size={20}
                            color={COLORS.TEXT_PRIMARY}
                          />
                        </TouchableOpacity>
                      </View>
                      <PostTags data={item.tags} />
                      <Text style={postDescription}>{item.body}</Text>
                      <View style={reactionsContainer}>
                        <View style={reactionWrapper}>
                          <ReactionButton
                            data={item.reactions.likes}
                            icon="like2"
                          />
                          <ReactionButton
                            data={item.reactions.dislikes}
                            icon="dislike2"
                          />
                        </View>
                        <View style={reactionWrapper}>
                          <Text style={viewsStyles}>{item.views}</Text>
                          <Text style={viewsTextStyles}>{STRINGS.VIEWS}</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </View>
        <Loader isLoading={isLoading} />
      </Header>
    </TouchableWithoutFeedback>
  );
};

export default Post;
