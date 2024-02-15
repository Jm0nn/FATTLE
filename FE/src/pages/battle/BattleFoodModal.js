import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/battle/BattleFoodModal.module.css';
import { Button, Modal, Form, Card, ListGroup, Badge } from 'react-bootstrap';
import Loading from '../../components/commons/Loading.js';
import img from '../../assets/svg/battle/foodTMP.svg';
import {
  getBattleFoodCommentList,
  giveFoodPoint,
  registFoodComment,
} from '../../services/battle/api.js';
import { useSelector } from 'react-redux';
import BASE_URL from '../../config.js';
const BattleFoodModal = ({ data, show, handleClose, handleShow }) => {
  // 리덕스
  const userCode = useSelector((state) => state.userCode);

  // 조건 보여주기위한 상태변수
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);

  // 엘리먼트 Ref 변수
  const contentEle = useRef(null);
  const scoreEle = useRef(null);

  const [content, setContent] = useState('');
  const [score, setScore] = useState(0);

  // 렌더링 상태변수
  const [foodList, setFoodList] = useState(null);

  useEffect(() => {
    // 1. 이 식단의 베틀 테이블 데이터 조회
    (async () => {
      const res = await getBattleFoodCommentList(data.boardCode);
      console.log(res);
      setFoodList(res.data.list);
      setInitLoading(false);
    })();
  }, []);

  //METHOD
  const postComment = async () => {
    try {
      setLoading(true);
      const commentRes = await registFoodComment({
        boardCode: data.boardCode,
        userCode: userCode,
        content: content,
      });
      const scoreRes = await giveFoodPoint({
        battleCode: data.battleCode,
        playerUserCode: data.playerUserCode,
        triggerUserCode: userCode,
        type: 2,
        point: score,
      });
      // contentEle.current.value = '';
      // scoreEle.current.value = '';
      setContent('');
      setScore(0);
      setLoading(false);
      console.log(commentRes);
      console.log(scoreRes);
    } catch (error) {
      console.error(error);
    }
  };

  const onContentChangeHandler = (e) => {
    setContent(e.target.value);
  };
  const onScoreChangeHandler = (e) => {
    setScore(e.target.value);
  };
  return (
    <>
      {initLoading ? (
        <Loading />
      ) : (
        <>
          <Modal
            show={show}
            onHide={handleClose}
            centered
            dialogClassName={styles.modal}
          >
            <Modal.Header closeButton>
              <Modal.Title>{data.nickname}</Modal.Title>
              <div className={styles.date}>{data.recDate.split('T')[0]}</div>
            </Modal.Header>
            <Modal.Body>
              <div className={styles.foodImgContainer}>
                <img
                  className={styles.foodImg}
                  src={`${BASE_URL}/food/img/${data.imgName}`}
                  alt="foodImg"
                />
              </div>
              {loading ? (
                <Loading />
              ) : (
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      inputRef={contentEle}
                      type="text"
                      placeholder="댓글을 입력하세요."
                      onChange={onContentChangeHandler}
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Control
                    inputRef={(ref) => (scoreEle = ref)}
                    type="number"
                    onChange={onScoreChangeHandler}
                    placeholder="식단 점수를 입력해주세요(0~100)"
                  ></Form.Control>
                  <Button
                    styles={{ backgroundColor: 'red' }}
                    size="sm"
                    onClick={postComment}
                    variant="secondary"
                    className="mt-3"
                  >
                    댓글& 점수 달기
                  </Button>
                </Form>
              )}
            </Modal.Body>
            <Modal.Footer style={{ display: 'block', overflowy: 'scroll' }}>
              <Card style={{ maxheight: '100px', overflowy: 'scroll' }}>
                <ListGroup
                  as="ol"
                  // style={{ maxheight: '100px', overflowy: 'scroll' }}
                  className={styles.listGroup}
                >
                  {foodList.map((item, index) => (
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className={`fw-bold ${styles.subject}`}>
                          익명의 자극자 {Math.floor(Math.random() * 100)}
                        </div>
                        <div className={`${styles.content}`}>
                          {item.content}
                        </div>
                      </div>
                      <Badge className={styles.badge} bg="secondary" pill>
                        10
                      </Badge>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
};

export default BattleFoodModal;
