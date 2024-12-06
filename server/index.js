// server.ts
import express from 'express';

const app = express();
const port = 5000;

// 示例的 API 路由
app.get('/api/posts', (req, res) => {

    res.json([
        { id: 1, title: 'Post 1', content: 'This is the first post.' },
        { id: 2, title: 'Post 2', content: 'This is the second post.' }
    ]);
});
app.post('/api/login/account', (req, res) => {
    res.status(200);
    res.json({
        data: {
            token: 'mock_token_123456',
        }, msg: '', code: 200
    },);
});

app.post('/api/user/info', (req, res) => {
    res.status(200);
    res.json({
        data: {
            menuList: [
                {
                    "label": "首页",
                    "labelEn": "Dashboard",
                    "icon": "la:tachometer-alt",
                    "key": "/index",
                    "rule": "/index"
                },
            ],
            user: {
                userName: '123'
            },
            permissions: [
                "/dashboard",
                "/demo",
                "/demo/copy",
                "/demo/editor",
                "/demo/wangEditor",
                "/demo/virtualScroll",
                "/demo/watermark",
                "/authority/user",
                "/authority/user/index",
                "/authority/user/create",
                "/authority/user/update",
                "/authority/user/view",
                "/authority/user/delete",
                "/authority/user/authority",
                "/authority/role",
                "/authority/role/index",
                "/authority/role/create",
                "/authority/role/update",
                "/authority/role/view",
                "/authority/role/delete",
                "/authority/menu",
                "/authority/menu/index",
                "/authority/menu/create",
                "/authority/menu/update",
                "/authority/menu/view",
                "/authority/menu/delete",
                "/content/article",
                "/content/article/index",
                "/content/article/create",
                "/content/article/update",
                "/content/article/view",
                "/content/article/delete"
            ],
        }, msg: '', code: 200
    },);
});
app.listen(port, () => {
    console.log(`API server is running at http://localhost:${port}`);
});
