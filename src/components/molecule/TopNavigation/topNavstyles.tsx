import {StyleSheet} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {normalize} from '../../../utils';
import {color, font} from '../../../theme';
import {heightPercentage} from '../../../utils/dimensionFormat';

const topNavstyles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: mvs(1),
    borderBottomColor: color.Dark[300],
    paddingTop: heightPercentage(20),
    paddingBottom: heightPercentage(20),
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  centerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  centerTitle: {
    fontSize: normalize(16),
    fontFamily: font.InterSemiBold,
    lineHeight: mvs(20),
    letterSpacing: 0.15,
    textAlign: 'center',
  },
  iconLeftContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  iconRightContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

export default topNavstyles;
