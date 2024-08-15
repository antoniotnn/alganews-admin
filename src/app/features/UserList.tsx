import useUsers from "../../core/hooks/useUsers";
import {useEffect} from "react";
import {Table, Tag, Switch, Button, Avatar, Typography, Space, Card, Input} from "antd";
import {User} from "tnn-sdk";
import {format} from "date-fns";
import {EyeOutlined, EditOutlined, SearchOutlined} from "@ant-design/icons";
import {ColumnProps} from "antd/es/table";

export default function UserList() {
    const {users, fetchUsers, toggleUerStatus, fetching} = useUsers();

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const getColumnSearchProps = (
        dataIndex: keyof User.Summary,
        displayName?: string
    ): ColumnProps<User.Summary> => ({
        filterDropdown: (
            {
                selectedKeys,
                setSelectedKeys,
                confirm,
                clearFilters
            }
        ) => (

            <Card>
                <Input
                    style={{ marginBottom: 8, display: 'block' }}
                    value={selectedKeys[0]}
                    placeholder={`Buscar ${displayName || dataIndex}`}
                    onChange={(e) => {
                        setSelectedKeys(e.target.value ? [e.target.value] : []);
                    }}
                    onPressEnter={() => confirm()}
                />
                <Space>
                    <Button
                        type={'primary'}
                        size={'small'}
                        style={{ width: 90 }}
                        onClick={() => confirm()}
                        icon={<SearchOutlined />}
                    >
                        Buscar
                    </Button>
                    <Button
                        onClick={clearFilters}
                        size={'small'}
                        style={{ width: 90 }}
                    >
                        Limpar
                    </Button>
                </Space>
            </Card>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined
                style={{ color: filtered ? '#0099ff' : undefined }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                    .toString()
                    .toLowerCase()
                    .includes((value as string).toLowerCase())
    });


    return <>
        <Table<User.Summary>
            loading={fetching}
            dataSource={users}
            columns={[
                {
                    dataIndex: 'name',
                    title: 'Nome',
                    ...getColumnSearchProps('name', 'Nome'),
                    width: 160,
                    render(name: string, row) {
                        return <Space>
                            <Avatar
                                size='small'
                                src={row.avatarUrls.small}
                            />
                            <Typography.Text
                                ellipsis
                                style={{ maxWidth: 120 }}
                            >
                                { name }
                            </Typography.Text>
                        </Space>
                    }
                },
                {
                    dataIndex: 'email',
                    title: 'Email',
                    ellipsis: true,
                    width: 240,
                    ...getColumnSearchProps('email', 'Email')
                },
                {
                    dataIndex: 'role',
                    title: 'Perfil',
                    align: 'center',
                    render(role) {
                        return (
                            <Tag color={role === 'MANAGER' ? 'red' : 'blue'}>
                                {role === 'EDITOR' ?
                                    'Editor'
                                    : role === 'MANAGER'
                                    ? 'Gerente' : 'Assistente'}
                            </Tag>
                        );
                    }
                },
                {
                    dataIndex: 'createdAt',
                    title: 'Criação',
                    align: 'center',
                    render(createdAt: string) {
                        return format(new Date(createdAt), 'dd/MM/yyyy');
                    }
                },
                {
                    dataIndex: 'active',
                    title: 'Ativo',
                    align: 'center',
                    render(active: boolean, user) {
                        return <Switch
                            onChange={()=> {
                                toggleUerStatus(user)
                            }}
                            defaultChecked={active}
                        />
                    }
                },
                {
                    dataIndex: 'id',
                    title: 'Ações',
                    align: 'center',
                    render() {
                        return <>
                            <Button
                                size='small'
                                icon={<EyeOutlined />}
                            />
                            <Button
                                size='small'
                                icon={<EditOutlined />}
                            />
                        </>;
                    }
                }
            ]}
        >

        </Table>
    </>;
}