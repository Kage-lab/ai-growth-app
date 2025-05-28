// フル機能実装：AI成長アシスタントアプリ
import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { motion } from "framer-motion";

export default function GrowthAssistantApp() {
  const [userGoal, setUserGoal] = useState("");
  const [aiInsight, setAiInsight] = useState("");
  const [reflection, setReflection] = useState("");
  const [journal, setJournal] = useState([]);
  const [progressLog, setProgressLog] = useState([]);
  const [userScore, setUserScore] = useState(0);
  const [adminView, setAdminView] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      const reminder = "🔔 今日の内省タイムです！";
      setNotifications(prev => [...prev, reminder]);
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const generateInsight = () => {
    if (userGoal.trim()) {
      setAiInsight(`あなたの目標「${userGoal}」に対して、次の問いを考えてみましょう：\n「それを達成したい理由は何ですか？」\n「それを妨げている要因は何ですか？」`);
    }
  };

  const saveReflection = () => {
    if (reflection.trim()) {
      setJournal(prev => [...prev, reflection]);
      setUserScore(prev => prev + 5);
      setReflection("");
    }
  };

  const logProgress = (action) => {
    setProgressLog(prev => [...prev, `✅ ${action}`]);
    setUserScore(prev => prev + 10);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <motion.h1 className="text-3xl font-bold" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        🚀 AI成長アシスタント（フル機能版）
      </motion.h1>

      <Button onClick={() => setAdminView(!adminView)}>
        {adminView ? "ユーザービューへ" : "管理者ビューへ"}
      </Button>

      {!adminView && (
        <>
          <Card><CardContent className="space-y-2">
            <Input placeholder="あなたの成長目標を入力してください" value={userGoal} onChange={e => setUserGoal(e.target.value)} />
            <Button onClick={generateInsight}>AI内省の問いを生成</Button>
          </CardContent></Card>

          {aiInsight && (
            <Card><CardContent className="space-y-2">
              <p className="whitespace-pre-line font-medium">{aiInsight}</p>
              <Button onClick={() => logProgress("内省問いに基づく実行")}>この問いで行動を記録</Button>
            </CardContent></Card>
          )}

          <Card><CardContent className="space-y-2">
            <Textarea placeholder="今日の気づきや実践内容を記録してください" value={reflection} onChange={e => setReflection(e.target.value)} />
            <Button onClick={saveReflection}>記録を保存</Button>
          </CardContent></Card>

          <Card><CardContent>
            <h2 className="text-xl font-bold mb-2">📘 ジャーナル記録</h2>
            <ul className="list-disc list-inside">{journal.map((entry, idx) => (<li key={idx}>{entry}</li>))}</ul>
          </CardContent></Card>

          <Card><CardContent>
            <h2 className="text-xl font-bold mb-2">📈 実行ログ</h2>
            <ul className="list-disc list-inside">{progressLog.map((entry, idx) => (<li key={idx}>{entry}</li>))}</ul>
          </CardContent></Card>

          <Card><CardContent>
            <h2 className="text-xl font-bold mb-2">🌟 スコア</h2>
            <p>現在のスコア: {userScore} 点</p>
          </CardContent></Card>

          <Card><CardContent>
            <h2 className="text-xl font-bold mb-2">🔔 通知履歴</h2>
            <ul className="list-disc list-inside">{notifications.map((note, idx) => (<li key={idx}>{note}</li>))}</ul>
          </CardContent></Card>
        </>
      )}

      {adminView && (
        <Card><CardContent>
          <h2 className="text-xl font-bold mb-2">🧑‍💼 管理者ビュー</h2>
          <p>成長目標: {userGoal || "未入力"}</p>
          <p>記録されたジャーナル: {journal.length} 件</p>
          <p>行動ログ: {progressLog.length} 件</p>
          <p>スコア: {userScore} 点</p>
          <p>通知履歴: {notifications.length} 件</p>
        </CardContent></Card>
      )}
    </div>
  );
}
