// import React, { useState } from 'react';
// import { OpenVidu } from 'openvidu-browser';
// import axios from 'axios';
// import BASE_URL from '../../config.js';

// const BattleLive = (props) => {
//   const [mySessionId, setMySessionId] = useState('sessionA');
//   const [myUserName, setMyUserName] = useState(
//     'Participant' + Math.floor(Math.random() * 100),
//   );
//   const [session, setSession] = useState(null);
//   const [mainStreamManager, setMainStreamManager] = useState(null);
//   const [publisher, setPublisher] = useState(null);
//   const [subscribers, setSubscribers] = useState([]);

//   const [currentVideoDevice, setCurrentVIdeoDevice] = useState(null);

//   //   const [openVidu, setOpenVidu] = useState({
//   //     mySessionId: 'sessionA',
//   //     myUserName: 'Participant' + Math.floor(Math.random() * 100),
//   //     session: null,
//   //     mainStreamManager: null,
//   //     publisher: null,
//   //     subscribers: null,
//   //   });

//   //   필요한 method들
//   function onbeforeunload(event) {
//     leaveSession();
//   }

//   function handleChangeSessionId(e) {
//     this.setState({
//       mySessionId: e.target.value,
//     });
//   }

//   function handleChangeUserName(e) {
//     this.setState({
//       myUserName: e.target.value,
//     });
//   }

//   function handleMainVideoStream(stream) {
//     if (this.state.mainStreamManager !== stream) {
//       this.setState({
//         mainStreamManager: stream,
//       });
//     }
//   }

//   function deleteSubscriber(streamManager) {
//     let subscribers = this.state.subscribers;
//     let index = subscribers.indexOf(streamManager, 0);
//     if (index > -1) {
//       subscribers.splice(index, 1);
//       this.setState({
//         subscribers: subscribers,
//       });
//     }
//   }

//   const joinSession = () => {
//     const OV = new OpenVidu();
//     let mySession = OV.initSession();
//     setSession(mySession);

//     // On every new Stream received...
//     mySession.on('streamCreated', (event) => {
//       // Subscribe to the Stream to receive it. Second parameter is undefined
//       // so OpenVidu doesn't create an HTML video by its own
//       var subscriber = mySession.subscribe(event.stream, undefined);
//       var subscribers = subscribers;
//       subscribers.push(subscriber);
//       setSubscribers(subscribers);
//       // On every Stream destroyed...
//       mySession.on('streamDestroyed', (event) => {
//         // Remove the stream from 'subscribers' array
//         deleteSubscriber(event.stream.streamManager);
//       });

//       // On every asynchronous exception...
//       mySession.on('exception', (exception) => {
//         console.warn(exception);
//       });

//       // Update the state with the new subscribers
//       //   setOpenVidu((prevOpenVidu) => {
//       //     return newOpenVidu;
//       //   });

//       // --- 4) Connect to the session with a valid user token ---

//       // Get a token from the OpenVidu deployment
//       getToken().then((token) => {
//         // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
//         // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
//         mySession
//           .connect(token, { clientData: myUserName })
//           .then(async () => {
//             // --- 5) Get your own camera stream ---

//             // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
//             // element: we will manage it on our own) and with the desired properties
//             let publisher = await OV.initPublisherAsync(undefined, {
//               audioSource: undefined, // The source of audio. If undefined default microphone
//               videoSource: undefined, // The source of video. If undefined default webcam
//               publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
//               publishVideo: true, // Whether you want to start publishing with your video enabled or not
//               resolution: '640x480', // The resolution of your video
//               frameRate: 30, // The frame rate of your video
//               insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
//               mirror: false, // Whether to mirror your local video or not
//             });

//             // --- 6) Publish your stream ---

//             mySession.publish(publisher);

//             // Obtain the current video device in use
//             var devices = await OV.getDevices();
//             var videoDevices = devices.filter(
//               (device) => device.kind === 'videoinput',
//             );
//             var currentVideoDeviceId = publisher.stream
//               .getMediaStream()
//               .getVideoTracks()[0]
//               .getSettings().deviceId;
//             var currentVideoDevice = videoDevices.find(
//               (device) => device.deviceId === currentVideoDeviceId,
//             );

//             // Set the main video in the page to display our webcam and store our Publisher
//             this.setState({
//               currentVideoDevice: currentVideoDevice,
//               mainStreamManager: publisher,
//               publisher: publisher,
//             });
//           })
//           .catch((error) => {
//             console.log(
//               'There was an error connecting to the session:',
//               error.code,
//               error.message,
//             );
//           });
//       });
//     });
//   };
//   leaveSession() {

//         // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

//         const mySession = this.state.session;

//         if (mySession) {
//             mySession.disconnect();
//         }

//         // Empty all properties...
//         this.OV = null;
//         this.setState({
//             session: undefined,
//             subscribers: [],
//             mySessionId: 'SessionA',
//             myUserName: 'Participant' + Math.floor(Math.random() * 100),
//             mainStreamManager: undefined,
//             publisher: undefined
//         });
//     }

//     async function switchCamera() {
//         try {
//             const devices = await this.OV.getDevices()
//             var videoDevices = devices.filter(device => device.kind === 'videoinput');

//             if (videoDevices && videoDevices.length > 1) {

//                 var newVideoDevice = videoDevices.filter(device => device.deviceId !== this.state.currentVideoDevice.deviceId)

//                 if (newVideoDevice.length > 0) {
//                     // Creating a new publisher with specific videoSource
//                     // In mobile devices the default and first camera is the front one
//                     var newPublisher = this.OV.initPublisher(undefined, {
//                         videoSource: newVideoDevice[0].deviceId,
//                         publishAudio: true,
//                         publishVideo: true,
//                         mirror: true
//                     });

//                     //newPublisher.once("accessAllowed", () => {
//                     await this.state.session.unpublish(this.state.mainStreamManager)

//                     await this.state.session.publish(newPublisher)
//                     this.setState({
//                         currentVideoDevice: newVideoDevice[0],
//                         mainStreamManager: newPublisher,
//                         publisher: newPublisher,
//                     });
//                 }
//             }
//         } catch (e) {
//             console.error(e);
//         }
//     }

//   /**
//    * --------------------------------------------
//    * GETTING A TOKEN FROM YOUR APPLICATION SERVER
//    * --------------------------------------------
//    * The methods below request the creation of a Session and a Token to
//    * your application server. This keeps your OpenVidu deployment secure.
//    *
//    * In this sample code, there is no user control at all. Anybody could
//    * access your application server endpoints! In a real production
//    * environment, your application server must identify the user to allow
//    * access to the endpoints.
//    *
//    * Visit https://docs.openvidu.io/en/stable/application-server to learn
//    * more about the integration of OpenVidu in your application server.
//    */
//   async function getToken() {
//     const sessionId = await this.createSession(this.state.mySessionId);
//     return await this.createToken(sessionId);
//   }

//   async function createSession(sessionId) {
//     const response = await axios.post(
//       BASE_URL + '/api/sessions',
//       { customSessionId: sessionId },
//       {
//         headers: { 'Content-Type': 'application/json' },
//       },
//     );
//     return response.data; // The sessionId
//   }

//   async function createToken(sessionId) {
//     const response = await axios.post(
//       BASE_URL + '/api/sessions/' + sessionId + '/connections',
//       {},
//       {
//         headers: { 'Content-Type': 'application/json' },
//       },
//     );
//     return response.data; // The token
//   }

//   return (
//     <>
//       <button onClick={joinSession}>세션 가입</button>
//     </>
//   );
// };

// export default BattleLive;
