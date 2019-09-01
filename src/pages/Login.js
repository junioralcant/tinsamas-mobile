import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.png';

export default function Login({ navigation }) {
  const [email, setUser] = useState('');
  // const [password, setPassword] = useState('');
  // const [error, setErro] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if (user) {
        navigation.navigate('Main', { user });
      }
    }, []);
  });

  async function handleLogin() {
    const response = await api.post('/logins', { email: email });

    const { _id } = response.data;

    await AsyncStorage.setItem('user', _id);

    navigation.navigate('Main', { user: _id });
  }

  async function handleSignUp() {
    navigation.navigate('SignUp');
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled={Platform.OS === 'ios'}
      style={styles.container}>
      <Image source={logo} />

      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Digite seu e-mail"
        style={styles.input}
        placeholderTextColor="#999"
        value={email}
        onChangeText={setUser}
      />

      {/* <TextInput
        secureTextEntry={true}
        placeholder="Digite sua senha"
        style={styles.input}
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
      /> */}

      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSignUp} style={styles.button}>
        <Text style={styles.buttonText}>Cadastre-se</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },

  input: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginTop: 20,
    paddingHorizontal: 15,
  },

  erroMessage: {
    textAlign: 'center',
    color: '#ce2029',
    fontSize: 16,
    marginBottom: 15,
    marginHorizontal: 20,
  },

  button: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#DF4723',
    borderRadius: 4,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
