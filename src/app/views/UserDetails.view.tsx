import useUser from "../../core/hooks/useUser";
import {useEffect} from "react";
import {Avatar, Button, Card, Col, Row, Skeleton, Space, Typography} from "antd";
import {Redirect, useParams} from "react-router-dom";

export default function UserDetailsView() {
    const params = useParams<{ id: string }>();
    const { user, fetchUser, notFound } = useUser();

    useEffect(() => {
        if (!isNaN(Number(params.id))) {
            fetchUser(Number(params.id));
        }
    }, [fetchUser, params.id]);

    if (isNaN(Number(params.id))) {
        return <Redirect to={'/usuarios'}/>
    }

    if (notFound) {
        return <Card>usuário não encontrado</Card>;
    }


    if (!user) return <Skeleton />;

    return <Row>
        <Col xs={24} lg={4}>
            <Avatar
                size={120}
                src={user.avatarUrls.small}
            />
        </Col>
        <Col xs={24} lg={20}>
            <Typography.Title level={2}>
                {user.name}
            </Typography.Title>
            <Typography.Paragraph ellipsis>
                {user.bio}
            </Typography.Paragraph>
            <Space>
                <Button type={'primary'}>Editar perfil</Button>
                <Button type={'primary'}>Remover</Button>
            </Space>
        </Col>
    </Row>
}