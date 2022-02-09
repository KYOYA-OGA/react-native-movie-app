import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Card from './Card';
import PropTypes from 'prop-types';

const propTypes = {
  title: PropTypes.string,
  content: PropTypes.array,
};

class List extends React.PureComponent {
  render() {
    const {title, content} = this.props;
    return (
      <View style={styles.list}>
        <View>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View>
          <FlatList
            data={content}
            renderItem={({item}) => <Card item={item} />}
            horizontal={true}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    marginTop: 25,
  },

  text: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 20,
  },
});

List.propTypes = propTypes;

export default List;
