import { Row, Col, Table, Form, Input, Button, Modal } from 'antd'
import React, { FC, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiGetUserList } from '~/api/user.api'
import './index.less'
import UserEnum from '../../../../const/index'
import moment from 'moment'
import { TablePaginationConfig } from 'antd/lib/table'

const { genderLabel, userTypeLabel } = UserEnum

const columns = [
  {
    title: '用户名',
    dataIndex: 'userName',
    key: 'userName',
    render: (text: React.ReactNode) => <a>{text}</a>
  },
  {
    title: '姓名',
    dataIndex: 'realName',
    key: 'realName'
  },
  {
    title: '性别',
    dataIndex: 'gender',
    key: 'gender',
    render: (text: number) => <span>{genderLabel[text]}</span>
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    key: 'phone'
  },
  {
    title: '创建日期',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (text: number) => <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>
  },
  {
    title: '角色',
    dataIndex: 'type',
    key: 'type',
    render: (text: number) => <span>{userTypeLabel[text]}</span>
  },
  {
    title: '操作',
    dataIndex: 'oprate',
    key: 'oprate',
    render(_: any, record: any) {
      return (
        <>
          <Link to={`/regist?edit=${record._id}`}>编辑</Link>
          <Link to={`/dataDetail/${record.key}`}>详情</Link>
        </>
      )
    }
  }
]

const initParams = {
  current: 1,
  pageSize: 10,
  userName: ''
}

const DashBoardPage: FC = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [params, setParams] = useState(initParams)
  const [total, setTotal] = useState(0)

  const getList = async (params: typeof initParams) => {
    setLoading(true)
    const res = await apiGetUserList(params)
    setLoading(false)
    setData(res.data.docs)
    setTotal(res.data.totalDocs)
    setParams({ ...params, current: res.data.page })
  }

  useEffect(() => {
    getList(initParams)
  }, [])

  const onFinish = (values: any) => {
    setParams({ ...params, ...values })
    getList({ ...params, ...values })
  }

  const handleTableChange = (pagination: TablePaginationConfig) => {
    getList({ ...params, current: pagination.current as number })
  }

  return (
    <>
      <div className="container">
        <Row>
          <div className="box-card">
            <Form name="basic" layout="inline" onFinish={onFinish}>
              <Form.Item label="用户名" name="userName">
                <Input style={{ width: 200 }} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  搜索
                </Button>
                <Button
                  type="primary"
                  style={{ marginLeft: 10 }}
                  onClick={() => navigate({ pathname: '/regist?entry=user&edit=false' })}
                >
                  新增用户
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Row>
        <Row className="table-box">
          <Col span={24}>
            <div className="table-card-panel">
              <Table
                columns={columns}
                size="small"
                loading={loading}
                pagination={{ total, ...params }}
                dataSource={data}
                rowKey={row => row._id}
                onChange={handleTableChange}
              />
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default DashBoardPage
