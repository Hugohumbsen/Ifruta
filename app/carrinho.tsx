import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';

interface Produto {
  id: string;
  nome: string;
  quantidade: number;
  preco: number;
}

export default function Carrinho() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const [carrinho, setCarrinho] = useState<Produto[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (params.produtos) {
      try {
        const produtosRecebidos = JSON.parse(params.produtos as string);
        setCarrinho(produtosRecebidos);
        
        const novoTotal = produtosRecebidos.reduce(
          (sum: number, item: Produto) => sum + item.quantidade * item.preco,
          0
        );
        setTotal(novoTotal);
      } catch (error) {
        console.error('Erro ao parsear produtos:', error);
      }
    }
  }, [params.produtos]);

  const incrementar = (id: string) => {
    const produto = carrinho.find(item => item.id === id);
    if (!produto) return;

    setCarrinho(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      )
    );
    setTotal(prev => prev + produto.preco);
  };

  const decrementar = (id: string) => {
    const produto = carrinho.find(item => item.id === id);
    if (!produto || produto.quantidade <= 0) return;

    setCarrinho(prev =>
      prev
        .map(item =>
          item.id === id
            ? { ...item, quantidade: item.quantidade - 1 }
            : item
        )
        .filter(item => item.quantidade > 0)
    );
    setTotal(prev => prev - produto.preco);
  };

  const removerItem = (id: string) => {
    const produtoRemovido = carrinho.find(item => item.id === id);
    if (!produtoRemovido) return;

    setTotal(prev => prev - (produtoRemovido.quantidade * produtoRemovido.preco));
    setCarrinho(prev => prev.filter(item => item.id !== id));
  };

  const handlePagamento = () => {
    router.push({
      pathname: '/pagamento',
      params: { 
        total: total.toFixed(2),
        produtos: JSON.stringify(carrinho)
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrinho de Compras</Text>

      {carrinho.length === 0 ? (
        <Text style={styles.emptyText}>Seu carrinho está vazio</Text>
      ) : (
        <>
          <FlatList
            data={carrinho}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.itemText}>
                  {item.nome} - R$ {item.preco.toFixed(2)} x {item.quantidade}
                </Text>
                <View style={styles.botoesLinha}>
                  <TouchableOpacity
                    style={styles.botaoQuantidade}
                    onPress={() => decrementar(item.id)}
                  >
                    <Text style={styles.textoBotao}>-</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.botaoQuantidade}
                    onPress={() => incrementar(item.id)}
                  >
                    <Text style={styles.textoBotao}>+</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.botaoRemover}
                    onPress={() => removerItem(item.id)}
                  >
                    <Text style={styles.textoRemover}>Remover</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />

          <Text style={styles.totalText}>Total: R$ {total.toFixed(2)}</Text>

          <TouchableOpacity style={styles.botaoPagamento} onPress={handlePagamento}>
            <Text style={styles.textoBotaoPagamento}>Ir para Pagamento</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#65B741',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#fff',
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#C1F2B0',
  },
  item: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  itemText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '500',
  },
  botoesLinha: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
    alignItems: 'center',
  },
  botaoQuantidade: {
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 10,
    minWidth: 40,
    alignItems: 'center',
    elevation: 2,
  },
  textoBotao: {
    color: '#65B741',
    fontWeight: '600',
    fontSize: 16,
  },
  botaoRemover: {
    backgroundColor: '#FFB4B4',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginLeft: 'auto',
    elevation: 2,
  },
  textoRemover: {
    color: '#800000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'right',
    color: '#C1F2B0',
  },
  botaoPagamento: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
  },
  textoBotaoPagamento: {
    fontSize: 18,
    color: '#65B741',
    fontWeight: 'bold',
  },
});
