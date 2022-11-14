import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {color} from '../../theme';
import {NotificationCard} from '../../components';
import {notifData} from '../../data/notification';

export const Notification = () => {
  return (
    <SafeAreaView style={styles.root}>
      <NotificationCard data={notifData} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
});
