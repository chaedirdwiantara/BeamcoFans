import { View, Text } from 'react-native'
import React from 'react'
import { SsuText } from '../atom/Text/SsuText'
import { color } from '../../theme'

const TextExample = () => {
  return (
    <View>
      <SsuText.Headline.Large>Update your password</SsuText.Headline.Large>
      <SsuText.Headline.Default>Select your expectation as a fans</SsuText.Headline.Default>
      <SsuText.Headline.Small color={color.Success[500]}>SSU Warehouse Project</SsuText.Headline.Small>
      <SsuText.Headline.Tiny>Top Musician</SsuText.Headline.Tiny>
    </View>
  )
}

export default TextExample