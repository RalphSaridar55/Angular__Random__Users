import { Picker } from "@react-native-picker/picker";
import React, { Component } from "react";
import * as DocumentPicker from "expo-document-picker";
import { docValidator } from "../../helpers/docValidator";
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Alert,
  ScrollView,
} from "react-native";
import {documentBlobConverter} from '../../helpers/documentBlobConverter';
import { accountDetails1, addresses, telephone } from "./map";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native-paper";
import styles from "./style_buyer";
import * as apiServices from "../../core/apis/apiAddressServices";
import * as apiPortFolioServices from "../../core/apis/apiPortfolioServices";
import * as ApiDocument from '../../core/apis/apiDocumentService';
import {TouchableDocumentPicker} from '../../components/DocumentPicker';
import Spinner from "react-native-loading-spinner-overlay";
//import {HeadContext} from '../../../App';
import { RenderPicker } from "../../components/Picker";

class BuyreAccount extends Component {
  //static contextType = HeadContext

  constructor(props) {
    super(props);
    this.state = {
      userdata:null,
      email: "",
      emailError: false,
      address: "",
      addressError: false,
      oldPassword: "",
      oldPasswordError: false,
      password: "",
      passwordError: false,
      confirmPassword: "",
      confirmPasswordError: false,
      website: "",
      websiteError: false,
      code: "",
      codeError: false,
      phone: "",
      phoneError: false,
      state:"",
      stateError:false,
      city:"",
      cityError:false,
      street:"",
      streetError:false,
      postal:0,
      postalError:false,
      hideOldPassword: true,
      hidePassword: true,
      hideConfirmPassword: true,
      country: null,
      trading:"",
      tradingError:false,
      company:"",
      companyError:false,
      defaultLanding:"DASHBOARD",
      defaultLandingPages:[
          {label:'Dashboard',value:'DASHBOARD'},
          {label:'Home',value:'HOME'}
      ],
      countries: [{
          label:'Country',
          value:0
      }],
      spinnerVisible:true,
    };
  }
  /*     onChangeText = () => {
        this.setState({ email: this.state.email })
    } */
  componentDidMount(){
    this.focusListener = this.props.navigation.addListener("onFocus", () => {
      apiServices.getCountries().then((res) => {
        this.setState({ countries: res });
      });
      this.getUserData();
      // The screen is focused
      // Call any action
    });
  }

  componentDidMount() {
    //console.log("CONTEXT: ",this.context)
    //console.log("COTEXT: ",this.context.setProduct("1235"),this.context.product)
    //console.log("CONTEXT: ",this.context.userData)
    apiServices.getCountries().then((res) => {
      this.setState({ countries: res });
    });
    this.getUserData();
  }

  setUserData = async (data) =>{
    try {
      let value = await AsyncStorage.setItem('user_details',JSON.stringify(data));
      if (value !== null) {
        // We have data!!
        console.log("DATA RECEIVED FROM ASYNC STORAGE: ",value)
        this.setState({
            userdata:value,
            email:value.owner_email,
            website:value.website,
            code:value.owner_country_code,
            phone:value.owner_mobile_number,
            country:value.country_id,
            state:value.state,
            city:value.city,
            street:value.street,
            postal:value.postal_code+"",
            trading:value.trading_license_doc,
            company:value.company_reg_doc,
            address:value.registered_address,
            defaultLanding:value.default_landing_page,
            spinnerVisible:false,
        })
      }
    } catch (error) {
      // Error retrieving data
      console.log("ERROR ASYNCSTORAGE: ",error)
    }
  }

  getUserData= async()=>{
    try {
      const value = JSON.parse(await AsyncStorage.getItem('user_details'));
      if (value !== null) {
        // We have data!!
        console.log("DATA RECEIVED FROM ASYNC STORAGE: ",value)
        this.setState({
            userdata:value,
            //email:value.owner_email,
            website:value.website,
            code:value.owner_country_code,
            phone:value.owner_mobile_number,
            country:value.country_id,
            state:value.state,
            city:value.city,
            street:value.street,
            postal:value.postal_code+"",
            trading:value.trading_license_doc,
            company:value.company_reg_doc,
            address:value.registered_address,
            defaultLanding:value.default_landing_page,
            spinnerVisible:false,
        })
      }
    } catch (error) {
      // Error retrieving data
      console.log("ERROR ASYNCSTORAGE: ",error)
    }
  };

