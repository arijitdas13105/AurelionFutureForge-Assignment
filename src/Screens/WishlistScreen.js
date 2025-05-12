import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import ProductCard from './Components/ProductCard';
import DATA from '../utils/dummyData';
import useAuthStore from '../store/zustandStore';

const WishlistScreen = () => {
  const { wishlist, toggleWishlist } = useAuthStore();
  const wishlistedItems = DATA.filter((item) => wishlist.includes(item.id));

  if (wishlistedItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Your wishlist is empty.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={wishlistedItems}
      renderItem={({ item }) => (
        <ProductCard
          item={item}
          isWishlisted={wishlist.includes(item.id)}
          onToggleWishlist={() => toggleWishlist(item.id)}
        />
      )}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#777',
  },
});

export default WishlistScreen;
