import {
  DashboardTwoTone,
  DatabaseTwoTone,
  LeftCircleFilled,
  PauseCircleFilled,
  PlayCircleFilled,
  StepBackwardFilled,
  StepForwardFilled,
  UserOutlined
} from '@ant-design/icons'
import { Row, Col, Progress, Tag, Table, Descriptions } from 'antd'
import Axios from 'axios'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import React, { FC, useState, useEffect, useRef, useMemo, memo } from 'react'
import { BoneDataType } from '~/interface/data/bone'
import './index.less'
import { angle_bac } from '~/utils/tools'

const btnStyle = { fontSize: 20, cursor: 'pointer', display: 'inline-block' }
const extendStyle = { marginRight: 20, marginLeft: 20 }

const jsonKeys = [
  'Head',
  'Neck',
  'RShoulder',
  'RElbow',
  'RWrist',
  'LShoulder',
  'LElbow',
  'Lwrist',
  'RHip',
  'RKnee',
  'RAnkle',
  'LHip',
  'LKnee',
  'LAnkle',
  'Chest'
]

const MemoChart = memo(BoneCharts)

const DetailData: FC = () => {
  const canvas = useRef(null)
  const json = useRef<BoneDataType[] | null>(null)
  const animateId = useRef<any>(null)
  const animateIndex = useRef<any>(0)
  const [isAni, setAni] = useState(true)
  const [, setDataIndex] = useState(0)
  const pointpairs = [0, 1, 1, 2, 2, 3, 3, 4, 1, 5, 5, 6, 6, 7, 1, 14, 14, 8, 8, 9, 9, 10, 14, 11, 11, 12, 12, 13]
  const paircolors = [
    '#FF0055',
    '#FF0000',
    '#FF5500',
    '#FFAA00',
    '#FFFF00',
    '#AAFF00',
    '#55FF00',
    '#2BFF00',
    '#00FF00',
    '#00FF55',
    '#00FFAA',
    '#00FFFF',
    '#00AAFF',
    '#0055FF',
    '#0000FF'
  ]

  const renderMethod = (data: any) => {
    const canvasNode: any = canvas.current
    if (!canvasNode) return
    const ctx = canvasNode.getContext('2d')
    ctx.clearRect(0, 0, 426, 240)
    const keypoints = data.people[0].pose_keypoints_2d

    for (let i = 0; i < pointpairs.length; i = i + 2) {
      const index1 = pointpairs[i]
      const index2 = pointpairs[i + 1]
      if (keypoints[index1 * 3 + 2] < 0.6 || keypoints[index2 * 3 + 2] < 0.6) continue
      const startpointx = keypoints[index1 * 3]
      const startpointy = keypoints[index1 * 3 + 1]
      const endpointx = keypoints[index2 * 3]
      const endpointy = keypoints[index2 * 3 + 1]

      //重新开始一条路径使颜色不互相影响
      ctx.beginPath()
      //设置笔触的颜色
      ctx.strokeStyle = paircolors[index1]
      //设置线宽，10的效果还不错
      ctx.lineWidth = 10
      //设置开始坐标
      ctx.moveTo(startpointx / 3, startpointy / 3)
      //设置结束坐标
      ctx.lineTo(endpointx / 3, endpointy / 3)
      //绘制线条
      ctx.stroke()
    }
  }
  const renderBoneNode = (data: any) => {
    if (data.length > 1) {
      animateIndex.current++
      animateId.current = window.requestAnimationFrame(() => renderBoneNode(data.slice(1)))
    } else {
      animateIndex.current = 0
      animateId.current = window.requestAnimationFrame(() => renderBoneNode(json.current))
    }
    setDataIndex(animateIndex.current)
    if (data.length === 0) return
    renderMethod(data[0])
  }

  useEffect(() => {
    const files = require.context('../../mock/boneJson', false, /\.json$/)
    const jsonData = files.keys().map(v => {
      return files(v)
    }, {})

    json.current = jsonData
    animateIndex.current = 0
    renderBoneNode(jsonData)
  }, [])

  const changeAni = (bool: boolean) => {
    setAni(bool)
    if (bool) {
      renderBoneNode(json.current?.slice(animateIndex.current))
    } else {
      console.log(animateIndex.current)
      window.cancelAnimationFrame(animateId.current)
    }
  }

  const manualAni = (num: number) => {
    animateIndex.current = animateIndex.current + num
    const data = json.current?.[animateIndex.current]
    renderMethod(data)
  }

  return (
    <div className="container">
      <div className="card-panel base-info">
        <Descriptions size="small">
          <Descriptions.Item label="姓名">张叔</Descriptions.Item>
          <Descriptions.Item label="性别">男</Descriptions.Item>
          <Descriptions.Item label="年龄">44</Descriptions.Item>
          <Descriptions.Item label="生日">1990.01.01</Descriptions.Item>
          <Descriptions.Item label="联系方式">1838888888</Descriptions.Item>
          <Descriptions.Item label="康复项目">康复项目</Descriptions.Item>
          <Descriptions.Item label="训练时间">2h</Descriptions.Item>
        </Descriptions>
      </div>
      <Row gutter={10}>
        <Col span={6}>
          <div className="card-panel">
            <div className="card-panel-detail-wrapper">
              <p className="label">完成度</p>
              <Progress percent={80} status="active" className="process" />
            </div>
            <div className="card-panel-description">
              <p className="card-panel-text">整体得分</p>
              <span className="card-panel-num">93</span>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="card-panel">
            <div className="card-panel-icon-wrapper">
              <DashboardTwoTone className="dashboard-icon" style={{ color: '#f7913c' }} />
            </div>
            <div className="card-panel-description">
              <p className="card-panel-text">训练时长</p>
              <span className="card-panel-num">25分33秒26</span>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="card-panel">
            <div className="card-panel-process-wrapper">
              <Progress type="circle" percent={90} width={65} />
            </div>
            <div className="card-panel-description">
              <p className="card-panel-text">综合得分</p>
              <span className="card-panel-num">90</span>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="card-panel">
            <div className="card-panel-process-wrapper">
              <Progress type="circle" percent={80} width={65} />
            </div>
            <div className="card-panel-description">
              <p className="card-panel-text">整体相似度</p>
              <span className="card-panel-num">80</span>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="table-box">
        <div className="table-card-panel node-canvas">
          <canvas ref={canvas} width="426" height="240"></canvas>
          <div className="oprate">
            <StepBackwardFilled style={btnStyle} onClick={() => manualAni(-1)} />
            {isAni ? (
              <PauseCircleFilled style={{ ...btnStyle, ...extendStyle }} onClick={() => changeAni(false)} />
            ) : (
              <PlayCircleFilled style={{ ...btnStyle, ...extendStyle }} onClick={() => changeAni(true)} />
            )}
            <StepForwardFilled style={btnStyle} onClick={() => manualAni(1)} />
          </div>
        </div>
        <div className="table-card-panel data-info">
          <div>
            模型：<span>MPI-openpose</span>
          </div>
          <Row className="data-row">
            {json.current &&
              jsonKeys.map((v, i) => (
                <Col span={12} key={v} className="data-col">
                  {i + 1}.{v}：&emsp;
                  <span className="data-value">
                    {json.current?.[animateIndex.current]?.people?.[0]?.pose_keypoints_2d
                      .slice(i * 3, i * 3 + 3)
                      .join()}
                  </span>
                </Col>
              ))}
          </Row>
        </div>
      </Row>
      <Row className="table-box">
        <MemoChart data={json.current}></MemoChart>
      </Row>
    </div>
  )
}

