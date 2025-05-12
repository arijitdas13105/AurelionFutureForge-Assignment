// src/components/ProductCard.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProductCard = ({ item, isWishlisted, onToggleWishlist }) => {
  return (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <TouchableOpacity style={styles.heartIcon} onPress={() => onToggleWishlist(item.id)}>
        <Ionicons
          name={isWishlisted ? 'heart' : 'heart-outline'}
          size={20}
          color={isWishlisted ? 'red' : 'gray'}
        />
      </TouchableOpacity>
      <Text style={styles.brand}>Brand - {item.brand}</Text>
      <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>
        ₹{item.price}{' '}
        <Text style={styles.originalPrice}>₹{item.originalPrice}</Text>{' '}
        <Text style={styles.discount}>{item.discount}% OFF</Text>
      </Text>
    </View>
  );
};

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 32) / 2;

const styles = StyleSheet.create({
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

export default ProductCard;
