import {Space, Table, Tag, Button} from "antd";
import {CashFlow} from "tnn-sdk";
import useCashFlow from "../../core/hooks/useCashFlow";
import {useEffect} from "react";
import moment from "moment";
import { DeleteOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons";
import transformIntoBrl from "../../core/utils/transformIntoBrl";

export default function EntriesList() {
    const { entries, fetchingEntries, fetchEntries } = useCashFlow();

    useEffect(() => {
        fetchEntries({
            type: 'EXPENSE',
            sort: ['transactedOn', 'desc'],
            yearMonth: '2024-08'
        });
    }, [fetchEntries]);
    
    return (
        <Table<CashFlow.EntrySummary>
            dataSource={entries}
            columns={[
                {
                    dataIndex: 'description',
                    title: 'Descrição',
                    width: 300,
                    ellipsis: true
                },
                {
                    dataIndex: 'category',
                    title: 'Categoria',
                    align: 'center',
                    render(category: CashFlow.EntrySummary['category']) {
                        return <Tag>{category.name}</Tag>
                    }
                },
                {
                    dataIndex: 'transactedOn',
                    title: 'Data',
                    align: 'center',
                    render(transactedOn: CashFlow.EntrySummary['transactedOn']) {
                        return moment(transactedOn).format('DD/MM/YYYY');
                    }
                },
                {
                    dataIndex: 'amount',
                    title: 'Valor',
                    align: 'right',
                    render: transformIntoBrl
                },
                {
                    dataIndex: 'amount',
                    title: 'Ações',
                    align: 'center',
                    render(id: number) {
                        return (
                            <Space>
                                <Button type={'text'} size={'small'} icon={<DeleteOutlined />} danger />
                                <Button type={'text'} size={'small'} icon={<EditOutlined />} />
                                <Button type={'text'} size={'small'} icon={<EyeOutlined />} />
                            </Space>
                        );
                    }
                }
            ]}
        />
    );
}