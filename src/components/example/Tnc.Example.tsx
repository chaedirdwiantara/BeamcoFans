import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {TermAndConditions} from '../molecule';

const TncExample = () => {
  const [term, setTerm] = useState(false);
  const handleOnPress = () => {
    setTerm(!term);
  };
  return <TermAndConditions handleOnPress={handleOnPress} active={term} />;
};

export default TncExample;

const styles = StyleSheet.create({});
