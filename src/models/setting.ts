/** user's role */
export type Role = 'guest' | 'admin';

export interface IUpdatePassParams {
  oldpwd: string;
  newpwd: string;
  renewpwd: string;
}

export interface IUpdatePassResult {
    newpwd: string;
}
