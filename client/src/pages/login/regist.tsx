import React, { FC, useEffect, useRef, useState } from 'react'
import { Button, Col, DatePicker, Divider, Form, Input, Radio, Row, Select, Space } from 'antd'
import './index.less'
import { useNavigate, useLocation } from 'react-router-dom'
import { apiGetUserDetail, apiRegist, updateUser } from '~/api/user.api'
import UserEnum from '../../../../const/index'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import moment from 'moment'

const { doctorEnum, familyEnum, userTypeEnum } = UserEnum

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}

const formItemLayoutItem = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
}

const RegistPage: FC = () => {
  const navigate = useNavigate()
  const search = useLocation().search
  const edit = new URLSearchParams(search).get('edit')
  const [userType, setUserType] = useState<number | null>(null)
  const [formData, setFormData] = useState<any>(null)
  const [form] = Form.useForm()

  const onFinished = async (form: any) => {
    const params = { ...form, birth: form.birth?.valueOf() }
    const res = edit && edit !== 'false' ? await updateUser(edit, params) : await apiRegist(params)
    res.status === 200 && navigate({ pathname: edit ? '/userManage' : '/login' })
  }

  useEffect(() => {
    if (edit && edit !== 'false') {
      ;(async () => {
        const res = await apiGetUserDetail(edit)
        if (res.status === 200) {
          setFormData({
            ...res.data,
            birth: res.data.birth ? moment(res.data.birth) : moment(),
            password: ''
          })
          setUserType(res.data.type)
        }
      })()
    }
  }, [])

  useEffect(() => {
    if (formData) {
      form.setFieldsValue(formData)
    }
  }, [formData])
  const changeType = (e: number) => {
    setUserType(e as number)
    return e
  }

  return (
    <div className="regist-page">
      <div className="head">
        <span>复数科技</span>
        <Divider type="vertical" />
        <span>用户{edit && edit !== 'false' ? '编辑' : '注册'}</span>
      </div>
      <div className="body">
        <div className="regist-form">
          <Form
            form={form}
            {...formItemLayout}
            onFinish={onFinished}
            className="regist-page-form"
            prefix=":"
            layout="horizontal"
          >
            <Row>
              <Col span={8}>
                <Form.Item name="userName" label="用户名" rules={[{ required: true, message: '请输入用户名' }]}>
                  <Input placeholder="用户名" style={{ width: '200px' }} />
                </Form.Item>
              </Col>
              {(!edit || edit === 'false') && (
                <>
                  <Col span={8}>
                    <Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入密码' }]}>
                      <Input placeholder="密码" type="password" style={{ width: '200px' }} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      name="passwordAgain"
                      label="确认密码"
                      rules={[
                        { required: true, message: '请确认密码' },
                        ({ getFieldValue }) => ({
                          validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                              return Promise.resolve()
                            }
                            return Promise.reject('两次密码不一致')
                          }
                        })
                      ]}
                    >
                      <Input placeholder="确认密码" style={{ width: '200px' }} />
                    </Form.Item>
                  </Col>
                </>
              )}
            </Row>
            <Row>
              <Col span={8}>
                <Form.Item name="realName" label="姓名" rules={[{ required: true, message: '请输入姓名' }]}>
                  <Input placeholder="用户名" style={{ width: '200px' }} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="gender" label="性别">
                  <Radio.Group>
                    <Radio value={0}>男</Radio>
                    <Radio value={1}>女</Radio>
                    <Radio value={2}>其他</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="age" label="年龄">
                  <Input placeholder="年龄" type="number" style={{ width: '200px' }} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Form.Item name="birth" label="出生日期">
                  <DatePicker style={{ width: '200px' }} placeholder="" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="phone" label="手机号">
                  <Input placeholder="手机号" type="number" style={{ width: '200px' }} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="type" label="用户类型" rules={[{ required: true, message: '请选择用户类型' }]}>
                  <Select
                    style={{ width: '200px' }}
                    onChange={(e: number) => {
                      changeType(e)
                    }}
                  >
                    <Select.Option value={0}>患者</Select.Option>
                    <Select.Option value={1}>医生</Select.Option>
                    <Select.Option value={2}>家属</Select.Option>
                    <Select.Option value={3}>其他</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            {userType === userTypeEnum.PATIENT && (
              <Row>
                <Divider style={{ marginTop: 0 }} />
                <Form.List name="family">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(field => (
                        <React.Fragment key={field.key}>
                          <Col span={8}>
                            <Form.Item
                              {...field}
                              label="家属姓名"
                              name={[field.name, 'name']}
                              fieldKey={[field.fieldKey, 'name']}
                              rules={[{ required: true, message: '家属姓名必填' }]}
                            >
                              <Input style={{ width: '200px' }} />
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                              {...field}
                              label="电话"
                              name={[field.name, 'phone']}
                              fieldKey={[field.fieldKey, 'phone']}
                              rules={[{ required: true, message: '电话必填' }]}
                            >
                              <Input type="number" style={{ width: '200px' }} />
                            </Form.Item>
                          </Col>
                          <Col span={8} className="relation-item">
                            <Form.Item
                              noStyle
                              shouldUpdate={(prevValues, curValues) =>
                                prevValues.type !== curValues.type || prevValues.family !== curValues.family
                              }
                            >
                              {() => (
                                <Form.Item
                                  {...field}
                                  label="关系"
                                  name={[field.name, 'relation']}
                                  fieldKey={[field.fieldKey, 'relation']}
                                  rules={[{ required: true, message: 'Missing sight' }]}
                                >
                                  <Select style={{ width: '200px', marginRight: 5 }}>
                                    <Select.Option value={familyEnum.FATHER}>父亲</Select.Option>
                                    <Select.Option value={familyEnum.MOTHER}>母亲</Select.Option>
                                    <Select.Option value={familyEnum.SON}>儿子</Select.Option>
                                    <Select.Option value={familyEnum.DAUGHTER}>女儿</Select.Option>
                                    <Select.Option value={familyEnum.SPOUSE}>配偶</Select.Option>
                                    <Select.Option value={familyEnum.OTHER}>其他</Select.Option>
                                  </Select>
                                </Form.Item>
                              )}
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(field.name)} className="delete-icon" />
                          </Col>
                        </React.Fragment>
                      ))}

                      <Form.Item className="family-btn">
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                          style={{ width: 133 }}
                        >
                          新增家属
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Row>
            )}

            {userType === userTypeEnum.DOCTOR && (
              <>
                <Row>
                  <Col span={8}>
                    <Form.Item name={['doctor', 'hospital']} label="医生所属医院">
                      <Input placeholder="医生所属医院" style={{ width: '200px' }} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item name={['doctor', 'disease']} label="擅长病种">
                      <Input placeholder="擅长病种" style={{ width: '200px' }} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item name={['doctor', 'type']} label="医生类型">
                      <Select style={{ width: '200px' }}>
                        <Select.Option value={doctorEnum.CLINICAL}>临床医生</Select.Option>
                        <Select.Option value={doctorEnum.THERAPEUTIST}>治疗师</Select.Option>
                        <Select.Option value={doctorEnum.OTHER}>其他</Select.Option>
                        <Select.Option value={doctorEnum.PT}>物理治疗师</Select.Option>
                        <Select.Option value={doctorEnum.OT}>作业治疗师</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={16}>
                    <Form.Item name={['doctor', 'profile']} label="个人简介" {...formItemLayoutItem}>
                      <Input.TextArea placeholder="个人简介" style={{ width: '400px' }} />
                    </Form.Item>
                  </Col>
                </Row>
              </>
            )}

            <Form.Item className="regist-btn">
              <Button htmlType="submit" type="primary" style={{ width: '133px' }}>
                {edit && edit !== 'false' ? '保存' : '注册'}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default RegistPage
