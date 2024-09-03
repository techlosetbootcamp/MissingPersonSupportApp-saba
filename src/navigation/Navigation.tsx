

// import React, { useState, useEffect } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { firebase } from '@react-native-firebase/auth';
// import Register from "../screens/register/Register";
// import Login from "../screens/login/Login";
// import ForgotPassword from '../screens/forgotPassword/ForgotPassword';
// import Splash from "../screens/splash/Splash";
// import BottomNavigation from './BottomNavigation';
// import ReportForm from "../screens/reportForm/ReportForm";
// import FilterReport from "../screens/filterReport/FilterReport";
// import ProfileScreen from '../screens/profile/Profile';
// import { FirebaseAuthTypes } from '@react-native-firebase/auth'; // Import the correct types

// const Stack = createNativeStackNavigator();

// export default function Navigation() {
//   // Adjust the state to accommodate both null and User types
//   const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

//   useEffect(() => {
//     const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
//       setUser(user); // Set the user when authenticated
//     });

//     return unsubscribe; // Clean up the subscription on unmount
//   }, []);

//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         {user ? (
//           <>
//             <Stack.Screen name="MainTabs" component={BottomNavigation} />
//             <Stack.Screen name="ReportForm" component={ReportForm} />
//             <Stack.Screen name="FilterReport" component={FilterReport} />
//             <Stack.Screen name="Profile" component={ProfileScreen} />
//           </>
//         ) : (
//           <>
//             <Stack.Screen name="Splash" component={Splash} />
//             <Stack.Screen name="Login" component={Login} />
//             <Stack.Screen name="Register" component={Register} />
           
//             <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
//           </>
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }


import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { firebase } from '@react-native-firebase/auth';
import Register from "../screens/register/Register";
import Login from "../screens/login/Login";
import ForgotPassword from '../screens/forgotPassword/ForgotPassword';
import Splash from "../screens/splash/Splash";
import BottomNavigation from './BottomNavigation';
import ReportForm from "../screens/reportForm/ReportForm";
import FilterReport from "../screens/filterReport/FilterReport";
import ProfileScreen from '../screens/profile/Profile';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import News from "../screens/news/News"
// import { } from 
// Define the types for each screen

export type RootStackParams ={

  Profile:undefined;
  MainTabs:undefined;
  ReportForm:undefined;
  FilterReport:undefined;
  Splash:undefined;
  Login:undefined;
  Register:undefined;
  ForgotPassword:undefined;
  News:undefined;
Home:undefined;
}
const Stack = createNativeStackNavigator<RootStackParams>();  // Use the defined type

export default function Navigation() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="MainTabs" component={BottomNavigation} />
            <Stack.Screen name="ReportForm" component={ReportForm} />
            <Stack.Screen name="FilterReport" component={FilterReport} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="News" component={News} />
          </>
        ) : (
          <>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

