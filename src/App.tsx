import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {OnboardScreen} from './screen/Onboard';
import {LoginScreen} from './screen/Login';
import {SignupScreen} from './screen/Signup';
import {SignInGuestScreen} from './screen/SignInGuest';
import {HomeScreen} from './screen/Home';
import {SearchScreen} from './screen/Search';
import {FeedScreen} from './screen/Feed';
import {CollectionScreen} from './screen/Collection';
import {PreferenceScreen} from './screen/Preference';
import {ReferralScreen} from './screen/Referral';
import {ModalConfirm} from './components';
import {ForgotPassword} from './screen/ForgotPassword';
import {Otp} from './screen/Otp';
import {Notification} from './screen/Notification';

import HomeIcon from './assets/icon/Home.icon';
import SearchIcon from './assets/icon/Search.icon';
import FeedIcon from './assets/icon/Feed.icon';
import CollectionIcon from './assets/icon/Collection.icon';
import Color from './theme/Color';
import {storage} from './hooks/use-storage.hook';

import {AppProvider} from './context/app.context';

export type RootStackParams = {
  Boarding: undefined;
  Login: undefined;
  Signup: undefined;
  MainTab: undefined;
  SignInGuest: undefined;
  Preference: undefined;
  Referral: undefined;
  ModalConfirm: undefined;
  ForgotPassword: undefined;
  Otp: undefined;
  Notification: undefined;
};

export type MainTabParams = {
  Home: undefined;
  Search: undefined;
  Feed: undefined;
  Collection: undefined;
};

const screenOption: NativeStackNavigationOptions = {
  headerShown: false,
  gestureEnabled: false,
};

const MainTab = createBottomTabNavigator<MainTabParams>();
const TabScreen = () => (
  <MainTab.Navigator
    screenOptions={{
      tabBarActiveTintColor: Color.Success[700],
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
        tabBarIcon: ({color}) => <HomeIcon stroke={color} />,
      }}
    />
    <MainTab.Screen
      name="Search"
      component={SearchScreen}
      options={{
        tabBarIcon: ({color}) => <SearchIcon stroke={color} />,
      }}
    />
    <MainTab.Screen
      name="Feed"
      component={FeedScreen}
      options={{
        tabBarIcon: ({color}) => <FeedIcon stroke={color} />,
      }}
    />
    <MainTab.Screen
      name="Collection"
      component={CollectionScreen}
      options={{
        tabBarIcon: ({color}) => <CollectionIcon stroke={color} />,
      }}
    />
  </MainTab.Navigator>
);

const RootStack = createNativeStackNavigator<RootStackParams>();
const RootStackScreen = () => (
  <RootStack.Navigator
    screenOptions={screenOption}
    initialRouteName={
      storage.getBoolean('isOnboard') ? 'SignInGuest' : 'Boarding'
    }>
    <RootStack.Group>
      <RootStack.Screen name="Boarding" component={OnboardScreen} />
      <RootStack.Screen name="Login" component={LoginScreen} />
      <RootStack.Screen name="Signup" component={SignupScreen} />
      <RootStack.Screen name="SignInGuest" component={SignInGuestScreen} />
      <RootStack.Screen name="Preference" component={PreferenceScreen} />
      <RootStack.Screen name="Referral" component={ReferralScreen} />
      <RootStack.Screen name="MainTab" component={TabScreen} />
      <RootStack.Screen name="ForgotPassword" component={ForgotPassword} />
      <RootStack.Screen name="Otp" component={Otp} />
      <RootStack.Screen name="Notification" component={Notification} />
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

export default App;
