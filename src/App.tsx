import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import HorariosDisponiveis from './components/HorariosDisponiveis';
import GerenciamentoHorarios from './components/GerenciadorHorarios';
import HorariosDisponiveisComponent from './components/HorariosDisponiveis';

const { Header, Content, Footer, Sider } = Layout;

const ManageComponent: React.FC = () => {
  return (
    <div>
      <h2>Componente de Gerenciamento</h2>
      <GerenciamentoHorarios/>
    </div>
  );
};

const HourComponent: React.FC = () => {
  return (
    <div>
      <HorariosDisponiveisComponent/>
    </div>
  );
};

const BarberComponent: React.FC = () => {
  return (
    <div>
      <h2>Componente de Barber</h2>
    </div>
  );
};

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Gerenciar', '1', <PieChartOutlined />),
  getItem('Horários', '2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Emerson', '3'),
  ]),
  getItem('Files', '9', <FileOutlined />),
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [showManageComponent, setShowManageComponent] = useState(false);
  const [showHourComponent, setShowHourComponent] = useState(false);
  const [showBarberComponent, setShowBarberComponent] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (key: string) => {
    if (key === '1') {
      setShowManageComponent(true);
      setShowHourComponent(false);
      setShowBarberComponent(false);
    } else if (key === '2') {
      setShowManageComponent(false);
      setShowHourComponent(true);
      setShowBarberComponent(false);
    } else if (key === '3') {
      setShowManageComponent(false);
      setShowHourComponent(false);
      setShowBarberComponent(true);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={({ key }) => handleMenuClick(key)} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '0px 0', width: '20vw' }}>
            <Breadcrumb.Item>Fast</Breadcrumb.Item>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              width: '80vw',
              padding: 24,
              minHeight: '100vh',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {showManageComponent && <ManageComponent />}
            {showHourComponent && <HourComponent />}
            {showBarberComponent && <BarberComponent />}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', width:'81vw' }}>
          @odevpablo ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
