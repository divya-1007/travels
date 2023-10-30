import { FC } from 'react'

// import SideArrow from 'assets/svg/side-arrow'
import { Button, Col, Form, Input, InputNumber, Row } from 'antd';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
/* eslint-enable no-template-curly-in-string */

const onFinish = (values: any) => {
};
export interface ICardProps {
    // title?: string
    // image?: string
    // path?: string
    // disable?: boolean
    // showModal: (value: boolean) => void
}

const CreateUser: FC<ICardProps> = () => {


    return (
        <>
            <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
                validateMessages={validateMessages}
            >
                <h3>Register User</h3>
                <Row gutter={16}>
                    <Col span={10} lg={12} md={24}>
                        <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={10} lg={12} md={24}>
                        <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={10} lg={12} md={24}>
                        <Form.Item name={['user', 'age']} label="Age" rules={[{ type: 'number' }]}>
                            <InputNumber />
                        </Form.Item>
                    </Col>
                    <Col span={10} lg={12} md={24}>
                        <Form.Item name={['user', 'website']} label="Website">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={10} lg={12} md={24}>
                        <Form.Item name={['user', 'introduction']} label="Introduction">
                            <Input.TextArea />
                        </Form.Item>
                    </Col>

                    <Col span={10} lg={24} md={24}>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default CreateUser
