export const downloadData = response => {
    const blob = new Blob([response.data], {
        type: response.headers['content-type']
    });
    const a = window.document.createElement('a');
    // 获取 blob 本地文件连接 (blob 为纯二进制对象，不能够直接保存到磁盘上)
    const downUrl = window.URL.createObjectURL(blob);
    let filename = 'download.xls';
    const headersDispos = response.headers['content-disposition'];
    if (headersDispos && headersDispos.indexOf('filename=') !== -1) {
        filename = headersDispos.split('filename=')[1];
        // filename = `${decodeURI(filename.split('"')[1])}` || 'download.xls';
        filename = decodeURI(filename);
        a.href = downUrl;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(downUrl);
    }
};