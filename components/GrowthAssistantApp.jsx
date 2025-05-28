
// フル進化版：AI成長アシスタントアプリ with UI強化 + ゲーミフィケーション + 対話AIモジュール（完全版）
import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale);

// 略：ロジック部分（省略せず使用）
// ...（中略）...

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <motion.h1 className="text-4xl font-bold text-indigo-600 drop-shadow-md" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        🚀 <span className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-2 py-1 rounded-xl">AI成長アシスタント</span>
      </motion.h1>

      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold bg-yellow-100 px-3 py-1 rounded-full">{badge}</span>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setAdminView(!adminView)}>
          {adminView ? "ユーザービューへ" : "管理者ビューへ"}
        </Button>
      </div>

      {!adminView && (
        <>
          <Card><CardContent className="space-y-2">
            <p className="text-sm text-gray-500">ステップ 1/4：目標設定</p>
            <Input placeholder="あなたの成長目標を入力してください" value={userGoal} onChange={e => setUserGoal(e.target.value)} />
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={generateInsight}>AI内省の問いを生成</Button>
          </CardContent></Card>

          {aiInsight && (
            <Card><CardContent className="space-y-2">
              <p className="text-sm text-gray-500">ステップ 2/4：気づきを得る</p>
              <p className="whitespace-pre-line font-medium text-indigo-800 bg-indigo-50 p-3 rounded-xl shadow-sm">{aiInsight}</p>
              <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => logProgress("内省問いに基づく実行")}>この問いで行動を記録</Button>
            </CardContent></Card>
          )}

          <Card><CardContent className="space-y-2">
            <p className="text-sm text-gray-500">ステップ 3/4：内省と記録</p>
            <Textarea placeholder="今日の気づきや実践内容を記録してください" value={reflection} onChange={e => setReflection(e.target.value)} />
            <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={saveReflection}>記録を保存</Button>
          </CardContent></Card>

          <Card><CardContent>
            <h2 className="text-xl font-bold mb-2">📘 ジャーナル記録</h2>
            <ul className="list-disc list-inside space-y-1">{journal.map((entry, idx) => (
              <li key={idx} className="bg-gray-50 p-2 rounded-md shadow-sm">💡 {entry}</li>
            ))}</ul>
          </CardContent></Card>

          <Card><CardContent>
            <h2 className="text-xl font-bold mb-2">📈 実行ログ</h2>
            <ul className="list-disc list-inside space-y-1">{progressLog.map((entry, idx) => (
              <li key={idx} className="bg-green-50 p-2 rounded-md">🔥 {entry}</li>
            ))}</ul>
          </CardContent></Card>

          <Card><CardContent>
            <h2 className="text-xl font-bold mb-2">🌟 スコアと称号</h2>
            <p className="text-lg font-bold text-indigo-700">現在のスコア: {userScore} 点</p>
            <p className="text-green-700 italic">{autoFeedback}</p>
            <div className="mt-4">
              <Line data={scoreChartData} />
            </div>
          </CardContent></Card>

          <Card><CardContent>
            <h2 className="text-xl font-bold mb-2">📊 週次スコア平均</h2>
            <ul className="list-disc list-inside">{weeklySummary.map((entry, idx) => (
              <li key={idx}>{entry.week}: {entry.average.toFixed(2)} 点</li>
            ))}</ul>
          </CardContent></Card>

          <Card><CardContent>
            <h2 className="text-xl font-bold mb-2">🔔 通知履歴</h2>
            <Input placeholder="通知時刻 (例: 17:00)" value={notificationTime} onChange={e => setNotificationTime(e.target.value)} />
            <ul className="list-disc list-inside mt-2">{notifications.map((note, idx) => (
              <li key={idx} className="text-sm text-gray-600">📅 {note}</li>
            ))}</ul>
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
