import * as React from 'react';
import Svg, {
  Path,
  Circle,
  Defs,
  Stop,
  RadialGradient,
  Rect,
  G,
  ClipPath,
} from 'react-native-svg';
import {View} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';
import {SvgProps} from '../../interface/svg.interface';

function ReferralQRImage({
  width = ms(221),
  height = mvs(221),
  fill = 'none',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'221px'} fill={fill} viewBox={'0 0 221 221'}>
        <Circle cx="110.5" cy="110.5" r="110.5" fill="#FFE0F8" />
        <Defs>
          <RadialGradient
            id="gradient"
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%">
            <Stop offset="0%" stopColor="#FFBDEA" stopOpacity={1} />
            <Stop offset="100%" stopColor="#FDB4E9" stopOpacity={1} />
          </RadialGradient>
        </Defs>
        <RadialGradient
          id="circleGradient"
          cx="110.5"
          cy="128.916"
          r="67.5278"
          fx="110.5"
          fy="128.916"
          gradientUnits="userSpaceOnUse">
          <Stop offset="0%" stopColor="#FFBDEA" stopOpacity={1} />
          <Stop offset="100%" stopColor="#FDB4E9" stopOpacity={1} />
        </RadialGradient>

        <Rect
          x="49.1113"
          y="49.1113"
          width="122.778"
          height="122.778"
          rx="12.2778"
          fill="white"
        />

        <G clipPath="url(#clip0_182_24635)">
          <Path
            d="M76.6682 72.3027C75.5104 72.3027 74.4 72.7627 73.5813 73.5813C72.7627 74.4 72.3027 75.5104 72.3027 76.6682V94.1299H94.1299V72.3027H76.6682ZM88.6731 88.6731H77.7595V77.7595H88.6731V88.6731Z"
            fill="#141921"
          />
          <Path
            d="M72.3027 144.332C72.3027 145.49 72.7627 146.6 73.5813 147.419C74.4 148.238 75.5104 148.698 76.6682 148.698H94.1299V126.871H72.3027V144.332ZM77.7595 132.327H88.6731V143.241H77.7595V132.327Z"
            fill="#141921"
          />
          <Path
            d="M126.869 148.698H144.331C145.489 148.698 146.599 148.238 147.418 147.419C148.236 146.6 148.696 145.49 148.696 144.332V126.871H126.869V148.698ZM132.326 132.327H143.24V143.241H132.326V132.327Z"
            fill="#141921"
          />
          <Path
            d="M144.331 72.3027H126.869V94.1299H148.696V76.6682C148.696 75.5104 148.236 74.4 147.418 73.5813C146.599 72.7627 145.489 72.3027 144.331 72.3027ZM143.24 88.6731H132.326V77.7595H143.24V88.6731Z"
            fill="#141921"
          />
          <Path
            d="M115.959 88.6731V83.2163H105.045V94.1299H110.502V88.6731H115.959Z"
            fill="#141921"
          />
          <Path
            d="M94.1309 94.1299H99.5876V99.5867H94.1309V94.1299Z"
            fill="#141921"
          />
          <Path
            d="M99.5859 99.5869H110.5V105.044H99.5859V99.5869Z"
            fill="#141921"
          />
          <Path
            d="M115.956 77.7595V83.2163H121.413V72.3027H99.5859V83.2163H105.043V77.7595H115.956Z"
            fill="#141921"
          />
          <Path
            d="M72.3027 99.5869H77.7595V110.5H72.3027V99.5869Z"
            fill="#141921"
          />
          <Path
            d="M94.1299 105.044V110.5H88.6731V99.5869H83.2163V110.5H77.7595V115.957H72.3027V121.414H83.2163V115.957H88.6731V121.414H94.1299V115.957H99.5867V105.044H94.1299Z"
            fill="#141921"
          />
          <Path
            d="M115.957 105.044H121.414V110.501H126.87V105.044H132.327V99.5869H121.414V88.6733H115.957V94.1301H110.5V99.5869H115.957V105.044Z"
            fill="#141921"
          />
          <Path
            d="M110.5 143.241H99.5859V148.698H121.413V143.241H115.956V137.784H110.5V143.241Z"
            fill="#141921"
          />
          <Path
            d="M121.415 115.957V110.5H115.959V105.043H110.502V110.5H105.045V115.957H110.502V121.414H115.959V115.957H121.415Z"
            fill="#141921"
          />
          <Path
            d="M143.242 115.957H148.699V121.414H143.242V115.957Z"
            fill="#141921"
          />
          <Path
            d="M121.414 115.957H137.784V121.414H121.414V115.957Z"
            fill="#141921"
          />
          <Path
            d="M143.239 99.5869H137.782V105.044H132.325V110.5H137.782V115.957H143.239V110.5H148.696V105.044H143.239V99.5869Z"
            fill="#141921"
          />
          <Path
            d="M115.955 121.414H121.412V137.784H115.955V121.414Z"
            fill="#141921"
          />
          <Path
            d="M99.5859 137.784H105.043V132.327H110.5V126.871H105.043V115.957H99.5859V137.784Z"
            fill="#141921"
          />
        </G>
        <Circle cx="25" cy="196" r="24" fill="#FEB9FF" />
        <Path
          d="M16.5 188C16.5 187.204 16.8161 186.441 17.3787 185.879C17.9413 185.316 18.7044 185 19.5 185H28.5C29.2956 185 30.0587 185.316 30.6213 185.879C31.1839 186.441 31.5 187.204 31.5 188V206C31.5 206.796 31.1839 207.559 30.6213 208.121C30.0587 208.684 29.2956 209 28.5 209H19.5C18.7044 209 17.9413 208.684 17.3787 208.121C16.8161 207.559 16.5 206.796 16.5 206V188ZM25.5 204.5C25.5 204.102 25.342 203.721 25.0607 203.439C24.7794 203.158 24.3978 203 24 203C23.6022 203 23.2206 203.158 22.9393 203.439C22.658 203.721 22.5 204.102 22.5 204.5C22.5 204.898 22.658 205.279 22.9393 205.561C23.2206 205.842 23.6022 206 24 206C24.3978 206 24.7794 205.842 25.0607 205.561C25.342 205.279 25.5 204.898 25.5 204.5Z"
          fill="#FD93FF"
        />
        <Circle cx="189" cy="25" r="24" fill="#FEB9FF" />
        <Path
          d="M198.5 23.9V17.1C198.5 15.6 197.86 15 196.27 15H192.23C190.64 15 190 15.6 190 17.1V23.9C190 25.4 190.64 26 192.23 26H196.27C197.86 26 198.5 25.4 198.5 23.9Z"
          fill="#FFE0F8"
        />
        <Path
          d="M188 26.1V32.9C188 34.4 187.36 35 185.77 35H181.73C180.14 35 179.5 34.4 179.5 32.9V26.1C179.5 24.6 180.14 24 181.73 24H185.77C187.36 24 188 24.6 188 26.1Z"
          fill="#FFE0F8"
        />
        <Path
          opacity="0.4"
          d="M198.5 32.9V30.1C198.5 28.6 197.86 28 196.27 28H192.23C190.64 28 190 28.6 190 30.1V32.9C190 34.4 190.64 35 192.23 35H196.27C197.86 35 198.5 34.4 198.5 32.9Z"
          fill="#EF62F2"
        />
        <Path
          opacity="0.4"
          d="M188 19.9V17.1C188 15.6 187.36 15 185.77 15H181.73C180.14 15 179.5 15.6 179.5 17.1V19.9C179.5 21.4 180.14 22 181.73 22H185.77C187.36 22 188 21.4 188 19.9Z"
          fill="#EF62F2"
        />

        <Defs>
          <ClipPath id="clip0_182_24635">
            <Rect
              width="98.2222"
              height="98.2222"
              fill="white"
              transform="translate(61.3887 61.3892)"
            />
          </ClipPath>
        </Defs>
      </Svg>
    </View>
  );
}

export default ReferralQRImage;