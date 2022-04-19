import { Settings as LayoutSettings } from '@ant-design/pro-layout';
import LogoIcon from "@/assets/logo/logo.png";

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '2037 VR运营管理系统',
  pwa: false,
  iconfontUrl: '',
  logo: LogoIcon,
};

export default Settings;
