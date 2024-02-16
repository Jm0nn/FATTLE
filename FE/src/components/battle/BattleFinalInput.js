import React, { useRef } from 'react';

import { Button, Modal, Form, Card, ListGroup, Badge } from 'react-bootstrap';
import BattleFoodModalStyles from '../../styles/battle/BattleFoodModal.module.css';
import MyGoalStyles from '../../styles/mypage/MyGoal.module.css';
import {
  finishBattle,
  finishBattleWeight,
  getBattleInfo,
} from '../../services/battle/api.js';
import { useNavigate } from 'react-router-dom';
const BattleFinalInput = ({ show, userCode, nickname, battleCode }) => {
  const finalWeight = useRef(null);
  const navigate = useNavigate();
  const typeFinalWeight = async () => {
    console.log(finalWeight.current.value, battleCode, userCode);
    await finishBattleWeight(battleCode, userCode, finalWeight.current.value);
    const res = await getBattleInfo(battleCode);
    // 두 명다 최종 체중 입력하면 배틀을 종료시킴
    if (
      res.data.playerList[0].afterWeight !== 0 &&
      res.data.playerList[1].afterWeight !== 0
    ) {
      await finishBattle(battleCode);
    }
    navigate('/battle');
  };
  return (
    <>
      <Modal
        show={show}
        // onHide={handleClose}
        centered
        dialogClassName={BattleFoodModalStyles.modal}
      >
        <Modal.Header closeButton>
          <Modal.Title>최종 체중 입력</Modal.Title>
          <div className={BattleFoodModalStyles.date}>{nickname}</div>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{ flexDirection: 'row' }}
            className={MyGoalStyles.inputBox}
          >
            {/* <div className={MyGoalStyles.inputHeader}>최종 체중</div> */}
            <input
              style={{
                width: '100px',
                textAlign: 'right',
                fontSize: '20px',
              }}
              type="text"
              id="goalWeight"
              //   value={goalWeight}
              onChange={(e) => {
                // setGoalWeight(e.target.value);
              }}
              ref={finalWeight}
              placeholder="0"
              name="battleName"
              className={MyGoalStyles.input}
            ></input>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '25px',
                fontWeight: 'bold',
              }}
            >
              Kg
            </div>
          </div>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
            className={MyGoalStyles.nextBtn}
            type="submit"
          >
            <button
              style={{
                width: '150px',
              }}
              onClick={typeFinalWeight}
            >
              입력
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BattleFinalInput;
