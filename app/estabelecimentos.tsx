import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Switch, Image } from 'react-native';

// Imagens pré-carregadas (garanta que elas estão na pasta correta e com os nomes exatos)
const imagens = {
  mercadinho: require('../assets/images/mercadinho.jpg'),
  padaria: require('../assets/images/frutas.jpg'),
  hortifruti: require('../assets/images/hortifruti.jpg'),
  feira: require('../assets/images/feira.jpg'),
  legumes: require('../assets/images/legumes.jpg'),
  frutaria: require('../assets/images/frutaria.jpg'),
  verduras: require('../assets/images/verduras.jpg'),
};

// Componente principal
export default function Estabelecimentos() {
  const router = useRouter();
  const [mostrarAbertos, setMostrarAbertos] = useState(true);

  const estabelecimentos = [
    { id: '1', nome: 'Mercadinho Central', aberto: true, logo: imagens.mercadinho },
    { id: '2', nome: 'Padaria Pão Quente', aberto: false, logo: imagens.padaria },
    { id: '3', nome: 'Hortifruti Natural', aberto: true, logo: imagens.hortifruti },
    { id: '4', nome: 'Feira da Fruta Fresca', aberto: true, logo: imagens.feira },
    { id: '5', nome: 'Legumes & Cia', aberto: false, logo: imagens.legumes },
    { id: '6', nome: 'Frutaria Doce Sabor', aberto: true, logo: imagens.frutaria },
    { id: '7', nome: 'Verduras do Vale', aberto: true, logo: imagens.verduras },
  ];

  const filtrados = mostrarAbertos
    ? estabelecimentos.filter(e => e.aberto)
    : estabelecimentos.filter(e => !e.aberto);

  const handlePress = (id: string, nome: string, aberto: boolean) => {
    router.push({
      pathname: '/produtos',
      params: { estabelecimentoId: id, estabelecimentoNome: nome, aberto: aberto.toString() },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estabelecimentos</Text>

      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>
          {mostrarAbertos ? 'Mostrando abertos' : 'Mostrando fechados'}
        </Text>
        <Switch
          value={mostrarAbertos}
          onValueChange={() => setMostrarAbertos(prev => !prev)}
          thumbColor="#fff"
          trackColor={{ false: '#FF6B6B', true: '#65B741' }}
        />
      </View>

      <FlatList
        data={filtrados}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.item,
              !item.aberto && styles.itemFechado
            ]}
            onPress={() => handlePress(item.id, item.nome, item.aberto)}
            activeOpacity={0.7}
          >
            <View style={styles.itemContent}>
              <Image
                source={item.logo}
                style={styles.logo}
                resizeMode="contain"
                onError={(e) => console.log('Erro ao carregar imagem:', e.nativeEvent.error)}
              />
              <View style={styles.textContainer}>
                <Text style={styles.nome}>{item.nome}</Text>
                <Text style={[
                  styles.status,
                  item.aberto ? styles.statusAberto : styles.statusFechado
                ]}>
                  {item.aberto ? '● Aberto agora' : '● Fechado'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// Estilos com melhorias visuais (sem mudar estrutura)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#65B741',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  switchText: {
    fontSize: 16,
    color: '#555',
    fontWeight: '500',
  },
  listContainer: {
    paddingBottom: 20,
  },
  item: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 12,
    padding: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#65B741',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 1.5,
  },
  itemFechado: {
    borderLeftColor: '#FF6B6B',
    opacity: 0.8,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 15,
    backgroundColor: '#F0F0F0',
  },
  textContainer: {
    flex: 1,
  },
  nome: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
    marginBottom: 3,
  },
  status: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 2,
  },
  statusAberto: {
    color: '#65B741',
  },
  statusFechado: {
    color: '#FF6B6B',
  },
});
