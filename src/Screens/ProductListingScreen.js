import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DATA = [
  {
    id: '1',
    brand: 'SM Commerce',
    title: 'Yoga Mat – Foldable, Fashion...',
    price: 452,
    originalPrice: 854,
    discount: 47,
    image: {
      uri: 'https://i.pcmag.com/imagery/articles/065sMpPMAsExQT5l1Vx3mvT-14..v1707759856.jpg',
    },
  },
  {
    id: '2',
    brand: 'SM Commerce',
    title: 'Yoga Mat – Foldable, Fashion...',
    price: 452,
    originalPrice: 854,
    discount: 47,
    image: {
      uri: 'https://i.pcmag.com/imagery/articles/065sMpPMAsExQT5l1Vx3mvT-14..v1707759856.jpg',
    },
  },
  {
    id: '3',
    brand: 'SM Commerce',
    title: 'Yoga Mat – Foldable, Fashion...',
    price: 452,
    originalPrice: 854,
    discount: 47,
    image: {
      uri: 'https://i.pcmag.com/imagery/articles/065sMpPMAsExQT5l1Vx3mvT-14..v1707759856.jpg',
    },
  },

];

const ProductListing = () => {
  const [isWishlisted, setIsWishlisted] = React.useState(false);
  const toggleWishlist = (id) => {
    setIsWishlisted((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <TouchableOpacity style={styles.heartIcon}onPress={() => toggleWishlist(item.id)}>
        <Ionicons
          
          name={isWishlisted[item.id] ? 'heart' : 'heart-outline'}
          size={20}
          color={isWishlisted[item.id] ? 'red' : 'gray'}
        />
      </TouchableOpacity>
      <Text style={styles.brand}>Brand - {item.brand}</Text>
      <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>
        ₹{item.price}{'  '}
        <Text style={styles.originalPrice}>₹{item.originalPrice}</Text>{'  '}
        <Text style={styles.discount}>{item.discount}% OFF</Text>
      </Text>
    </View>
  );

  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={styles.container}
    />
  );
};

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 32) / 2;

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 8,
    position: 'relative',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  brand: {
    fontSize: 12,
    color: '#007bff',
    marginTop: 8,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 4,
  },
  price: {
    fontSize: 14,
    marginTop: 6,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: '#999',
    fontSize: 12,
  },
  discount: {
    color: 'red',
    fontSize: 12,
  },
});

export default ProductListing;
