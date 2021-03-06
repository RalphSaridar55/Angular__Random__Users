import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {View,Text} from 'react-native';

import ProductList from "../screens/Products/product_list";
import ProductDetails from "../screens/Products/product_details";
import AddProduct1 from "../screens/Products/product_add";
import AddProduct2 from "../screens/Products/product_add2";
import AddProduct3 from "../screens/Products/product_add3";
import BulkProduct from "../screens/Products/Bulk";

const PStack = createStackNavigator();
const AddStack = createStackNavigator();

const test = () =>{
  return(
    <View>
      <Text>Testt</Text>
    </View>
  )
}
const AddingProduct = ({ navigation, route }) => {
  return (
    <AddStack.Navigator>
      <AddStack.Screen
        name="Add1"
        component={AddProduct1}
        options={{ headerShown: false }}
        navigrration={navigation}
        route={route}
      />                  
      <AddStack.Screen
        name="Add2"
        component={AddProduct2}
        options={{ headerShown: false }}
        navigation={navigation}
        route={route}
      />
      <AddStack.Screen
        name="Add3"
        component={AddProduct3}
        options={{ headerShown: false }}
        navigation={navigation}
        route={route}
      />
    </AddStack.Navigator>
  );
};

const ProductStack = ({ navigation, route }) => {
  return (
    <PStack.Navigator>
      <PStack.Screen
        name="List"
        component={ProductList}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <PStack.Screen
        name="Detailed"
        component={ProductDetails}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <PStack.Screen
        name="Add"
        component={AddingProduct}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <PStack.Screen
        name="Bulk"
        component={BulkProduct}
        options={{ headerShown: false }}
        navigation={navigation}
      />
    </PStack.Navigator>
  );
};

export default ProductStack;
