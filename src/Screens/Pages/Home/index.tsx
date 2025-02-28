import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import CustomSearch from '../../../Components/CustomSearch';
import {Colors, dynamicSize} from '../../../Config';
import {useIndex} from './useIndex';
import {Banner, Product} from '../../../types/Product';
import {Navigation} from '../../../types/Navigation';
import {CustomIconMenu} from '../../../Components/CustomIconMenu';

export const Home = ({navigation, route}: Navigation) => {
  const {
    banner,
    data,
    isLoading,
    navigateFromDetails,
    favoriteProduct,
    searchProducts,
    setSearchProducts,
    filteredProducts,
  } = useIndex({
    navigation,
    route,
  });

  const renderBannerItem = ({item}: {item: Banner}) => (
    <View style={styles.carouselItem}>
      <Image
        source={{uri: item?.photo}}
        style={styles.carouselImage}
        resizeMode="cover"
      />
    </View>
  );

  const renderProductItem = ({item}: {item: Product}) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => navigateFromDetails(item.id)}>
        <Image
          source={{uri: item?.photos[0]}}
          style={styles.image}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.heartIcon}
        onPress={() => favoriteProduct()}>
        <Feather
          name="heart"
          size={dynamicSize(18)}
          color={Colors.blue}
          style={styles.heartIcon}
        />
      </TouchableOpacity>
      <View style={styles.cardContent}>
        <Text style={styles.textName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.textCategory}>{item.category}</Text>
        <Text style={styles.text}>{`R$ ${item.price}`}</Text>
      </View>
    </View>
  );

  const renderHeader = () => (
    <>
      <View>
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.blue} />
        ) : (
          <FlatList
            data={banner}
            renderItem={renderBannerItem}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={dynamicSize(300)}
            decelerationRate="fast"
            snapToAlignment="center"
          />
        )}

        <Text style={styles.textMenu}>Categorias</Text>
        <CustomIconMenu />
        <Text style={styles.textMore}>Mais vendidos</Text>
      </View>
    </>
  );

  const renderFilteredProductItem = ({item}: {item: Product}) => (
    <TouchableOpacity
      style={styles.filteredProductItem}
      onPress={() => navigateFromDetails(item.id)}>
      <Image
        source={{uri: item.photos[0]}}
        style={styles.filteredProductImage}
      />
      <Text style={styles.filteredProductName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors.blue} />
      ) : (
        <>
          <CustomSearch
            value={searchProducts}
            onChangeText={setSearchProducts}
          />
          {searchProducts.length > 0 && filteredProducts.length > 0 && (
            <View style={styles.overlay}>
              <FlatList
                data={filteredProducts}
                renderItem={renderFilteredProductItem}
                keyExtractor={item => item.id.toString()}
                style={styles.filteredProductList}
              />
            </View>
          )}
          <FlatList
            data={data}
            renderItem={renderProductItem}
            keyExtractor={item => item.id.toString()}
            ListHeaderComponent={renderHeader}
            contentContainerStyle={{paddingBottom: 50}}
            numColumns={2}
            columnWrapperStyle={styles.wrapper}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  carouselItem: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: dynamicSize(5),
    borderRadius: dynamicSize(8),
    width: dynamicSize(300),
    height: dynamicSize(200),
  },
  carouselImage: {
    width: dynamicSize(300),
    height: dynamicSize(200),
    borderRadius: dynamicSize(8),
  },
  textMenu: {
    fontSize: dynamicSize(16),
    fontFamily: 'Poppins-SemiBold',
    color: Colors.blue,
    marginLeft: dynamicSize(20),
    marginVertical: dynamicSize(10),
  },
  wrapper: {
    justifyContent: 'space-between',
  },
  textMore: {
    fontSize: dynamicSize(16),
    fontFamily: 'Poppins-SemiBold',
    color: Colors.blue,
    marginLeft: dynamicSize(20),
  },
  card: {
    marginVertical: dynamicSize(10),
    borderRadius: dynamicSize(10),
    flex: 1,
    marginHorizontal: dynamicSize(10),
    alignItems: 'center',
    overflow: 'hidden',
    height: dynamicSize(250),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    backgroundColor: Colors.white,
  },
  image: {
    width: dynamicSize(200),
    height: dynamicSize(140),
  },
  heartIcon: {
    position: 'absolute',
    top: dynamicSize(10),
    right: dynamicSize(10),
    color: Colors.red,
  },
  cardContent: {
    paddingHorizontal: dynamicSize(10),
    paddingVertical: dynamicSize(8),
    alignItems: 'center',
  },
  textName: {
    fontSize: dynamicSize(14),
    fontFamily: 'Poppins-SemiBold',
    color: Colors.blue,
    textAlign: 'center',
  },
  textCategory: {
    fontSize: dynamicSize(12),
    fontFamily: 'Poppins-Regular',
    color: Colors.black,
    marginTop: dynamicSize(4),
    textAlign: 'center',
  },
  text: {
    fontSize: dynamicSize(16),
    fontFamily: 'Poppins-Bold',
    color: Colors.blue,
    marginTop: dynamicSize(8),
    textAlign: 'center',
  },
  overlay: {
    position: 'absolute',
    top: dynamicSize(60),
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    zIndex: 1,
    borderRadius: dynamicSize(10),
  },
  filteredProductList: {
    maxHeight: dynamicSize(200),
  },
  filteredProductItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: dynamicSize(10),
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayCard,
  },
  filteredProductImage: {
    width: dynamicSize(40),
    height: dynamicSize(40),
    marginRight: dynamicSize(10),
  },
  filteredProductName: {
    fontSize: dynamicSize(14),
    color: Colors.black,
    flex: 1,
    flexWrap: 'wrap',
  },
});
