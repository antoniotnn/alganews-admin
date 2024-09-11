import {Button, Row, Table} from "antd";
import {CashFlow} from "tnn-sdk";
import useEntriesCategories from "../../core/hooks/useEntriesCategories";
import {useEffect} from "react";
import {DeleteOutlined} from "@ant-design/icons";

export default function EntryCategoryManager(props: {
    type: 'EXPENSE' | 'REVENUE'
}) {
    const {expenses, fetchCategories, revenues} = useEntriesCategories();

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);


    return (
        <>
            <Row justify={'space-between'} style={{ marginBottom: 16}}>
                <Button>
                    Atualizar categorias
                </Button>
                <Button>
                    Adicionar categorias
                </Button>
            </Row>
            <Table<CashFlow.CategorySummary>
                size={'small'}
                dataSource={props.type === 'EXPENSE' ? expenses : revenues}
                columns={[
                    {
                        dataIndex: 'name',
                        title: 'Descrição',
                    },
                    {
                        dataIndex: 'totalEntries',
                        title: 'Vínculos',
                        align: 'right'
                    },
                    {
                        dataIndex: 'id',
                        title: 'Ações',
                        align: 'right',
                        render: (id: number) => (
                            <>
                                <Button
                                    danger
                                    type={'ghost'}
                                    size={'small'}
                                    icon={<DeleteOutlined/>}
                                />
                            </>
                        )
                    }
                ]}
            >

            </Table>
        </>
    );
}