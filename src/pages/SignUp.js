import React, { useState } from 'react';
import ImagePicker from 'react-native-image-picker';

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
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [email, setUser] = useState('');
  const [bio, setBio] = useState('');
  const [whatsapp, setwhatsapp] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit() {
    const data = new FormData();

    data.append('avatar', image);
    data.append('name', name);
    data.append('email', email);
    data.append('bio', bio);
    data.append('whatssap', whatsapp);
    data.append('password', password);

    await api.post('users', data);

    navigation.navigate('Main');
  }

  function handleSelectImage() {
    ImagePicker.showImagePicker(
      {
        title: 'Selecionar imagem',
      },
      upload => {
        if (upload.error) {
          console.log('error');
        } else if (upload.didCancel) {
          console.log('User conceled');
        } else {
          const preview = {
            uri: `data:image/jpeg;base64,${upload.data}`,
          };

          let prefix;
          let ext;

          if (upload.fileName) {
            [prefix, ext] = upload.fileName.split('.');
            ext = ext.toLowerCase() === 'heic' ? 'jpg' : ext;
          } else {
            prefix = new Date().getTime();
            ext = 'jpg';
          }

          const image = {
            uri: upload.uri,
            type: upload.type,
            name: `${prefix}.${ext}`,
          };

          setPreview(preview);
          setImage(image);
        }
      },
    );
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled={Platform.OS === 'ios'}
      style={styles.container}>
      <Image source={logo} />

      <TouchableOpacity onPress={handleSelectImage} style={styles.selecButton}>
        <Text style={styles.selecButtonText}>Selecione uma imagem</Text>
      </TouchableOpacity>

      {preview && <Image style={styles.preview} source={preview} />}

      <TextInput
        placeholder="Digite seu nome"
        style={styles.input}
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Digite seu e-mail"
        style={styles.input}
        placeholderTextColor="#999"
        value={email}
        onChangeText={setUser}
      />

      <TextInput
        placeholder="Sobre você"
        style={styles.input}
        placeholderTextColor="#999"
        value={bio}
        onChangeText={setBio}
      />

      <TextInput
        placeholder="Whatsapp"
        style={styles.input}
        placeholderTextColor="#999"
        keyboardType={'numeric'}
        value={whatsapp}
        onChangeText={setwhatsapp}
      />

      <TextInput
        secureTextEntry={true}
        placeholder="Digite sua senha"
        style={styles.input}
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Enviar</Text>
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

  preview: {
    width: 100,
    height: 100,
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 4,
  },

  selecButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#DF4723',
    borderStyle: 'dashed',
    height: 42,

    justifyContent: 'center',
    alignItems: 'center',
  },

  selecButtonText: {
    fontSize: 16,
    color: '#666',
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
