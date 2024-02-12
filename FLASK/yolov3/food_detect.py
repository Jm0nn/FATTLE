# -*-coding:utf-8-*-
import argparse

from models import *  # set ONNX_EXPORT in models.py
from utils.datasets import *
from utils.utils import *
from xml.etree.ElementTree import Element, SubElement, ElementTree
import numpy as np
import platform as pf
import psutil
import PIL
import pandas as pd
import seaborn as sns
from PIL import Image

def indent(elem, level=0):  #
    i = "\n" + level * "  "
    if len(elem):
        if not elem.text or not elem.text.strip():
            elem.text = i + "  "
        if not elem.tail or not elem.tail.strip():
            elem.tail = i
        for elem in elem:
            indent(elem, level + 1)
        if not elem.tail or not elem.tail.strip():
            elem.tail = i
    else:
        if level and (not elem.tail or not elem.tail.strip()):
            elem.tail = i

def ToF(file, cat):
    if cat == '00000000':
        output = "N"
    elif str(file).split('_')[2] == cat:
        output = "T"
    else:
        output = "F"
    
    return output
    
def detect(img_source, conf=0.1, iou=0.7):
    save_img=True

    opt = { 'agnostic_nms':False, 'augment':False, 'cfg':'./yolov3/cfg/yolov3-spp-403cls.cfg', 
           'classes':None, 'conf_thres':conf, 'device':'', 'fourcc':'mp4v', 'half':False, 'img_size':320, 
           'iou_thres':iou, 'names':'./yolov3/data/403food.names', 'output':'output', 'save_txt':False, 
           'save_xml':False, 'source':img_source, 'view_img':False, 'weights':'./yolov3/weights/best_403food_e200b150v2.pt'}
    # opt = { 'agnostic_nms':False, 'augment':False, 'cfg':'./yolov3/cfg/yolov3-spp-403cls.cfg', 
    #        'classes':None, 'conf_thres':0.1, 'device':'', 'fourcc':'mp4v', 'half':False, 'img_size':320, 
    #        'iou_thres':0.7, 'names':'./yolov3/data/403food.names', 'output':'output', 'save_txt':False, 
    #        'save_xml':False, 'source':'./yolov3/data/samples/', 'view_img':False, 'weights':'./yolov3/weights/best_403food_e200b150v2.pt'}
    print("=== PARAM ==>"+"img_source : "+str(img_source) +", conf_thres : "+str(conf)+", iou_thres : "+str(iou))
    # ONNX : 다른 프레임워크에서 모델을 돌려볼 수 있도록 해주는 것?
    imgsz = (320, 192) if ONNX_EXPORT else opt['img_size']  # (320, 192) or (416, 256) or (608, 352) for (height, width)
    out, source, weights, half, view_img, save_txt, save_xml = opt['output'], opt['source'], opt['weights'], opt['half'], opt['view_img'], opt['save_txt'], opt['save_xml']
 
    # source : 사진 들어있는 폴더 경로 ex) data/samples
    
    # Initialize
    # opt.device default 값 : ''
#     print("ONNX_EXPORT", ONNX_EXPORT)  # False
    device = torch_utils.select_device(device='cpu' if ONNX_EXPORT else opt['device'])
    if os.path.exists(out):
        shutil.rmtree(out)  # delete output folder
    os.makedirs(out)  # make new output folder

    # Initialize model
    # !!이미지 크기 넘겨주면 사진 크기 상관없이 인식할 수 있지 않을까?
    # Darknet : 신경망 학습 툴
    model = Darknet(opt['cfg'], imgsz)

    # Load weights
    # 학습된 모델
    attempt_download(weights)
    if weights.endswith('.pt'):  # pytorch format
        model.load_state_dict(torch.load(weights, map_location=device)['model'], strict=False)
    else:  # darknet format
        load_darknet_weights(model, weights)

    # Eval mode
    model.to(device).eval()

    # Half precision
    half = half and device.type != 'cpu'  # half precision only supported on CUDA
    if half:
        model.half()

    # Set Dataloader
    # 사진 불러오기
    vid_path, vid_writer = None, None
    save_img = True
    #dataset = LoadImage(user_img, img_size=imsz)
    dataset = LoadImages(source, img_size=imgsz)

    # Get names and colors
    # 음식코드 목록
    names = load_classes(opt['names'])
    colors = [[random.randint(0, 255) for _ in range(3)] for _ in range(len(names))]
    rslt = []
    nT = 0
    nF = 0
    nN = 0
    nND = 0
    # Run inference
    # t0 : 분석 시작시간
    t0 = time.time()
    img = torch.zeros((1, 3, imgsz, imgsz), device=device)  # init img
    _ = model(img.half() if half else img.float()) if device.type != 'cpu' else None  # run once
    
    # 사진 목록 하나씩 돌기
    for path, img, im0s, vid_cap in dataset:     
        img = torch.from_numpy(img).to(device)
        img = img.half() if half else img.float()  # uint8 to fp16/32
        img /= 255.0  # 0 - 255 to 0.0 - 1.0
  
        
        if img.ndimension() == 3:
            img = img.unsqueeze(0)  # 0번째 차원
        
        # Inference : 추론
        t1 = torch_utils.time_synchronized()
        pred = model(img, augment=opt['augment'])[0]
        t2 = torch_utils.time_synchronized()

        # to float
        if half:
            pred = pred.float()
        
        # Apply NMS
        # 바운딩 박스 여러개 중에 가장 잘 나타내는 것 하나 빼고 다 지우기
        pred = non_max_suppression(pred, opt['conf_thres'], opt['iou_thres'],
                                   multi_label=False, classes=opt['classes'], agnostic=opt['agnostic_nms'])
        
        # Process detections
        for i, det in enumerate(pred):  # detections for image i
            p, s, im0 = path, '', im0s

            save_path = str(Path(out) / Path(p).name)
            #s += '%gx%g ' % img.shape[2:]  # print string
            gn = torch.tensor(im0.shape)[[1, 0, 1, 0]]  #  normalization gain whwh

            root = Element('annotation')
            SubElement(root, 'folder').text = str(Path(out))
            SubElement(root, 'filename').text = str(Path(p))
            SubElement(root, 'path').text = save_path

            if det is not None and len(det):
                print("det", len(det))
                if len(det) == 1:
                    print("인식 안 됨")
                    return None
                
                # Rescale boxes from imgsz to im0 size
                det[:, :4] = scale_coords(img.shape[2:], det[:, :4], im0.shape).round()
                count = 0
 
                # Print results
                for c in det[:, -1].unique():
                    n = (det[:, -1] == c).sum()  # detections per class
                    s += '%g %s, ' % (n, names[int(c)])  # add to string
#                     s += '%s, ' % (ToF(str(Path(p)), names[int(c)]))  # add True or False
#                     print("c: ", int(c))
                    if names[int(c)] != '00000000' : 
                        print("인식 결과", names[int(c)])
                        return names[int(c)]    
                    # else:
                    #     print("인식 안 됨")
                    #     return "None"

            # Print time (inference + NMS)
            print('%s (%.3fs)' % (s, t2 - t1))
            print()
            # Stream results
            if view_img:
                cv2.imshow(p, im0)
                if cv2.waitKey(1) == ord('q'):  # q to quit
                    raise StopIteration

    print('Done. (%.3fs)' % (time.time() - t0))
