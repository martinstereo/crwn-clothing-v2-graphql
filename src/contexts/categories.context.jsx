import { gql, useQuery } from '@apollo/client';

import { createContext, useState, useEffect } from 'react';

//import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

const GET_CATEGORIES = gql`
  query GetCategories {
    collections {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  useEffect(() => {
    if (data) {
      const { collections } = data;
      const collectionsMap = collections.reduce((acc, collection) => {
        acc[collection.title.toLowerCase()] = collection.items;
        return acc;
      }, {});
      setCategoriesMap(collectionsMap);
    }
  }, [data]);

  //if (error) return `Error! ${error.message}`;

  const value = { categoriesMap, loading };
  return (
    <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
  );
};
