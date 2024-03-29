import {StyleSheet} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';
import Color from '../../../theme/Color';
import {
  heightPercentage,
  normalize,
  width,
  widthPercentage,
  widthResponsive,
} from '../../../utils';
import {color, font} from '../../../theme';
import Font from '../../../theme/Font';

const styles = StyleSheet.create({
  root: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    paddingHorizontal: widthResponsive(48),
  },
  containerText: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  preTitle: {
    maxWidth: width * 0.9,
    color: Color.Neutral[10],
    textAlign: 'center',
    marginVertical: mvs(5),
  },
  title: {
    color: Color.Neutral[10],
    maxWidth: width * 0.9,
  },
  textSubtitle: {
    fontSize: mvs(12),
    fontWeight: '500',
    lineHeight: mvs(14.5),
    color: '#788AA9',
    textAlign: 'center',
    maxWidth: width * 0.8,
  },
  description: {
    maxWidth: width * 0.9,
    color: Color.Neutral[50],
    textAlign: 'center',
    marginVertical: mvs(5),
  },
  containerInput: {
    width: '90%',
    marginBottom: mvs(60),
  },
  footer: {
    width: widthPercentage(327),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: mvs(10),
  },
  btnContainer: {
    width: widthPercentage(155),
    aspectRatio: heightPercentage(155 / 46),
  },
  containerSkip: {
    position: 'absolute',
    top: 0,
    right: widthPercentage(30),
    zIndex: 1,
  },
  textSkip: {
    fontSize: mvs(14),
    fontFamily: Font.InterRegular,
    fontWeight: '500',
    lineHeight: mvs(17),
    color: color.Success[400],
  },
  containerActivated: {
    marginBottom: mvs(40),
  },
  containerReferralCode: {
    width: width * 0.8,
    borderColor: Color.Dark[500],
    borderWidth: mvs(1),
    borderRadius: mvs(4),
    paddingVertical: mvs(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerCode: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textFriendRef: {
    color: Color.Neutral[50],
    fontSize: normalize(11),
    marginBottom: mvs(2),
  },
  refCode: {
    color: Color.Neutral[10],
    paddingLeft: ms(5),
  },
  note: {
    textAlign: 'center',
    color: Color.Neutral[10],
    marginVertical: mvs(8),
  },
  qrContainer: {
    width: widthPercentage(200),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.Neutral[10],
    padding: widthPercentage(10),
  },
  cameraContainer: {
    width: 289,
    height: 289,
    backgroundColor: 'white',
  },
});

export default styles;
