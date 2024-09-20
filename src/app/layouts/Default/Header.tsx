import {Avatar, Layout, Row} from "antd";
import React from "react";
import logo from '../../../assets/logo.svg';
import useAuth from "../../../core/hooks/useAuth";

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
                <Avatar src={user?.avatarUrls.small}/>
            </Row>
        </Header>
    );
}