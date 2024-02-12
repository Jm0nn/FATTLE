import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/battle/Chatting.module.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { getLeftLivePoint, giveLivePoint } from '../../services/battle/api.js';
import { useNavigate } from 'react-router-dom';

const Chatting = ({
  session,
  myUserName,
  battleCode,
  triggerUserCode,
  playerUserCode,
}) => {
  const navigate = useNavigate();
  const [chatList, setChatList] = useState({
    messageList: [],
    message: '',
  });
  const [isTyping, setIsTyping] = useState(true);
  const scrollRef = useRef();
  const pointRef = useRef();
  const chatInputEle = useRef(null);
  const [show, setShow] = useState(false);
  const [leftLivePoint, setLeftLivePoint] = useState(0);
  const { messageList, message } = chatList;

  useEffect(() => {
    if (session) {
      session.on('signal:chat-live', (event) => {
        const data = event.data.split(':');
        const from = data[0];
        const text = data[1];
        messageList.push({
          from,
          text,
        });
        setChatList((prev) => ({ ...prev, messageList }));
        setIsTyping((prev) => !prev);
      });
      session.on('signal:chat-point', (event) => {
        const data = event.data.split(':');
        const from = data[0];
        const text = data[1];
        const isPoint = true;
        messageList.push({
          from,
          text,
          isPoint,
        });
        setChatList((prev) => ({ ...prev, messageList }));
        setIsTyping((prev) => !prev);
      });
    }
  }, [session]);
  useEffect(() => {
    (async () => {
      const res = await getLeftLivePoint(battleCode, triggerUserCode);
      setLeftLivePoint(res.data.remainPoint);
    })();
  }, [leftLivePoint]);
  useEffect(() => {
    scrollToBottom();
  }, [isTyping]);
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };
  const sendChatting = () => {
    session
      .signal({
        data: `${myUserName}:${chatInputEle.current.value}`, // Any string (optional)
        to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
        type: 'chat-live', // The type of message (optional)
      })
      .then(() => {
        console.log('Message successfully sent');
        chatInputEle.current.value = '';
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // 점수주기 관련 부분
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const givePoint = () => {
    try {
      if (pointRef.current.value > leftLivePoint) {
        alert('남은 라이브점수보다 더 많은 점수를 줄 수 없습니다.');
        return;
      }
      if (pointRef.current.value == 0) {
        alert('0점 보다 높은점수를 입력해주세요.');
        return;
      }
      if (pointRef.current.value === '') {
        alert('점수를 입력해주세요.');
        return;
      }
      (async () => {
        const res = await giveLivePoint({
          battleCode,
          playerUserCode,
          triggerUserCode,
          type: 1,
          point: pointRef.current.value,
        });
        if (res.status === 200) {
          session
            .signal({
              data: `🎁 ${myUserName}:님이 ${pointRef.current.value} 점을 후원하셨습니다. 🎁`, // Any string (optional)
              to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
              type: 'chat-point', // The type of message (optional)
            })
            .then(() => {
              console.log('Point successfully sent');
              handleClose();
              setLeftLivePoint(0);
              pointRef.current.value = 0;
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          alert('점수를 주지 못했습니다.');
          handleClose();
        }
      })();
    } catch (error) {
      console.error(error);
      navigate('/main');
    }
  };
  return (
    <div className={styles['chatContainer']}>
      <ul ref={scrollRef} className={styles['instagram-live-chat']}>
        {messageList.map((item, index) => (
          <li className={styles['message']} key={index}>
            {item.isPoint ? (
              <>
                <div
                  className={styles.pointMsg}
                >{`${item.from}${item.text}`}</div>
              </>
            ) : (
              <>
                <div className={styles['username']}>{item.from}</div>
                <div className={styles['text']}>{item.text}</div>
              </>
            )}
          </li>
        ))}
      </ul>
      <div className={styles.chatFooter}>
        <input className={styles['input']} type="text" ref={chatInputEle} />
        <button className={styles.sendBtn} onClick={sendChatting}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            // width="16"
            // height="16"
            fill="currentColor"
            class="bi bi-send"
            viewBox="0 0 16 16"
          >
            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
          </svg>
        </button>
        <button onClick={handleShow} className={styles.score}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="bi bi-plus-square"
            viewBox="0 0 16 16"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
        </button>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName={styles.modal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title as={styles.modalTitle}>
            보유 라이브 점수 : {leftLivePoint}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>후원할 점수</Form.Label>
              <Form.Control
                ref={pointRef}
                type="number"
                placeholder="0"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={givePoint} variant="secondary">
            후원하기
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Chatting;
