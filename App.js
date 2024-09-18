import React  from 'react'; 
import { AuthContextProvider } from './src/context/authContext';
import AppNavigation from './AppNavigation'

//Entry point for app, initial screen displayed is the login page
const App = () => {
  return (
    //using AuthContextProvider to access AppNavigation
    <AuthContextProvider>
      <AppNavigation />
    </AuthContextProvider>
  );
};

export default App;