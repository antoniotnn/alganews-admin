import { Area, AreaConfig } from '@ant-design/charts';
import { MetricService } from 'tnn-sdk';
import {useEffect, useState} from 'react';
import {format, parseISO} from 'date-fns';
import transformDataIntoAntdChart from '../../core/utils/transformDataIntoAntdChart';
import {ptBR} from "date-fns/locale";
import {ForbiddenError} from "tnn-sdk/dist/errors";
import {Card, Space, Typography} from "antd";
import {LockFilled} from "@ant-design/icons";

export default function CompanyMetrics() {
    const [data, setData] = useState<
        {
            yearMonth: string;
            value: number;
            category: 'totalRevenues' | 'totalExpenses';
        }[]
    >([]);

    const [forbidden, setForbidden] = useState(false);

    useEffect(() => {
        MetricService.getMonthlyRevenuesExpenses()
            .then(transformDataIntoAntdChart)
            .then(setData)
            .catch(err => {
                if (err instanceof ForbiddenError) {
                    setForbidden(true);
                    return;
                }
                throw err;
            })
    }, []);

    if (forbidden) {
        return (
            <Card style={{ minHeight: 256, display: 'flex', alignItems: 'center' }}>
                <Space direction={'vertical'}>
                    <Space align={'center'}>
                        <LockFilled style={{fontSize: 32}} />
                        <Typography.Title style={{margin: 0}}>
                            Acesso negado
                        </Typography.Title>
                    </Space>
                    <Typography.Paragraph>
                        Você não tem permissão para visualizar estes dados.
                    </Typography.Paragraph>
                </Space>
            </Card>
        );
    }

    const config: AreaConfig = {
        data,
        height: 256,
        color: ['#0099ff', '#274060' ],
        areaStyle: { fillOpacity: 1 },
        xField: 'yearMonth',
        yField: 'value',
        seriesField: 'category',
        legend: {
            itemName: {
                formatter(legend) {
                    return legend === 'totalRevenues' ? 'Receitas' : 'Despesas';
                }
            }
        },
        tooltip: {
            title(title)  {
                return format(new Date(title), 'MMMM yyyy', {
                    locale: ptBR
                });
            },
            formatter(data) {
                return {
                    name: data.category === 'totalRevenues' ? 'Receitas' : 'Despesas',
                    value: (data.value as number).toLocaleString('pt-BR', {
                        currency: 'BRL',
                        style: 'currency',
                        maximumFractionDigits: 2,
                    }),
                }
            }
        },
        yAxis: false,
        xAxis: {
            label: {
                formatter(item) {
                    return format(parseISO(item), 'MM/yyyy')
                },
            },
        },
        point: {
            size: 5,
            shape: 'circle',
        },
    };
    return <Area {...config} />;
}