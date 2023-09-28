import {
  Dimensions,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import Modal from 'react-native-modal';
import {color, font} from '../../../../theme';
import {DataDropDownType} from '../../../../data/dropdown';
import {useTranslation} from 'react-i18next';
import {widthResponsive} from '../../../../utils';

export const {width} = Dimensions.get('screen');

interface ModalFilterProps {
  toggleModal: () => void;
  modalVisible: boolean;
  dataFilter: DataDropDownType[];
  filterOnPress?: (label: string) => void;
  sendCategory: (value: string) => void;
  translation?: boolean;
  xPosition: number;
  yPosition: number;
  containerStyle?: ViewStyle;
  buttonContainerStyle?: ViewStyle;
  textStyle?: TextStyle;
  selectedMenu?: (label: DataDropDownType) => void;
  onModalHide?: () => void;
}

const FilterModal: FC<ModalFilterProps> = (props: ModalFilterProps) => {
  const {t} = useTranslation();
  const {
    toggleModal,
    modalVisible,
    dataFilter,
    filterOnPress,
    sendCategory,
    translation,
    xPosition,
    yPosition,
    containerStyle,
    buttonContainerStyle,
    textStyle,
    selectedMenu,
    onModalHide,
  } = props;

  const filterButtonHandler = (data: DataDropDownType) => {
    toggleModal();
    filterOnPress?.(data.label);
    sendCategory?.(data.value);
    selectedMenu?.(data);
  };

  return (
    <Modal
      isVisible={modalVisible}
      backdropOpacity={0}
      backdropColor={color.Dark[800]}
      onBackdropPress={toggleModal}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      style={{marginHorizontal: 0}}
      onBackButtonPress={toggleModal}
      onModalHide={onModalHide}>
      <View
        style={[
          styles.container,
          {
            position: 'absolute',
            top: yPosition + 11,
            left: xPosition,
          },
          containerStyle,
        ]}>
        {dataFilter.map((item, index) => (
          <TouchableOpacity
            key={index.toString()}
            style={[styles.buttonContainer, buttonContainerStyle]}
            onPress={() => filterButtonHandler(item)}
            disabled={item?.disabled ?? false}>
            <Text
              style={[
                styles.textFilter,
                {color: item?.disabled ? color.Dark[100] : color.Neutral[10]},
                textStyle,
              ]}>
              {translation ? t(item.label) : item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.Dark[600],
    borderColor: color.Dark[600],
    alignItems: 'flex-start',
    borderRadius: 8,
    paddingVertical: 5,
  },
  buttonContainer: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    paddingHorizontal: widthResponsive(12),
    paddingVertical: widthResponsive(5),
    borderColor: color.Dark[600],
  },
  textFilter: {
    fontSize: widthResponsive(10),
    fontFamily: font.InterRegular,
    fontWeight: '500',
    color: color.Neutral[10],
  },
});
