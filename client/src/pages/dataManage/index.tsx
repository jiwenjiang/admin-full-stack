import { DatabaseTwoTone, UserOutlined } from '@ant-design/icons'
import { Row, Col, Progress, Tag, Table, Form, Input, Button } from 'antd'
import React, { FC, useState, useEffect } from 'react'
import { PieChart, Pie, Tooltip, Cell } from 'recharts'
import { Link } from 'react-router-dom'
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
    address: 'New York No. 1 Lake Park'
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park'
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  },
  {
    key: '4',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  },
  {
    key: '5',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  }
]

const columns = [
  {
    title: '用户',
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
  },
  {
    title: '操作',
    dataIndex: 'oprate',
    key: 'oprate',
    render(_: any, record: any) {
      return <Link to={`/dataDetail/${record.key}`}>详情</Link>
    }
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

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  return (
    <div className="container">
      <Row>
        <div className="box-card">
          <Form name="basic" initialValues={{ remember: true }} layout="inline" onFinish={onFinish}>
            <Form.Item label="姓名" name="name">
              <Input style={{ width: 200 }} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Row>
      <Row className="table-box">
        <Col span={24}>
          <div className="table-card-panel">
            <Table columns={columns} size="small" pagination={{ position: ['bottomRight'] }} dataSource={tableData} />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default DashBoardPage
