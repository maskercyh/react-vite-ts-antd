export async function getUserInfo(params?: { [key: string]: any }) {
    return usePost<API.LoginResult>('/user/info', params);
}
export async function userLogout(params?: { [key: string]: any }) {
    return usePost<API.LoginResult>('/user/logout', params);
}
export async function test(params?: { [key: string]: any }) {
    return usePost<API.LoginResult>('/user/test', params);
}
