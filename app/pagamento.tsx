import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function EscolherTipoPagamento() {
  const router = useRouter();

  const irParaPagamentoApp = () => router.push('/pagamentoApp');
  const irParaPagamentoEntrega = () => router.push('/pagamentoEntrega');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Como deseja pagar?</Text>

      <TouchableOpacity style={styles.botao} onPress={irParaPagamentoApp}>
        <Text style={styles.textoBotao}>Pagar no APP</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={irParaPagamentoEntrega}>
        <Text style={styles.textoBotao}>Pagar na Entrega</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center', padding: 24, backgroundColor:'#65B741' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 30, color: '#fff' },
  botao: { backgroundColor: '#fff', padding: 18, marginBottom: 15, borderRadius: 10, width: '70%', alignItems: 'center' },
  textoBotao: { fontSize: 20, fontWeight: 'bold', color: '#65B741' }
});
