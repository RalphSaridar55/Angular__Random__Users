import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import * as API from "../../core/apis/apiProductServices";
import * as apiPortFolioServices from "../../core/apis/apiPortfolioServices";
import { styles } from "./detailedProduct_style";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const screenwidth = Dimensions.get("screen").width;
const screenheight = Dimensions.get("screen").height;

const data = {
  name: "Product 1",
  description: `Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description Item Description `,
  price: 20,
  qty: 5,
  services: [
    { name: "Service 1", price: 100 },
    { name: "Service 2", price: 100 },
    { name: "Service 3", price: 100 },
    { name: "Service 4", price: 100 },
    { name: "Service 5", price: 100 },
    { name: "Service 6", price: 100 },
  ],
};

const detailedOrder = ({ navigation, route }) => {
  const [dataRoute, setDataRoute] = useState();
  const [services, setServices] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    apiPortFolioServices.getProductDetails(route.params.id).then((res)=>{
        console.log("PRODUCT DETAILS: ",res)
        setDataRoute(res);
        setIsVisible(false);
    })
  }, []);

  useEffect(()=>{
    apiPortFolioServices.getProductDetails(route.params.id).then((res)=>{
        console.log("PRODUCT DETAILS: ",res)
        setDataRoute(res);
        setIsVisible(false);
    })
    const willFocusSubscription = navigation.addListener('focus', () => {
      
    apiPortFolioServices.getProductDetails(route.params.id).then((res)=>{
        console.log("PRODUCT DETAILS: ",res)
        setDataRoute(res);
        setIsVisible(false);
    })
  });

  return willFocusSubscription;
  },[])

  return (
    <ScrollView style={{ flex: 1 }}>
      <Spinner visible={isVisible} />
      <View>
        <Image
          resizeMode="contain"
          source={{ uri: dataRoute?.images[0].media }}
          style={styles.image}
        />
      </View>
      <View style={[styles.mainContainer, {}]}>
        <View style={{ paddingBottom: 20, }}>
          <View style={{
                        marginVertical: 20,
                        borderBottomWidth: 1.5,
                        borderBottomColor: "lightgray",}}>
              <View style={{display:'flex',justifyContent:'space-between',flexDirection:'row'}}>
                  <Text
                    style={[
                      styles.name,
                    ]}
                  >
                    {dataRoute?.product_name}
                  </Text>
                <View style={{display:'flex',alignItems:'flex-end',justifyContent:'center'}}>
                    <TouchableOpacity style={{borderRadius:40,backgroundColor:'gray',padding:5}}
                    onPress={()=>navigation.navigate("Edit",{screen:"edit1",params:{...dataRoute,product_id:dataRoute?.productvariant[0].product_id}})}>
                        <Icon name="pencil" size={24} color="white" style={{}}/>
                    </TouchableOpacity>
                </View>
              </View>
          </View>
          <Text style={{ fontSize: 18 }}>{dataRoute?.description}</Text>
        </View>
        <Text
          style={[
            styles.name,
            {
              marginVertical: 20,
              borderBottomWidth:1.5,
              borderBottomColor: "lightgray",
            },
          ]}
        >
          Info
        </Text>
        <View style={styles.twoInfoBox}>
          <View>
            <Text>Width: {dataRoute?.width} cm</Text>
            <Text>Height: {dataRoute?.height} cm</Text>
            <Text>Depth: {dataRoute?.depth} cm</Text>
            <Text>Weight: {dataRoute?.weight} kg</Text>
          </View>
          <View>
            <Text>Price: ${dataRoute?.width}</Text>
            <Text>Offered Price: ${dataRoute?.height}</Text>
            <Text>Min Purchase Qty: {dataRoute?.min_purchase_qty}</Text>
            <Text>Max Purchase Qty: {dataRoute?.max_purchase_qty}</Text>
            <Text>Max Reserve Qty: {dataRoute?.max_reserve_qty}</Text>
          </View>
        </View>
        <View style={styles.twoInfoBox}>
          <View>
            <Text>Warranty: {dataRoute?.warranty_details}</Text>
            <Text>Return days: {dataRoute?.return_day}</Text>
            <Text>Down Payment: {dataRoute?.down_payment}%</Text>
            <Text>Promoted: {dataRoute?.is_promoted ? "Yes" : "No"}</Text>
            <Text>Brand: {dataRoute?.brand.brand_name}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              width: screenwidth * 0.5,
            }}
          >
            {dataRoute?.tags.map((item, index) => {
              return (
                <View style={{ padding: 5 }}>
                  <Text
                    key={index}
                    style={{
                      color: "white",
                      backgroundColor: "#698EB7",
                      paddingHorizontal: 6,
                      paddingVertical: 2,
                      borderRadius: 20,
                    }}
                  >
                    {item.tag_name}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
        <Text
          style={[
            styles.name,
            {
              marginVertical: 20,
              borderBottomWidth: 1.5,
              borderBottomColor: "lightgray",
            },
          ]}
        >
          Services
        </Text>
        <View>
          {dataRoute?.services.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flex: 1,
                }}
              >
                <Text>{item.service_name}</Text>
                <Text>${item.service_cost}</Text>
              </View>
            );
          })}
        </View>
        <Text
          style={[
            styles.name,
            {
              marginVertical: 20,
              borderBottomWidth: 1.5,
              borderBottomColor: "lightgray",
            },
          ]}
        >
          Variants
        </Text>
        {dataRoute?.productvariant.map((item, index) => {
          return (
            <View style={{borderBottomColor:'lightgray',borderBottomWidth:1,paddingBottom:10}}>
            <View style={styles.twoInfoBox} key={index}>
              <View>
                {item.productvariantopt.length>0 &&<><Text>
                  Type: {item.productvariantopt[0].varientType?.varient_type}
                </Text>
                <Text>
                  Value: {item.productvariantopt[0].varientValue?.varient_value}
                </Text></>}
                <Text>By Piece: {item.is_variant_by_piece ? "Yes" : "No"}</Text>
                {item.is_variant_by_piece && <Text>Variant Piece: {item.variant_by_piece}</Text>}
                <Text>By Stock: {item.is_variant_stock ? "Yes" : "No"}</Text>
                {item.is_variant_stock && <Text>Variant Stock: {item.variant_stock}</Text>}
                <Text>Min Qty: {item.is_variant_min_qty ? "Yes" : "No"}</Text>
                {item.is_variant_min_qty && <Text>Variant Min. Qty: {item.variant_min_qty}</Text>}
                <Text>Discount: {item.is_discount ? "Yes" : "No"}</Text>
                {item.is_discount &&<><Text>Discount Start:{'\n'} {(new Date(parseInt(item.discount_start_date))+"").substr(0,15)}</Text><Text>Discount End:{'\n'} {(new Date(parseInt(item.discount_end_date))+"").substr(0,15)}</Text></>}
              </View>
              <View>
                <Image
                  source={{ uri: item.variant_image }}
                  resizeMode="contain"
                  style={[
                    styles.image,
                    { width: screenwidth * 0.5, height: screenheight * 0.2 },
                  ]}
                />
              </View>
            </View>
            <View style={{marginTop:10,display:'flex',alignItems:'flex-end'}}>
                <TouchableOpacity style={{borderRadius:40,backgroundColor:'gray',padding:5}}
                onPress={()=>navigation.navigate("AddVariant",{...item,category_id:dataRoute.category_id,type:'edit'})}>
            <Icon name="pencil" size={24} color="white" style={{}}/>
                  </TouchableOpacity>
            </View>
            </View>
          );
        })}
        <View style={styles.BtnContainer}>
        <TouchableOpacity
          style={styles.Btn}
          onPress={
            () =>navigation.navigate("AddVariant",dataRoute.id)
          }
        >
          <Icon name="plus-thick" size={30} color="white" />
        </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default detailedOrder;
