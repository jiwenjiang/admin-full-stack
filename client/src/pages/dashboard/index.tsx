import { DatabaseTwoTone, UserOutlined } from '@ant-design/icons'
import { Row, Col, Progress, Tag, Table } from 'antd'
import React, { FC, useState, useEffect } from 'react'
import { PieChart, Pie, Tooltip, Cell } from 'recharts'
import './index.less'

const data = [
  { name: '记录数量', value: 4544 },
  { name: '报告数量', value: 3321 },
  { name: '用户数量', value: 3113 }
]

const tableData = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser']
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
]

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: React.ReactNode) => <a>{text}</a>
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  }
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#E36E7E', '#8F66DE']

const DashBoardPage: FC = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(undefined as any)
    }, 2000)
    return () => {
      clearTimeout(timer)
    }
  }, [])
  return (
    <div className="container">
      <Row gutter={10}>
        <Col span={5}>
          <div className="card-panel">
            <div className="card-panel-icon-wrapper">
              <UserOutlined className="dashboard-icon" style={{ color: '#f7913c' }} />
            </div>
            <div className="card-panel-description">
              <p className="card-panel-text">新增用户</p>
              <span className="card-panel-num">7642</span>
            </div>
          </div>
        </Col>
        <Col span={5}>
          <div className="card-panel">
            <div className="card-panel-icon-wrapper">
              <DatabaseTwoTone className="dashboard-icon" />
            </div>
            <div className="card-panel-description">
              <p className="card-panel-text">新增数据</p>
              <span className="card-panel-num">12311</span>
            </div>
          </div>
        </Col>
        <Col span={5}>
          <div className="card-panel">
            <div className="card-panel-process-wrapper">
              <Progress type="circle" percent={75} width={65} />
            </div>
            <div className="card-panel-description">
              <p className="card-panel-text">存储容量</p>
              <span className="card-panel-num">1024MB</span>
            </div>
          </div>
        </Col>
        <Col span={9}>
          <div className="card-panel">
            <div className="card-panel-chart-wrapper">
              <PieChart width={80} height={80}>
                <Pie dataKey="value" data={data} innerRadius={20} outerRadius={40} fill="#82ca9d">
                  {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
            <div className="card-panel-chart-description">
              <p className="card-panel-text">综合统计</p>
              <p>
                <Tag color="#0088FE">记录</Tag>
                <Tag color="#00C49F">报告</Tag>
                <Tag color="#FFBB28" style={{ marginRight: 0 }}>
                  用户
                </Tag>
              </p>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="table-box">
        <Col span={24}>
          <div className="table-card-panel">
            <Table columns={columns} pagination={{ position: ['bottomRight'] }} dataSource={tableData} />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default DashBoardPage
