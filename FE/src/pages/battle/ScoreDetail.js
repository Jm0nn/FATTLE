import React, { useEffect } from 'react';
import { useState } from 'react';
import Loading from '../../components/commons/Loading.js';

import { Button, Modal, Form, Card, ListGroup, Badge } from 'react-bootstrap';
import { getPointHistory } from '../../services/battle/api.js';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from '../../styles/battle/BattleFoodModal.module.css';
const ScoreDetail = ({ show, handleClose, handleShow }) => {
  const { state } = useLocation();
  const [initLoading, setInitLoading] = useState(true);
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  useEffect(() => {
    if (state === null) {
      navigate('/');
    }
    (async () => {
      const res = await getPointHistory(state.battleCode);
      console.log(res);
      setData(res.data.list);
      setInitLoading(false);
    })();
  }, []);
  const getType = (type) => {
    //     1: 자극자라이브점수
    // 2: 자극자식단점수
    // 3: 라이브기본점수
    // 4: 식단기본점수
    // 5: 일일퀘스트점수
    // 6: 목표점수
    if (type === 1) {
      return '자극자라이브점수';
    } else if (type === 2) {
      return '자극자식단점수';
    } else if (type === 3) {
      return '라이브기본점수';
    } else if (type === 4) {
      return '식단기본점수';
    } else if (type === 5) {
      return '일일퀘스트점수';
    } else {
      return '목표점수';
    }
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
              <Modal.Title>점수 히스토리</Modal.Title>
            </Modal.Header>

            <Modal.Body
              style={{
                display: 'block',
                height: '400px',
                overflowy: 'scroll',
              }}
            >
              <Card style={{ height: '400px', overflow: 'scroll' }}>
                <ListGroup
                  as="ol"
                  // style={{ maxheight: '100px', overflowy: 'scroll' }}
                  //   className={styles.listGroup}
                >
                  {data.map((item, index) => (
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className={`fw-bold ${styles.subject}`}>
                          to : {item.playerName}
                        </div>
                        <div className={`${styles.content}`}>
                          from :{' '}
                          {item.triggerName ? item.triggerName : '퀘스트점수'}{' '}
                          <br />
                          {item.type}
                        </div>
                      </div>
                      <Badge className={styles.badge} bg="secondary" pill>
                        {item.point}
                      </Badge>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card>
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  );
};

export default ScoreDetail;
