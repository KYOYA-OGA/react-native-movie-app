import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Card from '../components/Card';
import Error from '../components/Error';
import {searchMovieTv} from '../services/services';

const Search = ({navigation}) => {
  const [text, setText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(false);

  const onSubmit = query => {
    const searchQuery = query.trim().toLowerCase();
    Promise.all([
      searchMovieTv(searchQuery, 'movie'),
      searchMovieTv(searchQuery, 'tv'),
    ])
      .then(([movie, tv]) => {
        const data = [...movie, ...tv];
        setSearchResults(data);
        console.log(searchResults);
      })
      .catch(() => {
        setError(true);
      });
  };

  return (
    <>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Search movie or TV show"
              onChangeText={inputText => setText(inputText)}
              value={text}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              onSubmit(text);
            }}>
            <Icon name={'search-outline'} size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.searchItems}>
          {searchResults && searchResults.length > 0 && (
            <FlatList
              numColumns={3}
              data={searchResults}
              renderItem={({item}) => {
                return <Card navigation={navigation} item={item} />;
              }}
              keyExtractor={item => item.id.toString()}
            />
          )}
          {searchResults && searchResults.length === 0 && (
            <View style={styles.empty}>
              <Text>No results matching your criteria.</Text>
              <Text>Try different words</Text>
            </View>
          )}
          {!searchResults && (
            <View style={styles.empty}>
              <Text>Type something to start searching</Text>
            </View>
          )}

          {error && <Error />}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 15,
    borderWidth: 0.5,
    height: 50,
    padding: 8,
  },
  container: {
    padding: 10,
    paddingTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  form: {
    flexBasis: 'auto',
    flexGrow: 1,
    paddingRight: 8,
  },
  empty: {
    padding: 10,
  },
  searchItems: {
    padding: 5,
  },
});

export default Search;