export default DetailData

type chartDataType<T> = {
  RElbow: T
  LElbow: T
  RKnee: T
  LKnee: T
  i: T
}

type ArrType = Array<BoneDataType> | null
function BoneCharts({ data }: { data: ArrType }) {
  const handleData = (data: ArrType) => {
    console.log('d', data)
    const arr: Array<chartDataType<number>> = []
    data?.forEach((v, i) => {
      const list = v.people[0].pose_keypoints_2d
      const RElbow = angle_bac(
        { x: list[2 * 3], y: list[2 * 3 + 1] },
        { x: list[1 * 3], y: list[1 * 3 + 1] },
        { x: list[3 * 3], y: list[3 * 3 + 1] }
      )
      const LElbow = angle_bac(
        { x: list[5 * 3], y: list[5 * 3 + 1] },
        { x: list[4 * 3], y: list[4 * 3 + 1] },
        { x: list[6 * 3], y: list[6 * 3 + 1] }
      )
      const RKnee = angle_bac(
        { x: list[8 * 3], y: list[8 * 3 + 1] },
        { x: list[7 * 3], y: list[7 * 3 + 1] },
        { x: list[9 * 3], y: list[9 * 3 + 1] }
      )
      const LKnee = angle_bac(
        { x: list[11 * 3], y: list[11 * 3 + 1] },
        { x: list[10 * 3], y: list[10 * 3 + 1] },
        { x: list[12 * 3], y: list[12 * 3 + 1] }
      )
      arr.push({ RElbow, LElbow, RKnee, LKnee, i })
    })

    return arr
  }

  const chartData: Array<chartDataType<number>> = useMemo(() => handleData(data), [data])
  console.log('char', chartData)

  return (
    <div className="table-box">
      <div className="table-card-panel">
        <LineChart
          width={800}
          height={400}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="i" />
          <YAxis />
          <Legend />
          <Line type="monotone" dataKey="RElbow" stroke="#8884d8" dot={false} />
          <Line type="monotone" dataKey="LElbow" stroke="red" dot={false} />
          <Line type="monotone" dataKey="RKnee" stroke="#82cabc" dot={false} />
          <Line type="monotone" dataKey="LKnee" stroke="#aaaaaa" dot={false} />
        </LineChart>
      </div>
    </div>
  )
}
