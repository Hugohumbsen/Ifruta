import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo atualizado para imagem online */}
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2805/2805947.png' }}
        style={styles.logo}
      />

      {/* Títulos */}
      <Text style={styles.title}>Faça sua feira sem sair de casa</Text>
      <Text style={styles.subtitle}>Frutas frescas entregues na sua porta</Text>

      {/* Botões */}
      <TouchableOpacity style={styles.button} onPress={() => router.push('/login')}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/register')}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#65B741',
    padding: 24,
    justifyContent: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    color: '#fff',
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#65B741',
    textAlign: 'center',
    fontSize: 16,
  },
});
