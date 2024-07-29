import React, {memo} from 'react';
import {StyleSheet, ActivityIndicator, View, Modal, Text} from 'react-native';
import {COLORS, fontSize, heightPixel, horizontalSpace} from '../../constants';

interface LoaderProps {
  isLoading: boolean;
}

const Loader: React.FC<LoaderProps> = ({isLoading}) => {
  const {modalContainer, modalWrapper, loadingText} = styles;

  return (
    <Modal animationType="fade" transparent={true} visible={isLoading}>
      <View style={modalContainer}>
        <View style={modalWrapper}>
          <ActivityIndicator size={'large'} color={COLORS.ERROR} />
          <Text style={loadingText}>Loading...</Text>
        </View>
      </View>
    </Modal>
  );
};

export default memo(Loader);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalWrapper: {
    height: heightPixel(100),
    width: '70%',
    borderRadius: 5,
    backgroundColor: COLORS.BACKGROUND,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: horizontalSpace(20),
  },
  loadingText: {
    fontSize: fontSize(26),
    color: COLORS.SECONDARY,
    marginLeft: horizontalSpace(10),
  },
});
