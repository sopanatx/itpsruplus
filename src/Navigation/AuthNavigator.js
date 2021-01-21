import React, {useState, useEffect, createContext} from 'react';
import SignInStack from './SignInStack';
import SignOutStack from './SignOutStack';
import AsyncStorage from '@react-native-community/async-storage';

export default function AuthNavigator() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  // Handle user state changes
  function onAuthStateChanged(result) {
    setUser(result);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    //  const authSubscriber = auth().onAuthStateChanged(onAuthStateChanged)
    const token = AsyncStorage.getItem('token')
      .then((result) => {
        onAuthStateChanged(result);
      })
      .catch((err) => {
        onAuthStateChanged(err);
      });
    // unsubscribe on unmount
    return token;
  }, []);

  if (initializing) {
    return null;
  }

  return user ? (
    <AuthContext.Provider value={user}>
      <SignInStack />
    </AuthContext.Provider>
  ) : (
    <SignOutStack />
  );
}
export const AuthContext = createContext(null);
