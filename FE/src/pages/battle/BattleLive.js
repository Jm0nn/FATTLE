import { OpenVidu } from 'openvidu-browser';

import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import UserVideoComponent from '../../components/battle/UserVideoComponent';
import { useLocation, useNavigate } from 'react-router-dom';
import BASE_URL from '../../config.js';
import Chatting from './Chatting.js';

import styles from '../../styles/battle/BattleLive.module.css';

const APPLICATION_SERVER_URL = BASE_URL;

const BattleLive = () => {
  // 커스텀 변수
  const { state } = useLocation();
  const navigate = useNavigate();
  const [mySessionId, setMySessionId] = useState(undefined);
  const [myUserName, setMyUserName] = useState('');
  let sessionName = '';
  let nickname = '';

  const [chatList, setChatList] = useState([]);
  const dataId = useRef(0);

  // 비디오 관련 변수

  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(null);

  // const OV = useRef(new OpenVidu());
  const OV = useRef(null);

  const joinSession = useCallback(() => {
    OV.current = new OpenVidu();
    OV.current.enableProdMode();
    const mySession = OV.current.initSession();

    mySession.on('streamCreated', (event) => {
      const subscriber = mySession.subscribe(event.stream, undefined);
      setSubscribers((subscribers) => [...subscribers, subscriber]);
    });

    mySession.on('streamDestroyed', (event) => {
      deleteSubscriber(event.stream.streamManager);
    });

    mySession.on('exception', (exception) => {
      console.warn(exception);
    });

    setSession(mySession);
  }, []);
  useEffect(() => {
    if (state === null) {
      navigate('/main');
      return;
    }
    // setMySessionId(state.sessionId);
    // setMyUserName(state.nickname);
    sessionName = state.sessionId;
    nickname = state.nickname;
    joinSession();
  }, []);

  useEffect(() => {
    if (session) {
      // Get a token from the OpenVidu deployment
      getToken().then(async (token) => {
        try {
          await session.connect(token, { clientData: nickname });

          let publisher = await OV.current.initPublisherAsync(undefined, {
            audioSource: undefined,
            videoSource: undefined,
            publishAudio: true,
            publishVideo: true,
            resolution: '640x480',
            frameRate: 30,
            insertMode: 'APPEND',
            mirror: false,
            // filter,
          });

          session.publish(publisher);

          const devices = await OV.current.getDevices();
          const videoDevices = devices.filter(
            (device) => device.kind === 'videoinput',
          );
          const currentVideoDeviceId = publisher.stream
            .getMediaStream()
            .getVideoTracks()[0]
            .getSettings().deviceId;
          const currentVideoDevice = videoDevices.find(
            (device) => device.deviceId === currentVideoDeviceId,
          );

          setMainStreamManager(publisher);
          setPublisher(publisher);
          setCurrentVideoDevice(currentVideoDevice);
        } catch (error) {
          console.log(
            'There was an error connecting to the session:',
            error.code,
            error.message,
          );
        }
      });
    }
  }, [session]);

  const leaveSession = useCallback(() => {
    // Leave the session
    if (session) {
      session
        .signal({
          data: true,
          to: [],
          type: 'end-live',
        })
        .then(() => {
          console.log('Message successfully sent');
          session.disconnect();
          // navigate('/battle');
        })
        .catch((err) => {
          console.err(err);
        })
        .finally(() => {
          navigate('/battle');
        });
    }
    // Reset all states and OpenVidu object
    OV.current = new OpenVidu();
    setSession(undefined);
    setSubscribers([]);
    setMySessionId('SessionA');
    setMyUserName('Participant' + Math.floor(Math.random() * 100));
    setMainStreamManager(undefined);
    setPublisher(undefined);
  }, [session]);

  const deleteSubscriber = useCallback((streamManager) => {
    setSubscribers((prevSubscribers) => {
      const index = prevSubscribers.indexOf(streamManager);
      if (index > -1) {
        const newSubscribers = [...prevSubscribers];
        newSubscribers.splice(index, 1);
        return newSubscribers;
      } else {
        return prevSubscribers;
      }
    });
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      leaveSession();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [leaveSession]);

  /**
   * --------------------------------------------
   * GETTING A TOKEN FROM YOUR APPLICATION SERVER
   * --------------------------------------------
   * The methods below request the creation of a Session and a Token to
   * your application server. This keeps your OpenVidu deployment secure.
   *
   * In this sample code, there is no user control at all. Anybody could
   * access your application server endpoints! In a real production
   * environment, your application server must identify the user to allow
   * access to the endpoints.
   *
   * Visit https://docs.openvidu.io/en/stable/application-server to learn
   * more about the integration of OpenVidu in your application server.
   */
  const getToken = useCallback(async () => {
    return createSession(sessionName).then((sessionName) =>
      createToken(sessionName),
    );
  }, [mySessionId]);

  const createSession = async (sessionName) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + '/openvidu/sessions',
      { customSessionId: sessionName },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
    console.log(response.data);
    return response.data; // The sessionId
  };

  const createToken = async (sessionName) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL +
        '/openvidu/sessions/' +
        sessionName +
        '/connections',
      {},
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
    return response.data; // The token
  };
  return (
    <div className={styles.container}>
      {session !== undefined ? (
        <div id="session">
          <div id="session-header">
            <h1 id="session-title">{sessionName}</h1>
            <input
              className="btn btn-large btn-danger"
              type="button"
              id="buttonLeaveSession"
              onClick={leaveSession}
              value="Leave session"
            />
          </div>

          {mainStreamManager !== undefined ? (
            <div id="main-video" className="col-md-6">
              <UserVideoComponent streamManager={mainStreamManager} />
            </div>
          ) : null}
          <Chatting session={session} />
        </div>
      ) : null}
    </div>
  );
};

export default BattleLive;
