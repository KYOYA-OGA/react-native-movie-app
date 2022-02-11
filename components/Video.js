import React from 'react';
import VideoPlayer from 'react-native-video-controls';

const Video = ({navigation, onClose}) => {
  return (
    <VideoPlayer
      source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}}
      navigator={navigation}
      onBack={onClose}
      onEnd={onClose}
      fullscreenOrientation="all"
    />
  );
};

export default Video;
