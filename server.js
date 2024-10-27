/*import express from 'express';
const app = express();

app.get('/',(req,res)=> {
    res.send('Hello,World');
});

app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
});*/

import express from 'express';
import dotenv from 'dotenv';
import predictTaskTime from './js/ScheduleTask.mjs';

dotenv.config(); // 環境変数のロード

const app = express();
const PORT = process.env.PORT || 3000;

// JSONリクエストのパース設定
app.use(express.json());

// タスク時間予測APIのエンドポイント
app.post('/api/predict-time', async (req, res) => {
  const taskInput = req.body;
  try {
    // predictTaskTime関数を実行して結果を取得
    const result = await predictTaskTime(taskInput);
    
    // 結果をAPIのレスポンスとして返す
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'タスク時間の予測に失敗しました' });
  }
});

// サーバーの起動
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
