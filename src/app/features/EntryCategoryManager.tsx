import {Button, Row, Table} from "antd";
import {CashFlow} from "tnn-sdk";

export default function EntryCategoryManager() {
    return (
        <>
            <Row justify={'space-between'}>
                <Button>
                    Atualizar categorias
                </Button>
                <Button>
                    Adicionar categorias
                </Button>
            </Row>
            <Table<CashFlow.CategorySummary>
                dataSource={[]}
                columns={[
                    {
                        title: 'Categoria',
                        dataIndex: 'name',
                        key: 'name',
                    },
                    {
                        title: 'Total',
                        dataIndex: 'total',
                        key: 'total',
                    },
                ]}
            >

            </Table>
        </>
    );
}