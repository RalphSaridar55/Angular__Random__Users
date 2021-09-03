import React, { useState } from 'react'
import { TouchableOpacity, View, ImageBackground } from 'react-native'
import { Text, Button } from 'react-native-paper'
import Header from '../../components/Header'
import TextInput from '../../components/TextInput'
import loginStyle from './loginStyle'
import { emailValidator } from '../../helpers/emailValidator'
import { passwordValidator } from '../../helpers/passwordValidator'
import * as Device from 'expo-device';
import Spinner from 'react-native-loading-spinner-overlay';
import * as apiServices from "../../core/apis/apiUserServices";

export default function Login({ navigation }) {

  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [isAuthorized, setAuthorized] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [data, setData] = useState("")

  /**
   * 
   * @returns to login page when user credentials are validated
   */
  const onLoginPressed = () => {
    // Validation 
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)

    // Set Errors msgs
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }

    const payload = {
      owner_email: email.value,
      password: password.value,
      device_id: "string",
      device_name: Device.deviceName,
      device_version: Device.osVersion,
      device_token: "string"
    }
    // Show spinner when call is made
    setLoading(true)

    apiServices.userLogin(payload).then((res) => {
      apiServices.setToken(res.access_token);
      setData(res)
      setAuthorized(true);
      setLoading(false)
      navigation.navigate(
        "initialHome"
      )
    })
  }

  return (
    <ImageBackground source={require('../../../assets/images/Login-bg.png')} resizeMode="cover"
      style={{
        flex: 1,
      }}>
      <View style={loginStyle.container}>
        <Spinner visible={isLoading} />
        {!isAuthorized ?
          <View>
            <Header>Welcome back </Header>
            <TextInput
              label="Email"
              returnKeyType="next"
              value={email.value}
              onChangeText={(text) => setEmail({ value: text, error: '' })}
              error={!!email.error}
              errorText={email.error}
              autoCapitalize="none"
              autoCompleteType="email"
              textContentType="emailAddress"
              keyboardType="email-address"
              outlineColor="#C4C4C4"
              theme={{ colors: { primary: '#31c2aa', underlineColor: 'transparent' } }}
            />
            <TextInput
              label="Password"
              returnKeyType="done"
              value={password.value}
              onChangeText={(text) => setPassword({ value: text, error: '' })}
              error={!!password.error}
              errorText={password.error}
              secureTextEntry
              outlineColor="#C4C4C4"
              theme={{ colors: { primary: '#31c2aa', underlineColor: 'transparent' } }}
            // right={<TextInput.Icon name="eye" />}
            />
            <View style={loginStyle.forgotPassword}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword')}
              >
                <Text style={loginStyle.forgot}>Forgot your password ?</Text>
              </TouchableOpacity>
            </View>
            <Button mode="contained"
              onPress={() => onLoginPressed()}
              style={loginStyle.loginBtn}
            >Login
            </Button>
            <View >
              <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
                <Text style={loginStyle.link}>Become a Partner </Text>
              </TouchableOpacity>
            </View>
          </View> : <View style={loginStyle.alignWelcome}><Header>Welcome {data.userDetails.company_name}</Header></View>}
      </View>
    </ImageBackground>
  )
}