  DrawTouchableOpacity = (e, i) => {
    return (
      <View key={i}>
        <TouchableDocumentPicker
          color="#6E91EC"
          icon="file"
          mode="outlined"
          name={e.typeDoc}
          doc={e.typeDoc=="Trading License"?this.state.trading:this.state.company}
          onPress={() =>
            e.typeDoc == "Trading License"
              ? this.pickDocument("Trade")
              : this.pickDocument("Passport")
          }
          style={styles.docPicker}
        />
      </View>
    );
  };

  pickDocument = async (e) => {
    let result = await DocumentPicker.getDocumentAsync({copyToCacheDirectory:false});
    let test = docValidator(result.name);
    if (test == true) {
      Alert.alert(
        "Wrong Extensions",
        "Please only upload pdf or docx type of files"
      );
      e == "Trade"
        ? this.setState({ tradingError: true })
        : this.setState({ companyError: true });
    } else {
      //console.log(result);
      try {
        e == "Trade"
          ? this.setState({ trading: result, tradingError: false })
          : this.setState({ company: result, companyError: false });
      } catch (error) {
        console.log(error);
      }
    }
  };

  _discardAction = () => {
    this.props.navigation.navigate("Home")
  };

  _ApplyChanges = () => {
    if (
      //this.state.emailError ||
      this.state.passwordError ||
      this.state.confirmPasswordError ||
      this.state.websiteError ||
      this.state.codeError ||
      this.state.phoneError ||
      this.state.country==0 ||
      this.state.stateError ||
      this.state.cityError ||
      this.state.streetError ||
      this.state.postalError ||
      this.state.addressError
    )
      Alert.alert("Edit Error", "Please fill the inputs correctly");
    else if(this.state.oldPassword.length<1 || this.state.oldPasswordError )
      Alert.alert("Edit Error","Please enter your password")
    else if(this.state.companyError ||
    this.state.tradingError || this.state.company.length<1 || this.state.trading.length<1 ){
        Alert.alert("Edit Error", "Please attach the required files");
    }
    else if(this.state.password != this.state.confirmPassword)  
      Alert.alert("Edit Error", "Please make sure passwords match");
    else {
        let payload = {
            owner_country_code:this.state.code,
            owner_mobile_number:this.state.phone,
            old_password:this.state.oldPassword,
            password:this.state.password.length<1?this.state.oldPassword:this.state.password,
            website:this.state.website,
            registered_address:this.state.address,
            country_id:this.state.country,
            state:this.state.state,
            city:this.state.city,
            street:this.state.street,
            postal_code:parseInt(this.state.postal),
            company_reg_doc:this.state.company,
            trading_license_doc:this.state.trading,
            default_landing_page:this.state.defaultLanding
        }
        console.log("PAYLOAD: ",payload)
        this.setState({spinnerVisible:true})
        if(typeof(this.state.company)=="string" && typeof(this.state.trading)=="string"){
          this.updateUserDetails(payload)
        }
        else{
          new Promise (async(resolve,reject)=>{
            let payloadToSend = []
            if(typeof(this.state.company)!="string"){
              console.log("COMPANY")
              payloadToSend.push(
                {uri:this.state.company.uri,name:this.state.company.name,type:'company_reg_doc'}
              )
            }
            if(typeof(this.state.trading)!="string"){
              console.log("TRADING")
              payloadToSend.push(
                {uri:this.state.trading.uri,name:this.state.trading.name,type:'trading_license_doc'}
              )
            }
            let blob =await Promise.all(await documentBlobConverter(payloadToSend))
            resolve ({blob:blob, payloadToSend:payloadToSend})
          }).then((res)=>{
            // console.log("RES: ",res)
            let result = res.payloadToSend.map((item,index)=>{
              console.log(Object.keys(item))
              let docName = item.name
              // console.log("DOCUENT:",res.blob[index])
              return {document:res.blob[index], extension:docName.substring(docName.length-4, docName.length),type:item.type}

            })
            return (result)
          }).then(async(res)=>{
            console.log("RES: ",res)
            // let names = res.map((item)=> item.type)
            // console.log("NAMES: ",names)
            let result = await Promise.all(await res.map(async(item,index)=>{
             let result_data = await ApiDocument.uploadDoc({document:item.document,extension:item.extension})
             .catch(err=>{
               this.setState({spinnerVisible:false})
               console.log("Error:",err.response.data.message)
              })

             return {[item.type]:result_data}
             }))
             //console.log("RESULT: ",result)
           return result
          }).then(async(res)=>{
            console.log("RES: ",await res)
            console.log("RES: ",res)
            res.map((item)=>{
              console.log("VALUES")
              console.log("KEYS",Object.keys(item))
              payload[Object.keys(item)[0]]=Object.values(item)[0]
            })
            console.log("PAYLOAD: ",payload)
            this.updateUserDetails(payload)
        })
        }
    }
  };

