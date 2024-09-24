import CompanyMetrics from "../features/CompanyMetrics";
import {Col, Divider, Row, Space, Typography} from "antd";
import LatestPosts from "../features/LatestPosts";
import usePageTitle from "../../core/hooks/usePageTitle";
import useBreadcrumb from "../../core/hooks/useBreadcrumb";
import useAuth from "../../core/hooks/useAuth";

const { Title, Paragraph } = Typography;

function HomeView() {
    usePageTitle('Home');

    useBreadcrumb('Home');

    const { user } = useAuth();

    return (
        <Space
            direction='vertical'
            size={'small'}
            style={{maxWidth: '100%'}}>
            <Row>
                <Col span={24}>
                    <Title level={2}>Olá, {user?.name}</Title>
                    <Paragraph>
                        Esse é o resumo da empresa nos últimos doze meses
                    </Paragraph>
                </Col>
                <Col span={24}>
                    <CompanyMetrics/>
                </Col>
            </Row>
            <Divider />
            <Row>
                <Col span={24}>
                    <Title level={3}>Últimos posts</Title>
                </Col>
                <Col span={24}>
                    <LatestPosts />
                </Col>
            </Row>
        </Space>
    );
}

export default HomeView;