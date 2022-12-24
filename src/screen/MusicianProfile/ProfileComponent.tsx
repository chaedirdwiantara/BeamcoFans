import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {Gap, Title} from '../../components';
import {color, font} from '../../theme';
import {widthResponsive} from '../../utils';
import {ms} from 'react-native-size-matters';
import {
  FbIcon,
  InstagramIcon,
  SnapchatIcon,
  TiktokIcon,
  TwitterIcon,
  VkIcon,
  WeiboIcon,
} from '../../assets/icon';

interface ProfileProps {
  title: string;
  content?: string;
  gap?: number;
  socmed?: boolean;
}

const ProfileComponent: FC<ProfileProps> = (props: ProfileProps) => {
  const {title, content, gap = 8, socmed} = props;
  return (
    <View style={{paddingHorizontal: widthResponsive(24)}}>
      <Title text={title} />
      <Gap height={gap} />
      {content && <Text style={styles.captionStyle}>{content}</Text>}
      {socmed && (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity>
            <FbIcon />
          </TouchableOpacity>
          <Gap width={16} />
          <TouchableOpacity>
            <TwitterIcon />
          </TouchableOpacity>
          <Gap width={16} />
          <TouchableOpacity>
            <InstagramIcon />
          </TouchableOpacity>
          <Gap width={16} />
          <TouchableOpacity>
            <TiktokIcon />
          </TouchableOpacity>
          <Gap width={16} />
          <TouchableOpacity>
            <SnapchatIcon />
          </TouchableOpacity>
          <Gap width={16} />
          <TouchableOpacity>
            <VkIcon style={{marginTop: ms(-3)}} />
          </TouchableOpacity>
          <Gap width={16} />
          <TouchableOpacity>
            <WeiboIcon />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ProfileComponent;

const styles = StyleSheet.create({
  captionStyle: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: ms(12),
  },
});
