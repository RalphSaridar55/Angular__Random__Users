import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  Bcontainer: {
    flex: 1,
    //backgroundColor: '#fff',
  },
  cardImage: {
    width: 50,
    height: 50,
    borderColor: "#C4C4C4",
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
  },
  priceHeader: {
    marginTop: 60,
    marginBottom: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 10,
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
  },
  loginBtn: {
    paddingHorizontal: 20,
    backgroundColor: "#31C2AA",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  loginBtnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonOptionsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical:10
  },
  buttonOptions: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  buttonInfo:{
    flex:2,
    display:'flex',
    flexDirection:'row',
    justifyContent:'center'
  },
  functionalityContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  functionalityChip: {
    backgroundColor: "#fff",
    flex: 1,
    borderColor: "#5EB8C5",
    margin: 5,
  },
  B_container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10,
  },
  container: {
    backgroundColor: "#e9f3ff",
    flex: 1,
  },
  header: { height: 50, backgroundColor: "#698eb7" },
  Title: {
    fontSize: 18,
  },
  avatarbg: {
    backgroundColor: "#31c2aa",
    borderRadius: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default styles;
