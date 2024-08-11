import { Area, AreaConfig } from '@ant-design/charts';
import { MetricService } from 'tnn-sdk';
import { useEffect } from 'react';
import { useState } from 'react';
import {format, parseISO} from 'date-fns';
import transformDataIntoAntdChart from '../../core/utils/transformDataIntoAntdChart';
import {ptBR} from "date-fns/locale";

export default function CompanyMetrics() {
    const [data, setData] = useState<
        {
            yearMonth: string;
            value: number;
            category: 'totalRevenues' | 'totalExpenses';
        }[]
    >([]);

    useEffect(() => {
        MetricService.getMonthlyRevenuesExpenses()
            .then(transformDataIntoAntdChart)
            .then(setData);
    }, []);

    const config: AreaConfig = {
        data,
        height: 400,
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