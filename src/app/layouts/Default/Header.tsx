import {Avatar, Card, Dropdown, Layout, Menu, Row, Tag} from "antd";
import React from "react";
import logo from '../../../assets/logo.svg';
import useAuth from "../../../core/hooks/useAuth";
import Meta from "antd/es/card/Meta";
import {UserOutlined} from "@ant-design/icons";
import {LogoutOutlined} from "@ant-design/icons";

const {Header} = Layout;

export default function DefaultLayoutHeader() {
    const { user } = useAuth();
    return (
        <Header className='header no-print'>
            <Row
                justify='space-between'
                style={{ height: '100%', maxWidth: 1190, margin: '0 auto' }}
                align='middle'
            >
                <img src={logo} alt={'AlgaNews Admin'}/>
                <Dropdown
                    placement={'bottomRight'}
                    overlay={<>
                        <Card style={{ width: 220 }}>
                            <Card bordered={false}>
                                <Meta
                                    title={user?.name}
                                    description={
                                        <Tag color={
                                            user?.role === 'MANAGER' ? 'red' : 'blue'
                                        }>
                                            {user?.role === 'EDITOR'
                                                ? 'Editor'
                                                : user?.role === 'MANAGER'
                                                    ? 'Gerente'
                                                    : 'Assistente'}
                                        </Tag>
                                    }
                                >
                                </Meta>
                            </Card>
                            <Menu>
                                <Menu.Item icon={<UserOutlined />}>Meu Perfil</Menu.Item>
                                <Menu.Item icon={<LogoutOutlined />} danger>Fazer logout</Menu.Item>
                            </Menu>
                        </Card>
                    </>}
                >
                    <Avatar src={user?.avatarUrls.small}/>
                </Dropdown>
            </Row>
        </Header>
    );
}