  updateUserDetails = (payload) =>{
    apiPortFolioServices.updateUserProfile(payload)
    .then((res)=>{
        console.log("FROM THE COMPONENT: ",res)
        let {
          owner_email,owner_mobile_number,website,country_id,
          city,state,street,company_reg_doc,trading_license_doc,
          postal_code,registered_address,default_landing_page,
          owner_country_code} = res.data
        this.setState({
          email:owner_email,
          phone:owner_mobile_number,
          code: owner_country_code,
          website: website,
          country:country_id,
          city:city,
          street:street,
          state:state,
          company:company_reg_doc,
          trading:trading_license_doc,
          postal:postal_code,
          address:registered_address,
          defaultLanding:default_landing_page,
          oldPassword:"",
          password:"",
          confirmPassword:"",
        })
        this.setUserData(res.data);
        this.setState({spinnerVisible:false})
        Alert.alert("Edit", "Your profile has been updated",[
          {text:"Ok",onPress:()=>this.props.navigation.navigate("Home")}
        ]);
    }).catch(err=>{
      console.log("ERROR:",err.response.data.message)
      Alert.alert("Error:\n",err.response.data.message)
      this.setState({spinnerVisible:false});
      //Alert.alert("Error",err.response.data.message);
    })
  }

  drawInput=()=>{
    return accountDetails1.map((item,index)=>{
      return(
        <TextInput
              key={index}
              error={this.state[item.error]}
              label={item.label}
              placeholder={item.placeholder}
              mode="outlined"
              outlineColor="#C4C4C4"
              theme={{ colors: { primary: "#31c2aa" } }}
              style={styles.inputView}
              value={this.state[item.value]}
              onChangeText={(e) => this.setState({ [item.value]: e })}
              
              onBlur={()=>{
                if(this.state[item.value].length<1)
                    this.setState({[item.error]:true})
                else
                    this.setState({[item.error]:false})
            }}
            />
      )
    })
  }

