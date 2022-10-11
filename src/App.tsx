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
import {HomeScreen} from './screen/Home';
import {SearchScreen} from './screen/Search';
import {FeedScreen} from './screen/Feed';
import {CollectionScreen} from './screen/Collection';
import HomeIcon from './assets/icon/Home.icon';
import SearchIcon from './assets/icon/Search.icon';
import FeedIcon from './assets/icon/Feed.icon';
import CollectionIcon from './assets/icon/Collection.icon';

export type RootStackParams = {
  Boarding: undefined;
  Login: undefined;
  Signup: undefined;
  MainTab: undefined;
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
      tabBarActiveTintColor: '#00AA49',
      tabBarInactiveTintColor: '#48546A',
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
  <RootStack.Navigator screenOptions={screenOption}>
    <RootStack.Screen name="Boarding" component={OnboardScreen} />
    <RootStack.Screen name="Login" component={LoginScreen} />
    <RootStack.Screen name="Signup" component={SignupScreen} />
    <RootStack.Screen name="MainTab" component={TabScreen} />
  </RootStack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  );
};

export default App;
