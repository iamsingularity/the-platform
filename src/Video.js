import React from 'react';
import { createResource } from 'simple-cache-provider';
import { cache } from './cache';

function load(attributes) {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    Object.keys(attributes).forEach(name =>
      video.setAttribute(name, attributes[name])
    );
    waitForReadyState(video, resolve.bind(null, src));
  });
}

function waitForReadyState(video, done) {
  if (video.readyState >= 3) {
    return done();
  }
  requestAnimationFrame(waitForReadyState.bind(null, video, done));
}

const resource = createResource(load, ({ src }) => src);

export const Video = ({ cache, ...props }) => {
  resource.read(cache, props);
  return <video {...props} />;
};

Video.defaultProps = {
  cache,
};