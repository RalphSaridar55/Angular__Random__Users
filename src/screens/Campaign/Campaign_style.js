import {StyleSheet, Dimensions} from 'react-native';

const height = Dimensions.get("screen").height
const screenWidth = Dimensions.get("screen").width
export const styles = StyleSheet.create({
    cardContainer:{
        backgroundColor:'#fff',
        borderWidth:1,
        display:'flex',
        borderColor:'lightgray',
        marginVertical: 20,
        paddingVertical:20,
        borderRadius:20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 5,
    },
    header: {
      fontSize: 21,
      color: "#6E91EC",
      fontWeight: 'bold',
      marginBottom: 5
    },
    infoContainer:{
        display:'flex',
        justifyContent:'flex-start',
    },
    bannerName:{
        fontSize:24,
        fontFamily:'Inter-Black-Light',
    },
    bannerTitle:{
        fontSize:16,
        fontFamily:'Inter-Black-Light',
        color:'gray'
    },
    loginBtn: {
        marginTop:40,
        backgroundColor: "#31C2AA",
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        height: 30,
        paddingHorizontal:20,
        paddingVertical:10
    },
    loginBtnText:{
        color:'white',
        fontSize:16,
        fontWeight:'bold'
    },
    bannerInfo:{
        fontSize:12,
        color:'gray'
    },
    bannerPrice:{
        marginTop:20,
        fontSize:16,
        color:'#31C2AA',
        fontFamily:'Inter-Black-Light'
    },
    insideContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"space-between",
    },
    infoText:{
        color:'gray',
        fontSize:14,
        fontFamily:'Inter-Black-Light'
    },
    myCampaignTitleContainer:{
        paddingHorizontal:20,
        paddingBottom:20,
        width:'100%'
    },
    buttonContainer:{
        width:'100%',
        paddingHorizontal:20,
        alignItems:'flex-end',
    },
    collapsibleButton:{
        color:'#31C2AA',
        fontSize:20,
        marginHorizontal:20,
        textDecorationColor:'#31C2AA',
        textDecorationLine:'underline'
    },
    docPicker: {
        borderWidth: 0.5,
        borderRadius: 10,
        //marginLeft:30,
        width: screenWidth * .7,
        //color: '#31c2aa',
        marginBottom: 20,
        marginTop: 10,
        paddingHorizontal: 10,
        //display:"flex",
        //justifyContent: 'center',
    },
}) 