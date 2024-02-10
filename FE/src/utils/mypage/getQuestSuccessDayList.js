/**
 * 퀘스트를 성공한 day(일)을의 리스트를 받아오는 함수
 * @param {Array.<{dateAttrName:String, finish:Boolean}>} daysInfoList - 날짜와 성공여부(finish)에 대한 속성값을 가지고 있는 객체를 담고 있는 리스트
 * @param {String}  dateAttrName - 서버에서 가져온 객체에서 날짜 key 값
 * @returns {Number[]} 퀘스트를 성공한 날들을 담은 리스트를 반환한다.
 */
const getQuestSuccessDayList = (daysInfoList, dateAttrName) => {
  const questSuccessList = daysInfoList
    .map((item) => {
      // 퀘스트를 성공했다면 리스트에 일을 담아준다.
      if (item.finish) {
        const day = new Date(item[dateAttrName]).getDate();
        return day;
      }
      return null;
    })
    // 리스트에서 null인것들은 필터링해줌
    .filter((notNull) => notNull !== null);
  return questSuccessList;
};

export default getQuestSuccessDayList;
