import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  useColorScheme,
  View,
} from 'react-native';

const App = () => {
  const [ inputTexto, setInputTexto ] = useState('')
  const [ nombreStorage, setNombreStorage] = useState('')
  
  useEffect(() => {
    obtenerDatos()
  },[])
  
  const guardarDatos = async () =>{
    try {
      await AsyncStorage.setItem('nombre', inputTexto)
      setNombreStorage(inputTexto)
    } catch (error) {
      console.log(error)      
    }
  }
  const obtenerDatos = async () =>{
    try {
      const nombre = await AsyncStorage.getItem('nombre')
      setNombreStorage(nombre)
    } catch (error) {
      console.log(error)
    }
  }
  const eliminarDatos = async () => {
    try {
      await AsyncStorage.removeItem('nombre')
      setNombreStorage('')
    } catch (error) {
        console.log(error)
    }
  }
  
  return (
    <>
      <View style={styles.contenedor}>
        { nombreStorage ? <Text>Hola: {nombreStorage}</Text> : null}
        
        <TextInput 
          style={styles.input} 
          placeholder="Escribe tu nombre"
          onChangeText={ texto => setInputTexto(texto)}
        />

        <Button 
          title='Guardar'
          color='#333'
          onPress={ () => guardarDatos()}
        />
        { nombreStorage ? (
          <TouchableHighlight 
            style={styles.btnEliminar}
            onPress={() => eliminarDatos()}
          >
            <Text style={styles.txtEliminar}>Eliminar Nombre &times;</Text>
          </TouchableHighlight>
        ): null}
        
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  contenedor:{
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  input:{
    borderColor: '#666',
    borderBottomWidth: 1,
    width: 300,
    height: 40,
    marginBottom: 5
  },
  btnEliminar:{
    backgroundColor: 'red',
    marginTop: 20,
    padding: 10,
  },
  txtEliminar:{
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  }
});

export default App;
