import {Button, Col, DatePicker, Divider, Form, Input, Row, Select, Space} from "antd";
import CurrencyInput from "../components/CurrencyInput";
import {useCallback, useEffect, useMemo} from "react";
import {CashFlow} from "tnn-sdk";
import {Moment} from "moment";
import {useForm} from "antd/lib/form/Form";
import useEntriesCategories from "../../core/hooks/useEntriesCategories";
import useCashFlow from "../../core/hooks/useCashFlow";

type EntryFormSubmit = Omit<CashFlow.EntryInput, 'transactedOn'> & {
    transactedOn: Moment;
};

interface EntryFormProps {
    type: 'EXPENSE' | 'REVENUE';
    onSuccess: () => any;
}


export default function EntryForm({ type, onSuccess }: EntryFormProps) {
    const [form] = useForm();
    const { revenues, expenses, fetching, fetchCategories} = useEntriesCategories();

    const { createEntry, fetching: fetchingEntries} = useCashFlow(type);

    const handleFormSubmit = useCallback(async (form: EntryFormSubmit) => {
        const newEntryDTO: CashFlow.EntryInput = {
            ...form,
            transactedOn: form.transactedOn.format('YYYY-MM-DD'),
            type
        }

        await createEntry(newEntryDTO);
        onSuccess();
    }, [createEntry, onSuccess, type]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const categories = useMemo(
        () => (type === 'EXPENSE' ? expenses : revenues),
        [expenses, revenues, type]
    );

    return (
        <Form
            autoComplete={'off'}
            form={form} layout={'vertical'}
            onFinish={handleFormSubmit}
        >
            <Row gutter={16}>
                <Col xs={24}>
                    <Form.Item
                        label={'Descrição'}
                        name={'description'}
                        rules={[{ required: true, message: 'Campo obrigatório' }]}
                    >
                        <Input placeholder={'Pagamento da AWS'} />
                    </Form.Item>
                </Col>
                <Col xs={24}>
                    <Form.Item
                        label={'Categoria'}
                        name={['category', 'id']}
                        rules={[{ required: true, message: 'Campo obrigatório' }]}
                    >
                        <Select loading={fetching} placeholder={'Selecione uma categoria'}>
                            {
                                categories.map(category => (
                                    <Select.Option key={category.id} value={category.id}>
                                        {category.name}
                                    </Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                    <Form.Item
                        label={'Montante'}
                        name={'amount'}
                        rules={[{ required: true, message: 'Campo obrigatório' }]}
                    >
                        <CurrencyInput
                            defaultValue={'R$ 0,00'}
                            onChange={(_, value) => {
                                form.setFieldsValue({amount: value})
                            }}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                    <Form.Item
                        label={'Data de entrada'}
                        name={'transactedOn'}
                        rules={[{ required: true, message: 'Campo obrigatório' }]}
                    >
                        <DatePicker
                            style={{ width: '100%' }}
                            format={'DD/MM/YYYY'}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Divider style={{marginTop: 0}}/>
            <Row justify={'end'}>
                <Space>
                    <Button>Cancelar</Button>
                    <Button loading={fetchingEntries} type={'primary'} htmlType={'submit'}>
                        Cadastrar despesa
                    </Button>
                </Space>
            </Row>
        </Form>
    );
}