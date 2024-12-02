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
    res.json({ data: { token: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', } });
});

app.listen(port, () => {
    console.log(`API server is running at http://localhost:${port}`);
});
