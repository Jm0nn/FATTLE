import { OpenVidu } from 'openvidu-browser';

import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import UserVideoComponent from '../../components/battle/UserVideoComponent';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import BASE_URL from '../../config.js';
import Chatting from './Chatting.js';
import OvVideo from '../../components/battle/OvVideo.js';

import API from '../../services/main/URL.js';

import styles from '../../styles/battle/BattleLive.module.css';
import ProfileImg from '../../assets/svg/mypage/ProfileImg.svg';
import { useSelector } from 'react-redux';

const APPLICATION_SERVER_URL = BASE_URL;

const BattleLive = () => {
  // 커스텀 변수
  const { state } = useLocation();
  const userCode = useSelector((state) => state.userCode);
  const navigate = useNavigate();
  const [mySessionId, setMySessionId] = useState(undefined);
  const [myUserName, setMyUserName] = useState('');
  const [profileImg, setProfileImg] = useState('');
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
      console.log('streamDestroyed');
      console.log(subscribers);
      deleteSubscriber(event.stream.streamManager);
    });

    mySession.on('exception', (exception) => {
      console.warn(exception);
    });

    setSession(mySession);
  }, []);

  // useEffect 초기 실행
  useEffect(() => {
    if (state === null) {
      navigate('/main');
      return;
    }
    // (async () => {
    //   const { data } = await axios.get(API.USER_GET + userCode);
    //   setProfileImg(data.profileImgPath);
    // })();
    // setMySessionId(state.sessionId);
    // setMyUserName(state.nickname);
    sessionName = state.sessionId;
    console.log(state.sessionId);
    nickname = state.nickname;
    setMyUserName(nickname);
    joinSession();
  }, []);

  useEffect(() => {
    if (session) {
      console.log('session');
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
    // OV.current = new OpenVidu();
    // setSession(undefined);
    // setSubscribers([]);
    // setMySessionId('SessionA');
    // setMyUserName('Participant' + Math.floor(Math.random() * 100));
    // setMainStreamManager(undefined);
    // setPublisher(undefined);
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
    <>
      {/* <button onClick={() => console.log(subscribers)}>asd</button> */}
      {session !== undefined ? (
        <div id="session" className={styles.container}>
          <div id="session-header" className={styles.header}>
            <div id="session-title" className={styles.sessionTitle}>
              <div className={styles.img}>
                <img src={ProfileImg} alt="P" />
                {/* 임시로 가져온것이므로 나중에 밑에로 변경해주어야함 */}
                {/* <img src={profileImg} alt="P" /> */}
              </div>
              <div>{myUserName}</div>
            </div>
            <div className={styles.headerRight}>
              <div className={styles.liveText}>라이브 방송</div>
              <div className={styles.watchers}>
                <svg
                  style={{ color: 'white' }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  fill="currentColor"
                  class="bi bi-eye-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                </svg>
                &nbsp;{subscribers.length - 1}
              </div>
              <button
                onClick={leaveSession}
                className={`btn-close btn-close-white ${styles.closeBtn}`}
              ></button>
            </div>
          </div>

          {mainStreamManager !== undefined ? (
            <div id="main-video" className={styles.video}>
              <OvVideo streamManager={mainStreamManager} />
            </div>
          ) : null}
          <Chatting session={session} />
        </div>
      ) : null}
    </>
  );
};

export default BattleLive;
