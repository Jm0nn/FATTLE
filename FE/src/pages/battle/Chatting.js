import React, { useEffect, useState } from 'react';

const Chatting = ({ session }) => {
  const [chatList, setChatList] = useState({
    messageList: [],
    message: '',
  });
  console.log(12345);
  const { messageList, message } = chatList;

  useEffect(() => {
    console.log('Hellow');
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
      });
    }
  }, []);
  return (
    <div>
      {messageList.map((item, index) => (
        <div key={index}>
          {item.from} : {item.text}
        </div>
      ))}
    </div>
  );
};

export default Chatting;
