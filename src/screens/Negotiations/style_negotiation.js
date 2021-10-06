import { StyleSheet,Dimensions } from "react-native";

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const styles = StyleSheet.create({
    container:{
        marginTop:0,
        marginHorizontal:20
    },
    loginBtn: {
        marginBottom:20,
        marginTop:10,
        backgroundColor: "#31C2AA",
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        height: 50
    },
    loginBtnText:{
        color:'white',
        fontSize:16,
        fontWeight:'bold'
    },
    productTitle:{
        fontSize:24,
        color:'#6E91EC',
        fontWeight:'bold',
        textDecorationLine: 'underline',
    },
    chatContainer:{
        height:height * 0.5,
        zIndex:20,
        backgroundColor:'#fff',
        marginTop:20,
        marginBottom:20,
        marginHorizontal:10,
        borderRadius:30
    },
    docPicker:{
        borderWidth:1,
        borderRadius:5,
        borderColor:'gray',
        marginVertical:10,
        height:55,
        display:'flex',
        flexDirection:'row',
        paddingHorizontal:10,
        alignItems:'center'
    },
    pictureAndUsernameContainer:{
        display:'flex',
        flexDirection:'row',
        marginBottom:10
    },
    name:{
        position:'absolute',
        left:15,
        top:10,
        zIndex:99,
        color:'#fff',
    },
    pictureContainer:{
        borderRadius:25,
        width:50,
        height:50,
        color:'#fff',
        marginRight:20

    },
    username:{
        fontSize:20,
        textAlignVertical:'center'
    },
    textContainer:{
        marginVertical:10
    },
    date:{
        color:'gray',
    },
    inputContainer:{
        marginHorizontal:20
    }
})

export default styles;