  render() {
    //should apply validation
    //for the inputText

    return (
      <ImageBackground
        source={require("../../../assets/images/Login-bg.png")}
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Spinner visible={this.state.spinnerVisible}/>
        <View
          style={{
            flex: 1,
            padding: 15,
            justifyContent: "center",
          }}
        >
          <ScrollView
          showsVerticalScrollIndicator={false}>
            <Text style={styles.header}>Account Details</Text>
            {this.drawInput()}
            <View style={{ flexDirection: "row" }}>
              {telephone.map((item,index)=><TextInput
                key={index}
                error={this.state[item.error]}
                label={item.label}
                placeholder={item.placeholder}
                mode="outlined"
                outlineColor="#C4C4C4"
                theme={{ colors: { primary: "#31c2aa" } }}
                style={styles.inputV}
                value={this.state[item.value]}
                onChangeText={(e) => this.setState({ [item.value]: e })}
                onBlur={()=>{
                  if(this.state[item.value].length<1)
                      this.setState({[item.error]:true})
                  else
                      this.setState({[item.error]:false})
              }}
              />)}
            </View>
            <TextInput
              error={this.state.oldPasswordError}
              mode="outlined"
              label="Password*"
              secureTextEntry={this.state.hideOldPassword}
              outlineColor="#C4C4C4"
              onChangeText={(e) => this.setState({ oldPassword: e })}
              style={styles.inputView}
              value={this.state.oldPassword}
              onBlur={() => {
                if (this.state.oldPassword.length < 8)
                  this.setState({ oldPasswordError: true });
                else this.setState({ oldPasswordError: false });
              }}
              theme={{
                colors: { primary: "#31c2aa", underlineColor: "transparent" },
              }}
              right={
                <TextInput.Icon
                  name="eye"
                  onPress={() => {
                    if (this.state.hideOldPassword)
                      this.setState({ hideOldPassword: false });
                    else this.setState({ hideOldPassword: true });
                  }}
                />
              }
            />
            <TextInput
              error={this.state.passwordError}
              mode="outlined"
              label="New Password"
              secureTextEntry={this.state.hidePassword}
              outlineColor="#C4C4C4"
              onChangeText={(e) => this.setState({ password: e })}
              style={styles.inputView}
              value={this.state.password}
              theme={{
                colors: { primary: "#31c2aa", underlineColor: "transparent" },
              }}
              right={
                <TextInput.Icon
                  name="eye"
                  onPress={() => {
                    if (this.state.hidePassword)
                      this.setState({ hidePassword: false });
                    else this.setState({ hidePassword: true });
                  }}
                />
              }
            />
            <TextInput
              error={this.state.confirmPasswordError}
              mode="outlined"
              label="Confirm Password"
              secureTextEntry={this.state.hideConfirmPassword}
              outlineColor="#C4C4C4"
              onChangeText={(e) => this.setState({ confirmPassword: e })}
              style={styles.inputView}
              value={this.state.confirmPassword}
              theme={{
                colors: { primary: "#31c2aa", underlineColor: "transparent" },
              }}
              right={
                <TextInput.Icon
                  name="eye"
                  onPress={() => {
                    if (this.state.hideConfirmPassword)
                      this.setState({ hideConfirmPassword: false });
                    else this.setState({ hideConfirmPassword: true });
                  }}
                />
              }
            />
            <RenderPicker 
              selectedValue={this.state.country}
              containerStyle={{
                borderWidth: 1,
                marginVertical:10,
                borderColor: "#C4C4C4",
                borderRadius: 4,
                paddingVertical: 15,
                backgroundColor: "#fff",
              }}
              onValueChange={(itemValue, itemIndex) =>{
                this.setState({ country: itemValue })
                console.log("COUNTRY VALUE: ",itemValue)
                }}
              map={this.state.countries}
            />
            {addresses.map((item,index)=><TextInput
                key={index}
                error={this.state[item.error]}
                label={item.label}
                placeholder={item.placeholder}
                mode="outlined"
                outlineColor="#C4C4C4"
                theme={{ colors: { primary: "#31c2aa" } }}
                style={styles.input_V}
                keyboardType={item.keyboardType}
                value={this.state[item.value]+""}
                onBlur={()=>{
                    if(this.state[item.value].length<1)
                        this.setState({[item.error]:true})
                    else
                        this.setState({[item.error]:false})
                }}
                onChangeText={(e) => this.setState({ [item.value]: e })}
              />)}
              {this.DrawTouchableOpacity({typeDoc:"Company Registration"},1)}
              {this.DrawTouchableOpacity({typeDoc:"Trading License"},2)}
            
              {this.state.userdata?.user_type==4&&<RenderPicker 
              selectedValue={this.state.defaultLanding}
              containerStyle={{
                borderWidth: 1,
                marginVertical:10,
                borderColor: "#C4C4C4",
                borderRadius: 4,
                paddingVertical: 15,
                backgroundColor: "#fff",
              }}
              onValueChange={(itemValue, itemIndex) =>{
                this.setState({ defaultLanding: itemValue })
                console.log("COUNTRY VALUE: ",itemValue)
                }}
              map={this.state.defaultLandingPages}/>}
          </ScrollView>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.Btn}
            onPress={
              this._discardAction /* this.props.navigation.navigate('Home') */
            }
          >
            <Text style={styles.loginText}>Discard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Dis_Btn}
            onPress={
              this._ApplyChanges 
            }
          >
            <Text style={styles.loginText}>Apply Changes</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

export default BuyreAccount;
