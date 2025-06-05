import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';

type FormaPagamento = 'debito' | 'credito' | 'pix' | '';

export default function PagamentoApp() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [numeroCartao, setNumeroCartao] = useState('');
  const [cvv, setCvv] = useState('');
  const [validade, setValidade] = useState('');
  const [formaPagamento, setFormaPagamento] = useState<FormaPagamento>('');

  function detectarBandeira(numero: string): 'Visa' | 'Mastercard' | 'Amex' | 'Desconhecido' {
    if (/^3[47]/.test(numero)) return 'Amex';
    else if (/^4/.test(numero)) return 'Visa';
    else if (/^5[1-5]/.test(numero)) return 'Mastercard';
    return 'Desconhecido';
  }

  const bandeira = detectarBandeira(numeroCartao);

  const validarNumeroCartao = (text: string) => {
    const apenasNumeros = text.replace(/\D/g, '');
    const maxLength = bandeira === 'Amex' ? 15 : 16;
    setNumeroCartao(apenasNumeros.slice(0, maxLength));
  };

  const validarCvv = (text: string) => {
    const maxLength = bandeira === 'Amex' ? 4 : 3;
    const apenasNumeros = text.replace(/\D/g, '').slice(0, maxLength);
    setCvv(apenasNumeros);
  };

  const validarValidade = (text: string) => {
    const apenasNumeros = text.replace(/\D/g, '');
    let formatado = apenasNumeros;

    if (apenasNumeros.length >= 3) {
      formatado = apenasNumeros.slice(0, 2) + '/' + apenasNumeros.slice(2, 4);
    }

    setValidade(formatado.slice(0, 5));
  };

  const validarNome = (nome: string) => {
    return nome.trim().split(' ').filter(p => p.length > 0).length >= 2;
  };

  const handleSubmit = () => {
    if (!formaPagamento) {
      Alert.alert('Erro', 'Selecione uma forma de pagamento');
      return;
    }

    if (formaPagamento === 'pix') {
      Alert.alert('Sucesso', 'Pagamento realizado com sucesso via Pix!');
      router.push('/confirmacao');
      return;
    }

    if (!validarNome(nome)) {
      Alert.alert('Erro', 'Informe nome completo (ex: João Silva)');
      return;
    }

    if (bandeira === 'Desconhecido') {
      Alert.alert('Erro', 'Bandeira do cartão não reconhecida');
      return;
    }

    if (bandeira === 'Amex' && numeroCartao.length !== 15) {
      Alert.alert('Erro', 'Número do cartão Amex deve ter 15 dígitos');
      return;
    } else if (bandeira !== 'Amex' && numeroCartao.length !== 16) {
      Alert.alert('Erro', 'Número do cartão deve ter 16 dígitos');
      return;
    }

    const maxLengthCvv = bandeira === 'Amex' ? 4 : 3;
    if (cvv.length !== maxLengthCvv) {
      Alert.alert('Erro', `CVV deve ter exatamente ${maxLengthCvv} dígitos`);
      return;
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(validade)) {
      Alert.alert('Erro', 'Validade inválida. Use o formato MM/AA');
      return;
    }

    Alert.alert('Sucesso', 'Pagamento realizado com sucesso!');
    router.push('/confirmacao');
  };

  const exibirCamposCartao = formaPagamento === 'debito' || formaPagamento === 'credito';

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#65B741' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Pagamento</Text>

        <View style={styles.formaPagamentoContainer}>
          {['debito', 'credito', 'pix'].map((tipo) => (
            <TouchableOpacity
              key={tipo}
              style={[
                styles.formaBotao,
                formaPagamento === tipo && styles.formaSelecionada,
              ]}
              onPress={() => setFormaPagamento(tipo as FormaPagamento)}
            >
              <Text
                style={[
                  styles.formaTexto,
                  formaPagamento === tipo && styles.formaTextoSelecionado,
                ]}
              >
                {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {exibirCamposCartao && (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome no cartão</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite o nome completo"
                placeholderTextColor="#ccc"
                value={nome}
                onChangeText={setNome}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Número do cartão</Text>
              <TextInput
                style={styles.input}
                placeholder="1234 5678 9012 3456"
                placeholderTextColor="#ccc"
                keyboardType="numeric"
                value={numeroCartao}
                onChangeText={validarNumeroCartao}
              />
              {numeroCartao.length > 0 && (
                <Text style={styles.bandeiraTexto}>
                  Bandeira detectada: {bandeira}
                </Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>CVV / CVC</Text>
              <TextInput
                style={styles.input}
                placeholder={bandeira === 'Amex' ? '4 dígitos' : '3 dígitos'}
                placeholderTextColor="#ccc"
                keyboardType="numeric"
                value={cvv}
                onChangeText={validarCvv}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Validade (MM/AA)</Text>
              <TextInput
                style={styles.input}
                placeholder="08/32"
                placeholderTextColor="#ccc"
                keyboardType="numeric"
                value={validade}
                onChangeText={validarValidade}
                maxLength={5}
              />
            </View>
          </>
        )}

        <TouchableOpacity style={styles.botao} onPress={handleSubmit}>
          <Text style={styles.botaoTexto}>Pagar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  formaPagamentoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  formaBotao: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#d0e6c2',
    margin: 6,
    borderRadius: 8,
  },
  formaSelecionada: {
    backgroundColor: '#fff',
  },
  formaTexto: {
    fontSize: 18,
    color: '#65B741',
    fontWeight: 'bold',
  },
  formaTextoSelecionado: {
    color: '#2d6a12',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#fff',
    marginBottom: 6,
    fontWeight: '600',
    fontSize: 16,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    color: '#fff',
    fontSize: 16,
  },
  bandeiraTexto: {
    marginTop: 6,
    color: '#d0f0c0',
    fontWeight: '600',
    fontSize: 14,
  },
  botao: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  botaoTexto: {
    color: '#65B741',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
