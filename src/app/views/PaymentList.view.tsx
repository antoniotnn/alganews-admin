import {Table, Tag} from "antd";
import {Payment} from "tnn-sdk";
import usePayments from "../../core/hooks/usePayments";
import {useEffect} from "react";
import moment from "moment";

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
            ]}
        />
    </>;
}