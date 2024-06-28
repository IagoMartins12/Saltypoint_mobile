import {StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS} from '../theme/theme';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import CustomIcon from '../components/CustomIcon';
import FavoriteScreen from '../screens/FavoriteScreen';
import SettingsScreen from '../screens/SettingsScreen';
import RewardScreen from '../screens/RewardScreen';
import useTheme from '../hooks/useTheme';
import MyText from '../components/Text';
import usePrivateStore from '../hooks/store/usePrivateStore';
import {getCartTotalLenght} from '../utils';
import useAuth from '../hooks/auth/useAuth';
import useGlobalStore from '../hooks/store/useGlobalStore';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const {currentTheme} = useTheme();
  const {products} = useGlobalStore();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [
          styles.tabBarStyle,
          {
            backgroundColor:
              currentTheme === 'light'
                ? COLORS.backgroundColorLight
                : COLORS.backgroundColorDark,
          },
        ],
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <CustomIcon
              name="home"
              size={25}
              color={
                focused
                  ? COLORS.primaryRedHex
                  : currentTheme === 'dark'
                  ? COLORS.iconColorDark
                  : COLORS.iconColorLight
              }
              pack="Feather"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Reward"
        component={RewardScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <CustomIcon
              name="award"
              size={25}
              color={
                focused
                  ? COLORS.primaryRedHex
                  : currentTheme === 'dark'
                  ? COLORS.iconColorDark
                  : COLORS.iconColorLight
              }
              pack="Feather"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            const {cart_product, user} = usePrivateStore();
            const cartProductLength = getCartTotalLenght(cart_product);

            return (
              <View
                style={{
                  position: 'relative',
                }}>
                {user && (
                  <View
                    style={{
                      position: 'absolute',
                      top: -10,
                      left: 8,
                      width: 16,
                      height: 16,
                      borderRadius: 10000,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor:
                        currentTheme === 'dark'
                          ? COLORS.iconBgDark
                          : COLORS.iconBgLight,
                    }}>
                    <MyText
                      style={{
                        fontSize: 11,
                        fontWeight: 'bold',
                      }}>
                      {cart_product.length}
                    </MyText>
                  </View>
                )}

                <CustomIcon
                  name="shopping-cart"
                  size={25}
                  color={
                    focused
                      ? COLORS.primaryRedHex
                      : currentTheme === 'dark'
                      ? COLORS.iconColorDark
                      : COLORS.iconColorLight
                  }
                  pack="Feather"
                />
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <CustomIcon
              name="heart"
              size={25}
              color={
                focused
                  ? COLORS.primaryRedHex
                  : currentTheme === 'dark'
                  ? COLORS.iconColorDark
                  : COLORS.iconColorLight
              }
              pack="Feather"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <CustomIcon
              name="settings"
              size={25}
              color={
                focused
                  ? COLORS.primaryRedHex
                  : currentTheme === 'dark'
                  ? COLORS.iconColorDark
                  : COLORS.iconColorLight
              }
              pack="Feather"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 50,
    position: 'absolute',
    borderTopWidth: 0,
    borderTopColor: 'transparent',
  },
  BlurViewStyles: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default TabNavigator;
