export async function errorReportHandle(data: any) {
    return usePost('/errorReportHandle', data);
}
