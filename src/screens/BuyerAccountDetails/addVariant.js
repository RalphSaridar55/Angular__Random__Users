import React, { Component } from "react";
import * as Progress from "react-native-progress";
import * as APIProduct from "../../core/apis/apiProductServices";
import { addElements3 } from "./add_elements_3";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import DateRangePicker from "rn-select-date-range";
import Spinner from "react-native-loading-spinner-overlay";
import {
  View,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
  LogBox,
  Text,
  SafeAreaView,
  Dimensions,
  StyleSheet,
} from "react-native";
import { TextInput, Switch } from "react-native-paper";
import styles from "./add_style";

const screenwidth = Dimensions.get("screen").width;
const screenheight = Dimensions.get("screen").height;

export default class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFromRoute:{},
      variants: [],
      variant_stock_qty_switch: false,
      variant_stock_qty: 0,
      variant_stock_qty_error: 0,
      variant_piece_qty_switch: false,
      variant_piece_qty: 0,
      variant_piece_qty_error: 0,
      variant_package_qty_switch: false,
      variant_package_qty: 0,
      variant_package_qty_error: 0,
      variant_discount_switch: false,
      variant_discount: 0,
      variant_discount_error: 0,
      variant_start: 0,
      variant_end: 0,
      variant_minqty_switch: false,
      variant_minqty: 0,
      variant_minqty_error: 0,

      filter_variant_list: [],
      variant_type_list: [],
      variant_type: {},
      variant_value_list: [],
      variant_value: {},
      variantImage: "",
      loading: true,

      range: null,
      startDate: null,
      endDate: null,
    };
  }

  setDates = (dates) => {
    console.log("date:", dates);
    this.setState({
      date: { ...dates },
    });
  };

  submit = () => {
    this.setState({loading:true})
    let start = 0;
    let end = 0;
    if(this.state.variant_discount>100){
        Alert.alert("Error", "Variant discount must be lesser than 100");
        this.setState({ loading: false });
        return;
    }
    if(this.state.range!==null){
      //console.log("DATE BECOMES: ",this.state.range.firstDate,typeof(this.state.range.firstDate),"\n",this.state.range.secondDate,typeof(this.state.range.secondDate))
      start = (new Date(this.state.range.firstDate).getTime())
      end = (new Date(this.state.range.secondDate).getTime())
    }
    if((end<1 || start<1) && this.state.variant_discount_switch){
        Alert.alert("Error", "Variant date is missing");
        this.setState({ loading: false });
        return;
    }
    if (this.state.variantImage < 1) {
      Alert.alert("Error", "Please insert an image for the variant");
      this.setState({ loading: false });
      return;
    } else {
      let payload = {
        variant_image: this.state.variantImage,
        is_variant_by_piece: this.state.variant_piece_qty_switch,
        is_variant_by_package: this.state.variant_package_qty_switch,
        is_variant_min_qty: this.state.variant_minqty_switch,
        is_variant_stock: this.state.variant_stock_qty_switch,
        is_discount: this.state.variant_discount_switch,
        discount: parseInt(this.state.variant_discount),
        variant_by_piece: parseInt(this.state.variant_piece_qty),
        discount_start_date: start,
        discount_end_date: end,
        variant_by_package: parseInt(this.state.variant_package_qty),
        variant_min_qty: parseInt(this.state.variant_minqty),
        variant_stock: parseInt(this.state.variant_stock_qty),
        variant_types: [
          {
            variant_type_id: this.state.variant_type,
            variant_value_id: this.state.variant_value,
          },
        ],
      };

      console.log("PAYLOAD IS : ",payload);
      /* console.log("SHOUL BE: ",'is_variant_by_piece'.substring(3))
      console.log("TESTING: ",payload['variant_by_piece'])
      console.log("TESTING: ",payload['is_variant_by_piece'.substring(3)]) */

      for (var key of Object.keys(payload)) {
        console.log(key + " ---> " + payload[key]);
        console.log("type:  ---> " + typeof payload[key]);
        if (
          typeof payload[key] === "boolean" &&
          payload[key] == true &&
          payload[`${key.substr(3)}`] < 1
        ) {
            Alert.alert(
              "Error",
              `Please make sure ${key
                .substr(3)
                .replace(/_/g, "_")} has a positive number`
            );
            this.setState({ loading: false });
            return;
        }
      }

      if(payload['is_discount']==true && (payload['discount_start_date']===null || payload['discount_end_date']===null)){
        
        Alert.alert(
          "Error",
          `Please make sure you chose a range date for the discounts`
        );
        this.setState({ loading: false });
        return;
      }
      console.log("HERE YOU SOHOULD BE RUNNING THE SUCCESS:");
      //let sendingData = {...this.state.dataFromRoute,variant:{...payload}}

      //this.setState({loading:false})
      if(this.props.route.params.type=="edit"){
        payload={...payload,variant_id:this.props.route.params.id}
        console.log("DATA TO SEND: ",payload);
        APIProduct.editVariant(payload).then((res)=>{
          console.log("RES: ",res);
          this.setState({loading:false})
          Alert.alert("Success","Variant has been edited successfully",[
              {text:"Ok",onPress:()=>this.props.navigation.goBack()}
          ]);
        })

      }else{
        payload={...payload,product_id: this.props.route.params,}
        console.log("DATA TO SEND: ",payload);
        APIProduct.addVariant(payload).then((res)=>{
          console.log("RES: ",res);
          this.setState({loading:false})
          Alert.alert("Success","Variant has been created successfully");
        })
      }
    }
  };
  async componentDidMount() {
    console.log("ROUTE PARAMS: ", this.props.route.params);
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    //4
    APIProduct.getVarientTypes(
      4 /* this.props.route.params.category_id */
    ).then((res) => {
      let variants = [];
      let values = [];
      console.log("RESULT FROM PAGE 3", res);
      res.map((item1) => {
        variants.push({ value: item1.id, label: item1.varient_type });
      });
      this.setState({
        dataFromRoute:this.props.route.params,
        loading: false,
        variant_type_list: variants,
        filter_variant_list: res,
      });
    });

    if(this.props.route.params.type == "edit"){
        console.log("SHOULD BE RUNNING")
        let route = this.props.route.params;
        let routeVar = this.props.route.params.productvariantopt;
        console.log("VARIANT: ",route.variant_by_piece)
        console.log("VARIANT TYPE: ",{label:routeVar[0].varientType.varient_type, value:routeVar[0].varientType.id})
        console.log("VARIANT VALUE: ",{label:routeVar[0].varientValue.varient_value,value:routeVar[0].varientValue.id})
        this.setState({
            variant_stock_qty_switch: route.is_variant_stock,
            variant_stock_qty: route.variant_stock+"",
            variant_stock_qty_error: 0,
            variant_piece_qty_switch: route.is_variant_by_piece,
            variant_piece_qty: route.variant_by_piece+"",
            variant_piece_qty_error: 0,
            variant_package_qty_switch: route.is_variant_by_package,
            variant_package_qty: route.variant_by_package+"",
            variant_package_qty_error: 0,
            variant_discount_switch: route.is_discount,
            variant_discount: route.discount+"",
            variant_discount_error: 0,
            variant_start: route.discount_start_date,
            variant_end: route.discount_end_date,
            variant_minqty_switch: route.is_variant_min_qty,
            variant_minqty: route.variant_min_qty+"",
            variant_minqty_error: 0,
            variant_type: {label:routeVar[0].varientType.varient_type, value:routeVar[0].varientType.id},
            variant_value: {label:routeVar[0].varientValue.varient_value,value:routeVar[0].varientValue.id},
            variantImage: route.variant_image,})
    }
  }

  chooseImages = async (type) => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }
    if (type == "product") {
      let ar = this.state.images;
      ar.push(pickerResult.uri);
      this.setState({ images: ar });
    } else if (type == "variant") {
      this.setState({ variantImage: pickerResult.uri });
    }
  };

  removePic(id) {
    let res = this.state.images.filter((item) => {
      return item != id;
    });
    this.setState({ images: res });
  }

  drawImage() {
    return (
      <>
        <TouchableOpacity onPress={() => this.chooseImages("variant")}>
          {this.state.variantImage.length > 0 && (
            <Ionicons
              style={{
                position: "absolute",
                flex: 1,
                zIndex: 10,
                right: 10,
                top: 10,
              }}
              name="close-sharp"
              size={30}
              color="red"
              onPress={() => this.setState({ variantImage: "" })}
            />
          )}
          <Image
            source={
              this.props.route.params.type=="edit"?{uri:this.props.route.params.variant_image}:
              this.state.variantImage.length < 1
                ? require("../../../assets/images/default-image.png")
                : { uri: this.state.variantImage }
            }
            style={{ width: screenwidth, height: screenheight * 0.3 }}
          />
        </TouchableOpacity>
      </>
    );
  }

  drawScreenThird = () => {
    //console.log("STATE CALLED FROM FUNCTION: ",this.state)
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          {this.drawImage()}
          {addElements3.map((item, index) => {
            //console.log("STATE VALUE: ",this.state)
            //console.log(`ITEM: ${index+1}`,item)
            if (item.type == "textInput") {
              return this.renderTextInput(item, index);
            }
            if (item.type === "switchInput") {
              return this.renderSwitchInput(item, index);
            }
            if (item.type === "picker") {
              return this.renderPicker(item, index);
            }
            if (item.type === "Date") {
              return (
                <View
                  key={index}
                  style={[
                    styles.container,
                    this.state.variant_discount_switch
                      ? { display: "flex" }
                      : { display: "none" },
                  ]}
                >
                  <DateRangePicker
                    onSelectDateRange={(range) => {
                      this.setState({ range });
                      console.log("RANGE:",range)
                    }}
                    blockSingleDateSelection={true}
                    responseFormat="YYYY-MM-DD"
                    maxDate={moment().add(365, "days")}
                    minDate={moment()}
                    selectedDateContainerStyle={
                      styles.selectedDateContainerStyle
                    }
                    selectedDateStyle={styles.selectedDateStyle}
                  />
                </View>
              );
            }
            if (item.type === "button") {
              return (
                <TouchableOpacity
                  onPress={() => this.submit()}
                  style={[styles.loginBtn]}
                >
                  <Text style={styles.loginBtnText}>Submit</Text>
                </TouchableOpacity>
              );
            }
          })}
        </ScrollView>
      </SafeAreaView>
    );
  };

  renderPicker(item, index) {
    return (
      <View
        key={index}
        style={{
          borderWidth: 1,
          borderColor: "#C4C4C4",
          borderRadius: 4,
          marginHorizontal: 20,
          marginVertical: 10,
          height: 55,
          justifyContent: "center",
          backgroundColor: "#fff",
        }}
      >
        <Picker
          style={{ marginLeft: 5 }}
          selectedValue={this.state[item.stateValue]}
          prompt={item.label}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({ [item.stateValue]: itemValue });
            this.handleCategories(item.stateValue, itemValue);
          }}
        >
          {this.state[item.items].map((it, index2) => (
            <Picker.Item label={it.label} value={it.value} key={index2} />
          ))}
        </Picker>
      </View>
    );
  }

  async handleCategories(type, value) {
    switch (type) {
      case "variant_type":
        let ar = [];
        let res = this.state.filter_variant_list.filter(
          (item) => item.id === value
        )[0];
        res.varientvalue.map((item) => {
          ar.push({ label: item.varient_value, value: item.id });
        });
        this.setState({ variant_value_list: ar });
      default:
        break;
    }
  }

  renderSwitchInput(item, index) {
    return (
      <View style={styles.switchContainer} key={index}>
        <TextInput
          style={{
            backgroundColor: "#fff",
            marginVertical: 10,
            flex: 1,
          }}
          label={item.label}
          placeholder={item.placeholder}
          disabled={!this.state[item.stateValue]}
          value={this.state[item.valueValue]}
          keyboardType={item.keyBoardType}
          multiline={item.multiline == "false" ? false : true}
          onChangeText={(text) => this.setState({ [item.valueValue]: text })}
          error={this.state[item.stateError]}
          autoCapitalize="none"
          // keyboardType={element.keyBoardType}
          outlineColor="#C4C4C4"
          onBlur={() => {
            if (
              this.state[item.stateValue] &&
              this.state[item.valueValue].length < 0
            )
              this.setState({
                [item.stateError]: true,
              });
            else
              this.setState({
                [item.stateError]: false,
              });
          }}
          theme={{
            colors: { primary: "#31c2aa", underlineColor: "transparent" },
          }}
        />
        <Switch
          value={this.state[item.stateValue]}
          onValueChange={(i) => {
            //console.log("CHOSEN: ",i);
            this.setState({ [item.stateValue]: i,});
            if(i==false){
                typeof(this.state[item.valueValue]=="number")?this.setState({[item.valueValue]:0}):this.setState({[item.valueValue]:''})
            }
          }}
        />
      </View>
    );
  }

  nextButton = () => {
    console.log("USER DATA IS: ", this.state);
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Spinner visible={this.state.loading} />
        <View style={styles.progressBarContainer}>
          <Text style={styles.headerText}>{this.props.route.params.type=="edit"?"Edit Variant":"Add Variant"}</Text>
        </View>
        {this.drawScreenThird()}
      </SafeAreaView>
    );
  }
}
