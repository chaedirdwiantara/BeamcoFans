import { StyleSheet } from 'react-native';
import { mvs } from 'react-native-size-matters';
import { color, font } from '../../../theme';
import { normalize } from '../../../utils';

const topNavstyles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: mvs(1),
        borderBottomColor: color.Dark[300],
        paddingTop: mvs(44),
        paddingBottom: mvs(24),
      },
      leftContainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems:'center',
      },
      centerContainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems:'center',
      },
      rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems:'center',
      },
      centerTitle: {
        fontfamily: font.MontserratRegular,
        textAlign: 'center',
        fontSize: normalize(16),
        fontWeight: '600',
        lineHeight: mvs(20),
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
