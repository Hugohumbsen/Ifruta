import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Confirmacao() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>✅</Text>
      <Text style={styles.sucesso}>Pagamento realizado com sucesso!</Text>
      <Text style={styles.info}>Seu pedido chegará em até 85 minutos.</Text>
      <Text style={styles.duvida}>Está com alguma dúvida?</Text>

      <TouchableOpacity style={styles.botao}>
        <Text style={styles.botaoTexto}>Falar com o Ifuuta</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao}>
        <Text style={styles.botaoTexto}>Falar com a Loja</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#65B741',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 20,
  },
  sucesso: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  info: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  duvida: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 15,
  },
  botao: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginVertical: 8,
    width: '80%',
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#65B741',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
