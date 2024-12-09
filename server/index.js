// server.ts
import express from 'express';

const app = express();
const port = 5000;
var token = ""
// 示例的 API 路由
app.get('/api/posts', (req, res) => {

    res.json([
        { id: 1, title: 'Post 1', content: 'This is the first post.' },
        { id: 2, title: 'Post 2', content: 'This is the second post.' }
    ]);
});
app.post('/api/login/account', (req, res) => {
    res.status(200);
    token = 'mock_token_123456'
    res.json({
        data: {
            token: token,
        }, msg: '', code: 200
    },);
});
app.post('/api/user/logout', (req, res) => {
    res.status(200);
    res.json({
        data: {
        }, msg: '', code: 200
    },);
});
app.post('/api/user/info', (req, res) => {
    res.status(200);
    res.json({
        data: {
            menuList: {
                layoutRoute: [
                    {
                        "label": "首页",
                        "labelEn": "Index",
                        "icon": "la:tachometer-alt",
                        "path": "/index",
                        "element": "index/index"
                    },
                    {
                        "label": "dashboard",
                        "labelEn": "dashboard",
                        "icon": "la:tachometer-alt",
                        "path": "/dashboard",
                        "element": "dashboard/index"
                    }
                ],
                route: [
                    {
                        "label": "404",
                        "labelEn": "404",
                        "icon": "la:tachometer-alt",
                        "path": "*",
                        "element": "404"
                    }
                ]
            },
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
