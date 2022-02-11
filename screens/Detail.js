import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  ActivityIndicator,
  View,
} from 'react-native';
import {Rating} from 'react-native-ratings';
import Error from '../components/Error';
import {getMovieById} from '../services/services';
import dateFormat from 'dateformat';
import PlayButton from '../components/PlayButton';

const placeholderImage = require('../assets/images/placeholder.png');
const height = Dimensions.get('screen').height;

const Detail = ({route, navigation}) => {
  const movieId = route.params.movieId;

  const [movieDetail, setMovieDetail] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    getMovieById(movieId)
      .then(movieData => {
        setMovieDetail(movieData);
        setLoaded(true);
      })
      .catch(() => {
        setError(true);
      });
  }, [movieId]);
  console.log(movieDetail);
  return (
    <>
      {loaded && (
        <ScrollView>
          <Image
            resizeMode="cover"
            style={styles.image}
            source={
              movieDetail.poster_path
                ? {
                    uri: `https://image.tmdb.org/t/p/w500/${movieDetail.poster_path}`,
                  }
                : placeholderImage
            }
          />
          <View style={styles.container}>
            <View style={styles.playButton}>
              <PlayButton />
            </View>
            <Text style={styles.title}>{movieDetail.title}</Text>
            {movieDetail.genres && (
              <View style={styles.genresContainer}>
                {movieDetail.genres.map(genre => (
                  <Text style={styles.genre} key={genre.id}>
                    {genre.name}
                  </Text>
                ))}
              </View>
            )}

            <Rating
              startingValue={movieDetail.vote_average / 2}
              type="star"
              ratingCount={5}
              imageSize={30}
              readonly={true}
            />
            <Text style={styles.overview}>{movieDetail.overview}</Text>
            <Text style={styles.releaseDate}>
              Release data :{' '}
              {dateFormat(movieDetail.release_date, 'yyyy-mm-dd')}
            </Text>
          </View>
        </ScrollView>
      )}
      {!loaded && <ActivityIndicator size="large" />}
      {error && <Error />}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: height * 0.5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 10,
  },
  genresContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  genre: {
    marginRight: 10,
    fontWeight: 'bold',
  },
  overview: {
    padding: 15,
  },
  releaseDate: {
    fontWeight: 'bold',
  },
  playButton: {
    position: 'absolute',
    top: -25,
    right: 20,
  },
});

export default Detail;
