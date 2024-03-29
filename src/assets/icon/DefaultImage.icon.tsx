import * as React from 'react';
import {View} from 'react-native';
import Svg, {Rect, Path} from 'react-native-svg';
import {widthResponsive} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function SongCover({
  width = widthResponsive(148),
  height = widthResponsive(148),
  fill = 'none',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 148 148'}>
        <Rect width={148} height={148} rx={8} fill="#222731" />
        <Path
          d="M63.253 102.667c-6.987 0-12.667-5.68-12.667-12.667s5.68-12.666 12.667-12.666c6.986 0 12.666 5.68 12.666 12.666 0 6.987-5.68 12.667-12.666 12.667zm0-21.334c-4.774 0-8.667 3.894-8.667 8.667s3.893 8.667 8.667 8.667c4.773 0 8.666-3.894 8.666-8.667s-3.866-8.666-8.666-8.666z"
          fill="#8794AD"
        />
        <Path
          d="M73.919 92c-1.093 0-2-.907-2-2V52.666c0-1.093.907-2 2-2s2 .907 2 2V90c0 1.093-.88 2-2 2z"
          fill="#8794AD"
        />
        <Path
          d="M93.015 69.28c-.88 0-1.813-.16-2.72-.454l-11.787-3.92c-3.68-1.226-6.56-5.226-6.56-9.093v-3.147c0-2.586 1.067-4.826 2.88-6.16 1.84-1.333 4.294-1.6 6.747-.8l11.787 3.92c3.68 1.227 6.56 5.227 6.56 9.094v3.12c0 2.586-1.067 4.826-2.88 6.16-1.147.88-2.56 1.28-4.027 1.28zm-14.16-20.027c-.64 0-1.227.16-1.68.507-.8.56-1.227 1.6-1.227 2.906v3.12c0 2.134 1.787 4.614 3.814 5.307l11.786 3.92c1.227.427 2.374.32 3.147-.24.8-.56 1.227-1.6 1.227-2.907v-3.12c0-2.133-1.787-4.613-3.814-5.306l-11.786-3.92a4.279 4.279 0 00-1.467-.267z"
          fill="#8794AD"
        />
      </Svg>
    </View>
  );
}

function PlaylistCover({
  width = widthResponsive(148),
  height = widthResponsive(148),
  fill = 'none',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 148 148'}>
        <Rect width={148} height={148} rx={8} fill="#222731" />
        <Path
          d="M58.746 102.666c-5.68 0-10.32-4.64-10.32-10.32 0-5.68 4.64-10.32 10.32-10.32 5.68 0 10.32 4.64 10.32 10.32 0 5.68-4.64 10.32-10.32 10.32zm0-16.64a6.316 6.316 0 00-6.32 6.32 6.316 6.316 0 006.32 6.32 6.316 6.316 0 006.32-6.32 6.316 6.316 0 00-6.32-6.32z"
          fill="#8794AD"
        />
        <Path
          d="M67.066 94.346c-1.093 0-2-.906-2-2V58.8c0-4.214 2.534-7.52 6.587-8.614l16.64-4.533c3.387-.933 6.24-.587 8.24.96 2.027 1.547 3.04 4.133 3.04 7.68v32.533c0 1.094-.907 2-2 2s-2-.906-2-2v-32.56c0-1.546-.267-3.573-1.467-4.48-1.306-1.013-3.546-.613-4.773-.266l-16.64 4.533c-2.32.64-3.627 2.373-3.627 4.773v33.547c0 1.067-.906 1.973-2 1.973z"
          fill="#8794AD"
        />
        <Path
          d="M89.254 97.12c-5.68 0-10.32-4.64-10.32-10.32 0-5.68 4.64-10.32 10.32-10.32 5.68 0 10.32 4.64 10.32 10.32 0 5.68-4.64 10.32-10.32 10.32zm0-16.64a6.316 6.316 0 00-6.32 6.32 6.316 6.316 0 006.32 6.32 6.316 6.316 0 006.32-6.32 6.316 6.316 0 00-6.32-6.32zM67.067 69.387c-.88 0-1.68-.587-1.92-1.467-.293-1.067.32-2.187 1.387-2.48l30.507-8.32c1.066-.293 2.16.347 2.453 1.413.293 1.067-.347 2.16-1.413 2.454l-30.48 8.32a1.99 1.99 0 01-.534.08z"
          fill="#8794AD"
        />
      </Svg>
    </View>
  );
}

function PlaylistHomeCover({
  width = widthResponsive(148),
  height = widthResponsive(148),
  fill = 'none',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 148 148'}>
        <Rect width={148} height={148} fill="#222731" />
        <Path
          d="M58.746 102.666c-5.68 0-10.32-4.64-10.32-10.32 0-5.68 4.64-10.32 10.32-10.32 5.68 0 10.32 4.64 10.32 10.32 0 5.68-4.64 10.32-10.32 10.32zm0-16.64a6.316 6.316 0 00-6.32 6.32 6.316 6.316 0 006.32 6.32 6.316 6.316 0 006.32-6.32 6.316 6.316 0 00-6.32-6.32z"
          fill="#8794AD"
        />
        <Path
          d="M67.066 94.346c-1.093 0-2-.906-2-2V58.8c0-4.214 2.534-7.52 6.587-8.614l16.64-4.533c3.387-.933 6.24-.587 8.24.96 2.027 1.547 3.04 4.133 3.04 7.68v32.533c0 1.094-.907 2-2 2s-2-.906-2-2v-32.56c0-1.546-.267-3.573-1.467-4.48-1.306-1.013-3.546-.613-4.773-.266l-16.64 4.533c-2.32.64-3.627 2.373-3.627 4.773v33.547c0 1.067-.906 1.973-2 1.973z"
          fill="#8794AD"
        />
        <Path
          d="M89.254 97.12c-5.68 0-10.32-4.64-10.32-10.32 0-5.68 4.64-10.32 10.32-10.32 5.68 0 10.32 4.64 10.32 10.32 0 5.68-4.64 10.32-10.32 10.32zm0-16.64a6.316 6.316 0 00-6.32 6.32 6.316 6.316 0 006.32 6.32 6.316 6.316 0 006.32-6.32 6.316 6.316 0 00-6.32-6.32zM67.067 69.387c-.88 0-1.68-.587-1.92-1.467-.293-1.067.32-2.187 1.387-2.48l30.507-8.32c1.066-.293 2.16.347 2.453 1.413.293 1.067-.347 2.16-1.413 2.454l-30.48 8.32a1.99 1.99 0 01-.534.08z"
          fill="#8794AD"
        />
      </Svg>
    </View>
  );
}

export const DefaultImage = {SongCover, PlaylistCover, PlaylistHomeCover};
