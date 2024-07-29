import React from 'react';
import {View, Text, StyleSheet, Modal, Pressable} from 'react-native';
import {COLORS, fontSize, verticalSpace} from '../../constants';

interface ErrorModalProps {
  isVisible: boolean;
  message: string;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({
  isVisible,
  message,
  onClose,
}) => {
  const {
    modalContainer,
    modalContent,
    modalTitle,
    lineStyles,
    modalMessage,
    closeButtonText,
    itemPressed,
  } = styles;

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={modalContainer}>
        <View style={modalContent}>
          <Text style={modalTitle}>Error !</Text>
          <View style={lineStyles} />
          <Text style={modalMessage}>{message}</Text>
          <Pressable
            onPress={onClose}
            style={({pressed}) => pressed && itemPressed}>
            <Text style={closeButtonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ErrorModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    padding: verticalSpace(20),
    width: '70%',
    borderRadius: 10,
    backgroundColor: COLORS.WHITE,
  },
  modalTitle: {
    fontSize: fontSize(20),
    fontWeight: 'bold',
    color: COLORS.ERROR,
    alignSelf: 'center',
  },
  lineStyles: {
    backgroundColor: '#999',
    height: 1,
    width: '100%',
    marginVertical: verticalSpace(5),
    alignSelf: 'center',
  },
  modalMessage: {
    fontSize: fontSize(16),
    marginVertical: verticalSpace(10),
    color: COLORS.TEXT_PRIMARY,
  },
  closeButtonText: {
    color: COLORS.SECONDARY,
    fontSize: fontSize(20),
    marginTop: verticalSpace(10),
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
  itemPressed: {
    opacity: 0.3,
  },
});
