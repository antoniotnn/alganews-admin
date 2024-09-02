import {Button, Popconfirm, Table, Tag, Tooltip} from "antd";
import {Payment} from "tnn-sdk";
import usePayments from "../../core/hooks/usePayments";
import {useEffect} from "react";
import moment from "moment";
import {EyeOutlined, DeleteOutlined} from "@ant-design/icons";
import confirm from "antd/lib/modal/confirm";

export default function PaymentListView() {
    const {payments, fetchPayments } = usePayments();

    useEffect(() => {
        fetchPayments({
            sort: ['scheduledTo', 'desc'],
            page: 0
        });
    }, [fetchPayments]);

    return <>
        <Table <Payment.Summary>
            dataSource={payments?.content}
            rowKey={'id'}
            columns={[
                {
                    dataIndex: 'id',
                    title: '#'
                },
                {
                    dataIndex: 'payee',
                    title: 'Editor',
                    render(payee: Payment.Summary['payee']) {
                        return payee.name;
                    }
                },
                {
                    dataIndex: 'scheduledTo',
                    title: 'Agendamento',
                    align: 'center',
                    render(date: string) {
                        return moment(date).format('DD/MM/YYYY');
                    }
                },
                {
                    dataIndex: 'accountingPeriod',
                    title: 'Período',
                    align: 'center',
                    render(period: Payment.Summary['accountingPeriod']) {
                        const starts = moment(period.startsOn).format('DD/MM/YYYY');
                        const ends = moment(period.endsOn).format('DD/MM/YYYY');
                        return `${starts} - ${ends}`;
                    }
                },
                {
                    dataIndex: 'approvedAt',
                    title: 'Status',
                    align: 'center',
                    render(approvalDate: Payment.Summary['approvedAt']) {
                        const formattedApprovalDate = moment(approvalDate).format('DD/MM/YYYY');

                        return (
                            <Tag color={approvalDate ? 'green' : 'warning'}>
                                {
                                    approvalDate ?
                                        `Aprovado em ${formattedApprovalDate}`
                                        : 'Aguardando aprovação'
                                }
                            </Tag>
                        );
                    }
                },
                {
                    dataIndex: 'id',
                    title: 'Ações',
                    align: 'center',
                    render(id: number, payment) {
                        return <>
                            <Tooltip title={'Detalhar'} placement={'left'}>
                                <Button
                                    size="small"
                                    icon={<EyeOutlined />}
                                />
                            </Tooltip>
                            <Popconfirm
                                title={'Remover agendamento?'}
                                onConfirm={() => {
                                    confirm({
                                        title: 'Remover agendamento?',
                                        content: 'Esta é uma ação irreversível. Ao remover um agendamento, ele não poderá ser recuperado!',
                                        onOk() {
                                            console.log('todo: implement schedule deletion');
                                        }
                                    })
                                }}
                            >
                                <Tooltip
                                    title={payment.canBeDeleted ? 'Remover' : 'Pagamento já aprovado'}
                                    placement={'right'}
                                >
                                    <Button
                                        size="small"
                                        disabled={!payment.canBeDeleted}
                                        icon={<DeleteOutlined />}
                                    />
                                </Tooltip>
                            </Popconfirm>

                        </>
                    }
                },
            ]}
        />
    </>;
}