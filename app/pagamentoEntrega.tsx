import { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

type MetodoPagamento = 'pix' | 'dinheiro' | 'debito' | 'credito' | null;

export default function PagamentoEntrega() {
  const router = useRouter();
  const [metodo, setMetodo] = useState<MetodoPagamento>(null);
  const [precisaTroco, setPrecisaTroco] = useState<boolean | null>(null);
  const [valorTroco, setValorTroco] = useState('');

  const handleConfirmarCompra = () => {
    router.push('/confirmacao');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}>
        <Text style={styles.title}>Pagamento na Entrega</Text>
        <Text style={styles.subtitle}>Escolha o método de pagamento</Text>

        {['pix', 'dinheiro', 'debito', 'credito'].map((opcao) => (
          <TouchableOpacity
            key={opcao}
            style={[styles.opcao, metodo === opcao && styles.opcaoSelecionada]}
            onPress={() => {
              setMetodo(opcao as MetodoPagamento);
              setPrecisaTroco(null);
              setValorTroco('');
            }}
          >
            <Text style={styles.opcaoTexto}>
              {opcao === 'pix'
                ? 'PIX'
                : opcao === 'dinheiro'
                ? 'Dinheiro'
                : opcao === 'debito'
                ? 'Cartão de Débito'
                : 'Cartão de Crédito'}
            </Text>
          </TouchableOpacity>
        ))}

        {/* Se escolher dinheiro, mostra opção de troco */}
        {metodo === 'dinheiro' && (
          <>
            <Text style={[styles.label, { marginTop: 20 }]}>Você precisa de troco?</Text>
            <View style={styles.botaoGroup}>
              <TouchableOpacity
                style={[styles.botao, precisaTroco === true && styles.botaoSelecionado]}
                onPress={() => setPrecisaTroco(true)}
              >
                <Text style={[styles.textoBotao, precisaTroco === true && styles.textoBotaoSelecionado]}>Sim</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.botao, precisaTroco === false && styles.botaoSelecionado]}
                onPress={() => {
                  setPrecisaTroco(false);
                  setValorTroco('');
                }}
              >
                <Text style={[styles.textoBotao, precisaTroco === false && styles.textoBotaoSelecionado]}>Não</Text>
              </TouchableOpacity>
            </View>

            {precisaTroco && (
              <TextInput
                style={styles.input}
                placeholder="Informe o valor do troco"
                keyboardType="numeric"
                value={valorTroco}
                onChangeText={setValorTroco}
              />
            )}
          </>
        )}

        {/* Botão aparece em todas as opções após a escolha */}
        {metodo && (
          <TouchableOpacity style={styles.botaoConfirmar} onPress={handleConfirmarCompra}>
            <Text style={styles.textoConfirmar}>Confirmar Compra</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#65B741' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 30, color: '#fff', textAlign: 'center' },
  subtitle: { fontSize: 20, color: '#C1F2B0', marginBottom: 20, textAlign: 'center' },
  opcao: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 12,
    borderRadius: 10,
  },
  opcaoSelecionada: {
    backgroundColor: '#2E7D32',
  },
  opcaoTexto: {
    fontSize: 18,
    textAlign: 'center',
    color: '#65B741',
    fontWeight: '600',
  },
  botaoGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginBottom: 20,
    alignSelf: 'center',
  },
  botao: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  botaoSelecionado: {
    backgroundColor: '#2E7D32',
  },
  textoBotao: {
    color: '#65B741',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  textoBotaoSelecionado: {
    color: '#fff',
  },
  label: {
    fontSize: 18,
    color: '#C1F2B0',
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    width: '70%',
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: 10,
  },
  botaoConfirmar: {
    marginTop: 30,
    backgroundColor: '#2E7D32',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    width: '70%',
  },
  textoConfirmar: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
