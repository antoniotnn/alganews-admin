import {Layout, Menu} from 'antd';
import {
    DiffOutlined,
    FallOutlined,
    HomeOutlined,
    LaptopOutlined,
    PlusCircleOutlined,
    RiseOutlined,
    TableOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {Link, useHistory, useLocation} from "react-router-dom";

const { Sider } = Layout;
const { SubMenu } = Menu;

export default function DefaultLayoutSidebar() {
    const history = useHistory();
    const location = useLocation();

    return (
        <Sider
            width={200}
            className='site-layout-background'
            breakpoint='lg'
            collapsedWidth='0'
        >
            <Menu
                mode='inline'
                defaultSelectedKeys={[location.pathname]}
                defaultOpenKeys={[location.pathname.split('/')[1]]}
                style={{ height: '100%', borderRight: 0 }}
            >
                <Menu.Item key={'/'} icon={<HomeOutlined />}>
                    <Link to={'/'}>Home</Link>
                </Menu.Item>
                <SubMenu
                    key='usuarios'
                    icon={<UserOutlined />}
                    title='Usuários'
                >
                    <Menu.Item
                        key='/usuarios'
                        onClick={() => history.push('/usuarios')}
                        icon={<TableOutlined />}
                    >
                        <Link to={'/usuarios'}>
                            Consulta
                        </Link>
                    </Menu.Item>
                    <Menu.Item
                        key='/usuarios/cadastro'
                        icon={<PlusCircleOutlined />}
                        onClick={() => history.push('/usuarios/cadastro')}
                    >
                        <Link to={'/usuarios/cadastro'}>
                            Cadastro
                        </Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu
                    key='pagamentos'
                    icon={<LaptopOutlined />}
                    title='Pagamentos'
                >
                    <Menu.Item
                        key='/pagamentos'
                        icon={<TableOutlined />}
                        onClick={() => history.push('/pagamentos')}
                    >
                        <Link to={'/pagamentos'}>
                            Consulta
                        </Link>
                    </Menu.Item>
                    <Menu.Item
                        key='/pagamentos/cadastro'
                        icon={<PlusCircleOutlined />}
                        onClick={() => history.push('/pagamentos/cadastro')}
                    >
                        <Link to={'/pagamentos/cadastro'}>
                            Cadastro
                        </Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu
                    key='fluxo-de-caixa'
                    icon={<DiffOutlined />}
                    title='Fluxo de Caixa'
                >
                    <Menu.Item
                        key='/fluxo-de-caixa/despesas'
                        icon={<FallOutlined />}
                        onClick={() => history.push('/fluxo-de-caixa/despesas')}
                    >
                        <Link to={'/fluxo-de-caixa/despesas'}>
                            Despesa
                        </Link>
                    </Menu.Item>
                    <Menu.Item
                        key='/fluxo-de-caixa/receitas'
                        icon={<RiseOutlined />}
                        onClick={() => history.push('/fluxo-de-caixa/receitas')}
                    >
                        <Link to={'/fluxo-de-caixa/receitas'}>
                            Receita
                        </Link>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </Sider>
    );
}