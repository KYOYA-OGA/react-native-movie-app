import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Dimensions, FlatList} from 'react-native';
import {getPopularMovies, getUpcomingMovies} from '../services/services';
import {SliderBox} from 'react-native-image-slider-box';
import react from 'react';
import List from '../components/List';

const dimentions = Dimensions.get('screen');

const Home = () => {
  const [movieImages, setMovieImages] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getUpcomingMovies()
      .then(movies => {
        const movieImagesArray = movies.map(movie => {
          return `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        });
        setMovieImages(movieImagesArray);
      })
      .catch(err => {
        setError(err);
      });
    getPopularMovies()
      .then(movies => {
        setPopularMovies(movies);
      })
      .catch(err => {
        setError(err);
      });
  }, []);

  return (
    <>
      <View style={styles.sliderContainer}>
        <SliderBox
          images={movieImages}
          dotStyle={styles.sliderStyle}
          sliderBoxHeight={dimentions.height / 1.5}
          autoplay={true}
          circleLoop={true}
        />
      </View>
      <View style={styles.carousel}>
        <List title="Popular Movies" content={popularMovies} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderStyle: {
    height: 0,
  },
  carousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
