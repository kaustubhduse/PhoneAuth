import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState, useRef } from "react";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "../config";
import firebase from "firebase/compat/app";


function Otp() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const recaptchVerifier = useRef(null);

  const sendVerification = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchVerifier.current)
      .then(setVerificationId);
    setPhoneNumber("");
  };

  const confirmCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(() => {
        setCode("");
      })
      .catch((error) => {
        alert(error);
      });
    Alert.alert("Login Successful. Welcome to Dashboard👍");
  };
  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchVerifier}
        firebaseConfig={firebaseConfig}
      />
      <Text style={styles.text}>Login using OTP</Text>
      <TextInput
        style={styles.TextInput}
        placeholder="Phone Number with Country Code"
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        autoComplete="tel"
      />
      <TouchableOpacity style={styles.button} onPress={sendVerification}>
        <Text style={styles.buttonText}>Send Verification Code</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.TextInput}
        placeholder="Confirm Code "
        onChangeText={setCode}
        keyboardType="number-pad"
        autoComplete="tel"
      />
      <TouchableOpacity style={styles.sendCode} onPress={confirmCode}>
        <Text style={styles.buttonText}>Confirm Verification</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Otp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    fontSize: 24,
    borderBottomColor: "#fff",
    borderBottomWidth: 2,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },

  sendVerification: {
    padding: 20,
    backgroundColor: "#3498db",
    borderRadius: 10,
  },
  sendCode: {
    padding: 20,
    backgroundColor: "#9b59b6",
    borderRadius: 10,
  },
  buttonText :{
    textAlign: 'center',
    color:'#fff',
    fontWeight: 'bold',
  },
  
  otpText : {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    margin: 20,
  }
});
