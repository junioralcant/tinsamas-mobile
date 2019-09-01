import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Login from './pages/Login';
import Main from './pages/Main';
import SignUp from './pages/SignUp';

export default createAppContainer(
  createSwitchNavigator({
    Login,
    Main,
    SignUp,
  }),
);
