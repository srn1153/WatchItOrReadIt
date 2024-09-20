export const navigateToItemDetail = (navigation, item, searchType) => {
    const itemWithType = { ...item, type: searchType };
    console.log('Navigating with item:', itemWithType);
    navigation.navigate('ItemDetail', { item: itemWithType });
  };
  