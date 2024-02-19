from flask import Flask, jsonify, request

# 모듈 import
import pymysql
# from seperate import detect, initModel
import sys
sys.path.append('./yolov3/')
from food_detect import detect

app = Flask(__name__)

# classificationModel = initModel()

print("Server Start")

@app.route('/food_detect', methods=['POST'])
def food_detect():
    # MySQL 데이터베이스 연결
    # db = pymysql.connect(host='i10e106.p.ssafy.io', port=3306, user='', password='', db='', charset='utf8')

    # 데이터에 접근
    # cursor = db.cursor()
    # cursor = db.cursor(pymysql.cursors.DictCursor)

    req_json = request.get_json()
    source = req_json['source']

    detect_result = detect(source, 0.1, 0.7)
    # detect_result = detect('./yolov3/data/samples/', 0.1, 0.7)
    # detect_result = detect('https://i.pinimg.com/736x/16/44/92/164492765c40d39d826a6d6bf76a61c3.jpg', 0.1, 0.7)
    # detect_result = detect('../res_test/', 0.1, 0.7)

    # response = None

    # if(detect_result != None):
    #     # SQL query 작성
    #     sql = "select * from food_info where food_cd = "+detect_result

    #     # SQL query 실행
    #     cursor.execute(sql)
    #     # result = cursor.fetchall()
    #     response = cursor.fetchone()
    #     db.commit()

    # db.close()
    # return jsonify(response)
    return source

if __name__=='__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)