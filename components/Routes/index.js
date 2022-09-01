import React from "react";
import Home from './pages/Home';
import Import from './pages/Import/index.js';
import Settings from './pages/Settings/index.js';
import Registration from './pages/Registration/index.js';

const Routes = props => {

  const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Navigator>
                <Stack.Screen options={{ title: 'Cadastro' }} name="Registration" component={Registration} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen options={{ title: 'Histórico' }} name="Import" component={Import} />
                <Stack.Screen options={{ title: 'Seus dados' }} name="Settings" component={Settings} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;