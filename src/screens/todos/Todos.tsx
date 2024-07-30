import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {Header, UserInputs, Loader, ErrorModal} from '../../components';
import {
  COLORS,
  verticalSpace,
  horizontalSpace,
  fontSize,
} from '../../constants';
import {
  useGetTodosQuery,
  useDeleteTodoMutation,
  useUpdateTodoStatusMutation,
} from '../../redux/slices/TodoApi';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from './Styles';

interface TodosProps {
  navigation: any;
}

interface TodoInterface {
  completed: boolean;
  id: number;
  todo: string;
  userId: number;
}

const Todos: React.FC<TodosProps> = ({navigation}) => {
  const {
    container,
    todoOuterWrapper,
    todoContainer,
    todoTitle,
    statusWrapper,
    statusStyles,
    buttonsWrapper,
  } = styles;
  const {data, isLoading, error} = useGetTodosQuery('Todo');
  const [deleteTodo, {isLoading: isDeleteLoading}] = useDeleteTodoMutation();
  const [updateTodoStatus, {isLoading: isUpdateLoading}] =
    useUpdateTodoStatusMutation();

  const [todoLists, setTodoLists] = useState<TodoInterface[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(``);

  useEffect(() => {
    if (data) {
      setTodoLists(data.todos);
    }
  }, [data]);

  //to close error displaying modal
  const toggleErrorModal = () => {
    setIsVisible(!isVisible);
  };

  const todoDeleteHandler = async (id: number) => {
    try {
      // Optimistically update the UI
      setTodoLists(prevTodos =>
        prevTodos.map(todo =>
          todo.id === id
            ? {...todo, isDeleted: true, deletedOn: new Date().toISOString()}
            : todo,
        ),
      );

      // Call the delete API
      const response = await deleteTodo(id);
      if ('data' in response && response.data) {
        // Update the UI with the actual deleted todo
        setTodoLists(prevTodos => prevTodos.filter(todo => todo.id !== id));
      } else {
        // Revert the optimistic update
        setTodoLists(prevTodos =>
          prevTodos.map(todo =>
            todo.id === id
              ? {...todo, isDeleted: false, deletedOn: null}
              : todo,
          ),
        );
      }
    } catch (err) {
      handleError(err);
    }
  };

  //change todo completion status
  const toggleTodoStatus = async (todo: TodoInterface) => {
    try {
      await updateTodoStatus({
        id: todo.id,
        completed: !todo.completed,
      });
      ToastAndroid.show(
        `Todo status updated to ${!todo.completed}`,
        ToastAndroid.SHORT,
      );
      setTodoLists(prevTodos =>
        prevTodos.map(t =>
          t.id === todo.id ? {...t, completed: !t.completed} : t,
        ),
      );
    } catch (error) {
      handleError(error);
    }
  };

  //error handling for rtk mutations
  const handleError = (err: any) => {
    setIsVisible(true);
    if (typeof err === 'string') {
      setErrorMessage(err);
    } else if ('data' in err && typeof err.data === 'object') {
      setErrorMessage(err.data.message || 'An unknown error occurred.');
    } else {
      setErrorMessage('An unknown error occurred.');
    }
  };

  useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [error]);

  const renderTodoItem = ({item}: any) => {
    return (
      <View style={todoOuterWrapper}>
        <View style={todoContainer}>
          <Text style={todoTitle}>{item.todo}</Text>
          <View style={statusWrapper}>
            <Text style={statusStyles}>IsCompleted:</Text>
            <Text style={[statusStyles, {marginLeft: 5}]}>
              {item.completed.toString()}
            </Text>
          </View>
          <View style={buttonsWrapper}>
            <TouchableOpacity onPress={() => toggleTodoStatus(item)}>
              <MaterialCommunityIcons
                name="square-edit-outline"
                size={25}
                color={COLORS.ERROR}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => todoDeleteHandler(item.id)}>
              <MaterialCommunityIcons
                name="delete-outline"
                size={25}
                color={COLORS.ERROR}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <Header navigation={navigation}>
      <View style={container}>
        <UserInputs
          icon="search-sharp"
          placeholder="Search todos.."
          placeholderTextColor={COLORS.PRIMARY}
          selectionColor={COLORS.PRIMARY}
          containerStyle={{
            marginTop: verticalSpace(40),
            marginBottom: verticalSpace(10),
            marginHorizontal: horizontalSpace(15),
            elevation: 3,
          }}
          // onChangeText={handleSearch}
        />

        <FlatList
          data={todoLists}
          keyExtractor={(item, index) => `${index}Todo${item.userId}`}
          showsVerticalScrollIndicator={false}
          renderItem={renderTodoItem}
        />
      </View>
      {(isLoading || isDeleteLoading || isUpdateLoading) && (
        <Loader isLoading={isLoading || isDeleteLoading || isUpdateLoading} />
      )}
      {errorMessage && (
        <ErrorModal
          message={errorMessage}
          isVisible={isVisible}
          onClose={toggleErrorModal}
        />
      )}
    </Header>
  );
};

export default Todos;
