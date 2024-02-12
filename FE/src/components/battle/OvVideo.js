import React, { useRef, useEffect } from 'react';

export default function OpenViduVideoComponent({ streamManager }) {
  const videoRef = useRef();

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
      console.log('streamanger: ', streamManager);
    }
  }, [streamManager]);

  return <video autoPlay={true} ref={videoRef} />;
}
