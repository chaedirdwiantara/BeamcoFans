import React, {FC, useEffect, useRef} from 'react';
import {
  View,
  LogBox,
  Animated,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';

import {
  width,
  widthResponsive,
  heightPercentage,
  heightResponsive,
} from '../../utils';
import {color} from '../../theme';
import FastImage from 'react-native-fast-image';
import {CloseCircleIcon} from '../../assets/icon';
import {photos} from '../../interface/musician.interface';
import {imageTypes} from '../../interface/feed.interface';

interface ModalImageProps {
  toggleModal: () => void;
  modalVisible: boolean;
  imageIdx: number;
  dataImage?: imageTypes[][];
  dataImageGallery?: photos[];
  imageUri?: string;
  type?: string;
}

const ImageModal: FC<ModalImageProps> = (props: ModalImageProps) => {
  const {
    toggleModal,
    modalVisible,
    imageIdx,
    dataImage,
    dataImageGallery,
    type,
    imageUri,
  } = props;

  // ignore warning
  useEffect(() => {
    LogBox.ignoreLogs(['scrollToIndex should be used in conjunction with']);
  }, []);

  const scrollX = useRef(new Animated.Value(0)).current;
  const imageSlider = useRef(null);

  useEffect(() => {
    if (imageIdx !== -1) {
      // @ts-ignore
      imageSlider.current?.scrollToOffset({
        offset: imageIdx * width,
      });
    }
  }, [imageIdx]);

  const getItemLayout = (data: any, index: number) => ({
    length: width,
    offset: width * index,
    index,
  });

  return (
    <>
      {modalVisible && (
        <Modal
          isVisible={modalVisible}
          backdropOpacity={1}
          backdropColor={color.Dark[800]}
          style={{marginHorizontal: 0}}
          onBackButtonPress={toggleModal}>
          <StatusBar backgroundColor={color.Dark[800]} />
          <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
              <CloseCircleIcon />
            </TouchableOpacity>

            {type === 'zoomProfile' ? (
              <View>
                <Animated.View style={styles.mainImageWrapper}>
                  <View style={styles.imageWrapper}>
                    <FastImage
                      source={{
                        uri: imageUri,
                      }}
                      style={[styles.imageStyle]}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                  </View>
                </Animated.View>
              </View>
            ) : dataImageGallery ? (
              <View style={styles.mainContainer}>
                <Animated.FlatList
                  ref={imageSlider}
                  data={dataImageGallery}
                  keyExtractor={(_, index) => index.toString()}
                  horizontal
                  pagingEnabled
                  initialScrollIndex={imageIdx}
                  getItemLayout={getItemLayout}
                  showsHorizontalScrollIndicator={false}
                  scrollEventThrottle={16}
                  onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {x: scrollX}}}],
                    {useNativeDriver: true},
                  )}
                  renderItem={({item}) => (
                    <Animated.View style={styles.mainImageWrapper}>
                      <View style={styles.imageWrapper}>
                        <FastImage
                          source={{uri: item.images[3].image}}
                          style={[styles.imageStyle]}
                          resizeMode={FastImage.resizeMode.contain}
                        />
                      </View>
                    </Animated.View>
                  )}
                />
              </View>
            ) : (
              <View style={styles.mainContainer}>
                <Animated.FlatList
                  ref={imageSlider}
                  data={dataImage}
                  keyExtractor={(_, index) => index.toString()}
                  horizontal
                  pagingEnabled
                  initialScrollIndex={imageIdx}
                  showsHorizontalScrollIndicator={false}
                  scrollEventThrottle={16}
                  getItemLayout={getItemLayout}
                  onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {x: scrollX}}}],
                    {useNativeDriver: true},
                  )}
                  renderItem={({item}) => (
                    <Animated.View style={styles.mainImageWrapper}>
                      <View style={styles.imageWrapper}>
                        <FastImage
                          source={{
                            uri: item[3].image,
                          }}
                          style={[styles.imageStyle]}
                          resizeMode={FastImage.resizeMode.contain}
                        />
                      </View>
                    </Animated.View>
                  )}
                />
              </View>
            )}
          </SafeAreaView>
        </Modal>
      )}
    </>
  );
};

export default ImageModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: heightResponsive(55),
    paddingBottom: heightResponsive(65),
  },
  scrollView: {
    alignItems: 'center',
  },
  mainImageWrapper: {
    flex: 1,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    width: width,
    height: undefined,
    aspectRatio: 1 / 2,
  },
  imageStyle: {
    height: '100%',
    width: '100%',
  },
  closeButton: {
    zIndex: 1,
    alignSelf: 'flex-start',
    marginTop: heightPercentage(24),
    marginLeft: widthResponsive(24),
  },
});
