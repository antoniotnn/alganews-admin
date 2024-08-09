import CompanyMetrics from "./app/features/CompanyMetrics";
import {Col, Row, Typography} from "antd";

const { Title, Paragraph } = Typography;

function App() {
    return (
        <Row>
            <Col span={24}>
                <Title level={2}>Olá, José Sousa</Title>
                <Paragraph>
                    Esse é o resumo da empresa nos últimos doze meses
                </Paragraph>
            </Col>
            <Col span={24}>
                <CompanyMetrics/>
            </Col>
        </Row>
    );
}

export default App;