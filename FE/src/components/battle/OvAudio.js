import React, { useRef, useEffect } from 'react';

export default function OpenViduAudioComponent({ streamManager }) {
  const audioRef = useRef();

  useEffect(() => {
    if (streamManager && audioRef.current) {
      streamManager.addVideoElement(audioRef.current);
      console.log('streamanger: ', streamManager);
    }
  }, [streamManager]);

  return <audio style={{ display: 'hidden' }} autoPlay={true} ref={audioRef} />;
}
