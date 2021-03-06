import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {View,Text} from 'react-native';

import Negotiations from "../screens/Negotiations/Negotiation";
import NegotiationList from "../screens/Negotiations/NegotiationList";

const NSTack = createStackNavigator();

const ProductStack = ({ navigation, route }) => {
  return (
    <NSTack.Navigator>
    <NSTack.Screen
      name="NegotiationList"
      component={NegotiationList}
      options={{ headerShown: false }}
      navigation={navigation}
    />
      <NSTack.Screen
        name="Negotiation"
        component={Negotiations}
        options={{ headerShown: false }}
        navigation={navigation}
      />
    </NSTack.Navigator>
  );
};

export default ProductStack;
