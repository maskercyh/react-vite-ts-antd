export async function getUserInfo(params?: { [key: string]: any }) {
    return usePost('/user/info', params);
}
export async function userLogout(params?: { [key: string]: any }) {
    return usePost('/user/logout', params);
}
export async function test(params?: { [key: string]: any }) {
    return usePost('/user/test', params);
}
