import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';

interface Produto {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
  imagem: string;
}

export default function Produtos() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const estabelecimentoNome = params.estabelecimentoNome || 'Estabelecimento';
  const estabelecimentoId = params.estabelecimentoId || '0';
  const aberto = params.aberto === 'true';

  const [produtos, setProdutos] = useState<Produto[]>([
    {
      id: '1',
      nome: 'Banana (R$ 5,00/kg)',
      preco: 5.0,
      quantidade: 0,
      imagem: 'https://cdn-icons-png.flaticon.com/512/831/831896.png',
    },
    {
      id: '2',
      nome: 'Maçã (R$ 4,50/kg)',
      preco: 4.5,
      quantidade: 0,
      imagem: 'https://cdn-icons-png.flaticon.com/512/415/415733.png',
    },
    {
      id: '3',
      nome: 'Tomate (R$ 6,00/kg)',
      preco: 6.0,
      quantidade: 0,
      imagem: 'https://cdn-icons-png.flaticon.com/512/15625/15625362.png',
    },
    {
      id: '4',
      nome: 'Batata (R$ 3,50/kg)',
      preco: 3.5,
      quantidade: 0,
      imagem: 'https://cdn-icons-png.flaticon.com/512/1652/1652077.png',
    },
    {
      id: '5',
      nome: 'Cenoura (R$ 4,00/kg)',
      preco: 4.0,
      quantidade: 0,
      imagem: 'https://cdn-icons-png.flaticon.com/512/1041/1041355.png',
    },
    {
      id: '6',
      nome: 'Abacaxi (R$ 7,00/unidade)',
      preco: 7.0,
      quantidade: 0,
      imagem: 'https://cdn-icons-png.flaticon.com/512/6866/6866518.png', // Temporária, se quiser mudar é só mandar
    },
  ]);

  const adicionarQuantidade = (id: string) => {
    if (!aberto) {
      Alert.alert('Estabelecimento fechado', 'Você não pode adicionar produtos agora.');
      return;
    }

    setProdutos((prev) =>
      prev.map((produto) =>
        produto.id === id
          ? { ...produto, quantidade: produto.quantidade + 1 }
          : produto
      )
    );
  };

  const removerQuantidade = (id: string) => {
    setProdutos((prev) =>
      prev.map((produto) =>
        produto.id === id && produto.quantidade > 0
          ? { ...produto, quantidade: produto.quantidade - 1 }
          : produto
      )
    );
  };

  const calcularTotal = () => {
    return produtos
      .reduce((total, produto) => total + produto.preco * produto.quantidade, 0)
      .toFixed(2);
  };

  const totalItens = () => {
    return produtos.reduce((total, produto) => total + produto.quantidade, 0);
  };

  const irParaCarrinho = () => {
    if (!aberto) {
      Alert.alert('Estabelecimento fechado', 'Você não pode acessar o carrinho agora.');
      return;
    }

    const produtosNoCarrinho = produtos.filter((p) => p.quantidade > 0);

    if (produtosNoCarrinho.length === 0) {
      alert('Adicione itens ao carrinho antes de prosseguir');
      return;
    }

    router.push({
      pathname: '/carrinho',
      params: {
        produtos: JSON.stringify(produtosNoCarrinho),
        total: calcularTotal(),
        estabelecimentoNome,
        estabelecimentoId,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{estabelecimentoNome}</Text>

      {!aberto && (
        <Text style={styles.fechadoText}>⚠️ Estabelecimento fechado</Text>
      )}

      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.produto}>
            <View style={styles.produtoInfo}>
              <Image source={{ uri: item.imagem }} style={styles.imagem} />
              <View>
                <Text style={styles.nome}>{item.nome}</Text>
                <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>
              </View>
            </View>

            <View style={styles.quantidadeContainer}>
              <TouchableOpacity
                style={styles.botao}
                onPress={() => removerQuantidade(item.id)}
                disabled={item.quantidade === 0}
              >
                <Text
                  style={[
                    styles.botaoTexto,
                    item.quantidade === 0 && styles.botaoDisabled,
                  ]}
                >
                  -
                </Text>
              </TouchableOpacity>

              <Text style={styles.qtdTexto}>{item.quantidade}</Text>

              <TouchableOpacity
                style={styles.botao}
                onPress={() => adicionarQuantidade(item.id)}
              >
                <Text style={styles.botaoTexto}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalTexto}>
          Itens: {totalItens()} | Total: R$ {calcularTotal()}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.btnCarrinho, !aberto && styles.btnDisabled]}
        onPress={irParaCarrinho}
        disabled={!aberto}
      >
        <Text style={styles.btnCarrinhoTexto}>Ir para o Carrinho</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#65B741',
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#fff',
  },
  fechadoText: {
    color: '#FFB4B4',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  produto: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  produtoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  imagem: {
    width: 48,
    height: 48,
    marginRight: 12,
  },
  nome: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '500',
  },
  preco: {
    fontSize: 14,
    color: '#DFF0D8',
  },
  quantidadeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botao: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  botaoTexto: {
    fontSize: 18,
    color: '#65B741',
    fontWeight: 'bold',
  },
  botaoDisabled: {
    color: '#aaa',
  },
  qtdTexto: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    minWidth: 20,
  },
  totalContainer: {
    marginTop: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  totalTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  btnCarrinho: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnDisabled: {
    backgroundColor: '#a4d3a2',
  },
  btnCarrinhoTexto: {
    color: '#65B741',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
