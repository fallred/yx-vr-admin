/**
 * 权限 高阶组件
 * @param {reactNode} ComposedComponent 需要权限控制的组件
 * @param {string} path 页面pathname
 * @param {string} operCodes 操作web key，暂时用opercode
 * 使用说明：
 * 以下使用的 user 为固定不变，加载项目时，会直接加载opercode
 * @connect(({ user }) => ({
 *   user: user,
 * }))
 * render ....
 * // 引用 user已有的opercode
 * const {user: {userAllAuthRoleList: {operCode = []}}} = this.props;
 
 * // Button 案例
 * const AuthButton = WrapAuth(Button, operCode);
 * <AuthButton operCode="" specialCode="1" className="yg-btn-greyfull" onClick={this.handleSearch} icon="search">搜索</AuthButton>
 * or <AuthButton operCode="" specialCode="1" className="yg-btn-greyfull" onClick={this.handleSearch} icon="search">搜索</AuthButton>

 * // 自定义案例
 * const AuthSpan = WrapAuth(YgSpan, operCode);
 * <AuthSpan operCode="" specialCode="1" onClick={this.handleSearch} />
 * 
 * function YgSpan(props) {
 *  
 *  return (<React.Fragment>
 *    <span>
 *      <i className={'icon iconfont ego-down_16px'} />测试消息
 *    </span>
*   </React.Fragment>);
* }

 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

const superAdminDisablePathList = [
  'user',
  'role'
];
const WrapAuth = (ComposedComponent, operCodes = []) => class WrapComponent extends Component {
  // 构造
  constructor(props) {
    super(props);
    this.state = {
      // operCode: props.operCode,
      // specialCode: props.specialCode,
      // path: props.path,
      // isSuperAdmin: props.isSuperAdmin,
    };
  }

  checkBtnAuth(params) {
    const {operCode, specialCode, path, isSuperAdmin} = params;
    let hasAuth = true;
    if (isSuperAdmin && path && superAdminDisablePathList.includes(path)) {
      hasAuth = false;
      return hasAuth;
    }
    if (!!operCode && operCode.length > 0) {
      hasAuth = operCodes.includes(operCode);
      return hasAuth;
    }
  }

  static propTypes = {
    operCode: PropTypes.string.isRequired, // 按钮级的权限webKey
    specialCode: PropTypes.string,
  };

  render() {
    const {operCode, specialCode, path, isSuperAdmin, ...others} = this.props;
    if (this.checkBtnAuth({operCode, specialCode, path, isSuperAdmin})) {
      return <ComposedComponent { ...others} />;
    } else {
      return null;
    }
  }
};

export default WrapAuth;
