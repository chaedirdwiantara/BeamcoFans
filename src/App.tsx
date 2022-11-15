import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Screen
import {EventScreen} from './screen/Event';
import {FeedScreen} from './screen/Feed';
import {ForgotPassword} from './screen/ForgotPassword';
import {HomeScreen} from './screen/Home';
import {LoginScreen} from './screen/Login';
import {OnboardScreen} from './screen/Onboard';
import {Otp} from './screen/Otp';
import {PreferenceScreen} from './screen/Preference';
import {EditProfileScreen} from './screen/Profile/EditProfile';
import {ProfileScreen} from './screen/Profile/Profile';
import {ReferralScreen} from './screen/Referral';
import {SettingScreen} from './screen/Setting/SettingScreen';
import {SignInGuestScreen} from './screen/SignInGuest';
import {SignupScreen} from './screen/Signup';

// Modal
import {ModalConfirm} from './components';

// Icon
import {CrownIcon, FeedIcon, HomeIcon, UserProfileIcon} from './assets/icon';

import Font from './theme/Font';
import Color from './theme/Color';
import {normalize} from './utils';
import {AppProvider} from './context/app.context';

export type RootStackParams = {
  Boarding: undefined;
  EditProfile: undefined;
  ForgotPassword: undefined;
  Login: undefined;
  MainTab: undefined;
  ModalConfirm: undefined;
  Otp: undefined;
  Preference: undefined;
  Referral: undefined;
  Setting: undefined;
  Signup: undefined;
  SignInGuest: undefined;
};

export type MainTabParams = {
  Collection: undefined;
  Event: undefined;
  Feed: undefined;
  Home: undefined;
  Profile: undefined;
  Search: undefined;
};

const screenOption: NativeStackNavigationOptions = {
  headerShown: false,
  gestureEnabled: false,
};

const MainTab = createBottomTabNavigator<MainTabParams>();
const TabScreen = () => (
  <MainTab.Navigator
    screenOptions={{
      tabBarActiveTintColor: Color.Pink[200],
      tabBarInactiveTintColor: Color.Dark[300],
      tabBarShowLabel: false,
      headerShown: false,
      tabBarStyle: {
        paddingBottom: 0,
        height: 64,
        backgroundColor: '#0F1319',
      },
    }}>
    <MainTab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({color}) => (
          <View style={styles.root}>
            <HomeIcon stroke={color} />
            <Text style={[styles.label, {color}]}>{'Home'}</Text>
          </View>
        ),
      }}
    />
    <MainTab.Screen
      name="Feed"
      component={FeedScreen}
      options={{
        tabBarIcon: ({color}) => (
          <View style={styles.root}>
            <FeedIcon stroke={color} />
            <Text style={[styles.label, {color}]}>{'Feed'}</Text>
          </View>
        ),
      }}
    />
    <MainTab.Screen
      name="Event"
      component={EventScreen}
      options={{
        tabBarIcon: ({color}) => (
          <View style={styles.root}>
            <CrownIcon stroke={color} />
            <Text style={[styles.label, {color}]}>{'Event'}</Text>
          </View>
        ),
      }}
    />
    <MainTab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({color}) => (
          <View style={styles.root}>
            <UserProfileIcon stroke={color} />
            <Text style={[styles.label, {color}]}>{'Profile'}</Text>
          </View>
        ),
      }}
    />
  </MainTab.Navigator>
);

const RootStack = createNativeStackNavigator<RootStackParams>();
const RootStackScreen = () => (
  <RootStack.Navigator screenOptions={screenOption}>
    <RootStack.Group>
      <RootStack.Screen name="Boarding" component={OnboardScreen} />
      <RootStack.Screen name="EditProfile" component={EditProfileScreen} />
      <RootStack.Screen name="ForgotPassword" component={ForgotPassword} />
      <RootStack.Screen name="Login" component={LoginScreen} />
      <RootStack.Screen name="Otp" component={Otp} />
      <RootStack.Screen name="Preference" component={PreferenceScreen} />
      <RootStack.Screen name="Referral" component={ReferralScreen} />
      <RootStack.Screen name="Setting" component={SettingScreen} />
      <RootStack.Screen name="SignInGuest" component={SignInGuestScreen} />
      <RootStack.Screen name="Signup" component={SignupScreen} />
      <RootStack.Screen name="MainTab" component={TabScreen} />
    </RootStack.Group>
    <RootStack.Group
      screenOptions={({}) => ({
        presentation: 'transparentModal',
      })}>
      <RootStack.Screen
        name="ModalConfirm"
        component={ModalConfirm}
        options={{
          headerShown: false,
          // @ts-ignore
          animationEnabled: true,
          cardStyle: {backgroundColor: 'rgba(0,0,0,0.01)'},
          cardOverlayEnabled: true,
          // @ts-ignore
          cardStyleInterpolator: ({current: {progress}}) => {
            return {
              cardStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 0.5, 0.9, 1],
                  outputRange: [0, 0.25, 0.7, 1],
                }),
              },
              overlayStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.01],
                  extrapolate: 'clamp',
                }),
              },
            };
          },
        }}
      />
    </RootStack.Group>
  </RootStack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <AppProvider>
        <RootStackScreen />
      </AppProvider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontFamily: Font.InterMedium,
    fontSize: normalize(12),
    marginTop: 2,
  },
});

export default App;
