import { Settings as LayoutSettings } from '@ant-design/pro-layout';
import LogoIcon from "@/assets/logo/logo-2.png";

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // navTheme: 'dark',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  headerTheme: 'dark',
  // headerTheme: 'light',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '2037VR运营管理系统',
  pwa: false,
  iconfontUrl: '',
  logo: LogoIcon,
  headerHeight: 56
  // splitMenus: true,
};

export default Settings;
