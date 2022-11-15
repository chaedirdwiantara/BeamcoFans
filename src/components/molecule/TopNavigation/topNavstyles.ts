import {Platform, StyleSheet,StatusBar} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {color} from '../../../theme';
import {normalize} from '../../../utils';
import { heightPercentage } from '../../../utils/dimensionFormat';

const topNavstyles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: mvs(1),
    borderBottomColor: color.Dark[300],
    paddingTop: Platform.OS === 'ios' ? 0 :  heightPercentage(24),
    paddingBottom: heightPercentage(24),
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
    fontWeight: '600',
    fontSize: normalize(16),
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
