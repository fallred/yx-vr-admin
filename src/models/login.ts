/** user's role */
export type Role = 'guest' | 'admin';

export interface LoginParams {
  /** 用户名 */
  username: string;
  /** 用户密码 */
  password: string;
  /** 验证码 */
  verifycode: string;
}

export interface IToken {
  accessToken: string;
}
export interface LoginResult {
  /** auth token */
  // token: string;
  // username: string;
  // role: Role;
    userAccount: string;
    appId: string;
    identity_type: number;
    userName: string;
    token: IToken;
}

export interface LogoutParams {
  token: string;
}

export interface LogoutResult { }
