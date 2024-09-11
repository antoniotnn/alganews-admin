import {Space, Table, Tag, Button, Card, Tooltip} from "antd";
import {CashFlow} from "tnn-sdk";
import useCashFlow from "../../core/hooks/useCashFlow";
import {useEffect} from "react";
import moment from "moment";
import {DeleteOutlined, EyeOutlined, EditOutlined} from "@ant-design/icons";
import transformIntoBrl from "../../core/utils/transformIntoBrl";
import {DatePicker} from "antd";

export default function EntriesList() {
    const {entries, fetchingEntries, fetchEntries, setQuery, query} = useCashFlow('EXPENSE');

    useEffect(() => {
        fetchEntries();
    }, [fetchEntries]);

    return (
        <Table<CashFlow.EntrySummary>
            dataSource={entries}
            loading={fetchingEntries}
            columns={[
                {
                    dataIndex: 'description',
                    title: 'Descrição',
                    width: 300,
                    ellipsis: true,
                    render(description: CashFlow.EntrySummary['description']) {
                        return <Tooltip title={description}>
                            {description}
                        </Tooltip>
                    }
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
                    filterDropdown() {
                        return <Card>
                            <DatePicker.MonthPicker
                                format={'YYYY - MMMM'}
                                allowClear={false}
                                onChange={
                                    (date) => setQuery({
                                        ...query,
                                        yearMonth: date?.format('YYYY-MM') || moment().format('YYYY-MM')
                                    })
                                }
                            />
                        </Card>
                    },
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
                                <Button type={'text'} size={'small'} icon={<DeleteOutlined/>} danger/>
                                <Button type={'text'} size={'small'} icon={<EditOutlined/>}/>
                                <Button type={'text'} size={'small'} icon={<EyeOutlined/>}/>
                            </Space>
                        );
                    }
                }
            ]}
        />
    );
}