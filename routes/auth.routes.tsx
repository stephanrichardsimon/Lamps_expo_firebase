import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Registration from '../pages/Registration';
import Import from '../pages/Import/index.js';
import Settings from '../pages/Settings/index.js';

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Login" component={Login} />
      <Screen name="Registration" component={Registration} />
      <Screen name="Home" component={Home} />
      <Screen name="Import" component={Import} />
      <Screen name="Settings" component={Settings} />
    </Navigator>
  );
}