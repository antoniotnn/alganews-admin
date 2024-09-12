import {Button, Col, DatePicker, Divider, Form, Input, Row, Select, Space} from "antd";
import CurrencyInput from "../components/CurrencyInput";
import {useCallback, useEffect} from "react";
import {CashFlow} from "tnn-sdk";
import {Moment} from "moment";
import {useForm} from "antd/lib/form/Form";
import useEntriesCategories from "../../core/hooks/useEntriesCategories";

type EntryFormSubmit = Omit<CashFlow.EntryInput, 'transactedOn'> & {
    transactedOn: Moment;
};


export default function EntryForm() {
    const [form] = useForm();
    const { revenues, expenses, fetching, fetchCategories} = useEntriesCategories();

    const handleFormSubmit = useCallback((form: EntryFormSubmit) => {
        console.log(form);
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return (
        <Form form={form} layout={'vertical'} onFinish={handleFormSubmit}>
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
                                expenses.map(category => (
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
                    <Button type={'primary'} htmlType={'submit'}>
                        Cadastrar despesa
                    </Button>
                </Space>
            </Row>
        </Form>
    );
}