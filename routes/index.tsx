import React from "react";
import { NavigationContainer } from '@react-navigation/native';
// import Home from '../pages/Home';
import { AuthRoutes } from './auth.routes';

export function Routes() {
  return (
    <NavigationContainer>
      <AuthRoutes />
    </NavigationContainer>
  );
}
