import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Dimensions, ScrollView} from 'react-native';
import {
  getPopularMovies,
  getUpcomingMovies,
  getPopularTv,
  getFamilyMovies,
  getDocumentaries,
} from '../services/services';
import {SliderBox} from 'react-native-image-slider-box';
import List from '../components/List';

const dimentions = Dimensions.get('screen');

const Home = () => {
  const [movieImages, setMovieImages] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTv, setPopularTv] = useState([]);
  const [familyMovies, setFamilyMovies] = useState([]);
  const [documentaries, setDocumentaries] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getData()
      .then(
        ([
          upcomingMoviesData,
          popularMoviesData,
          popularTvData,
          familyMoviesData,
          documentariesData,
        ]) => {
          const movieImagesArray = upcomingMoviesData.map(movie => {
            return `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
          });
          setMovieImages(movieImagesArray);
          setPopularMovies(popularMoviesData);
          setPopularTv(popularTvData);
          setFamilyMovies(familyMoviesData);
          setDocumentaries(documentariesData);
        },
      )
      .catch(err => {
        setError(err);
      });
  }, []);

  const getData = () => {
    return Promise.all([
      getUpcomingMovies(),
      getPopularMovies(),
      getPopularTv(),
      getFamilyMovies(),
      getDocumentaries(),
    ]);
  };

  return (
    <>
      <ScrollView>
        {movieImages && (
          <View style={styles.sliderContainer}>
            <SliderBox
              images={movieImages}
              dotStyle={styles.sliderStyle}
              sliderBoxHeight={dimentions.height / 1.5}
              autoplay={true}
              circleLoop={true}
            />
          </View>
        )}
        {popularMovies && (
          <View style={styles.carousel}>
            <List title="Popular Movies" content={popularMovies} />
          </View>
        )}
        {popularTv && (
          <View style={styles.carousel}>
            <List title="Popular TV Shows" content={popularTv} />
          </View>
        )}
        {familyMovies && (
          <View style={styles.carousel}>
            <List title="Family Movies" content={familyMovies} />
          </View>
        )}
        {documentaries && (
          <View style={styles.carousel}>
            <List title="Documentaries" content={documentaries} />
          </View>
        )}
      </ScrollView>
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
