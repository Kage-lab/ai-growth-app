// 初期化：AI成長アシスタント（最小構成）
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function GrowthAssistantApp() {
  const [userGoal, setUserGoal] = useState("");
  const [aiInsight, setAiInsight] = useState("");

  const generateInsight = () => {
    if (userGoal.trim()) {
      setAiInsight(`あなたの目標「${userGoal}」に対して、次の問いを考えてみましょう：\n「それを達成したい理由は何ですか？」\n「それを妨げている要因は何ですか？」`);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">🧠 AI成長アシスタント（初期版）</h1>

      <Card>
        <CardContent className="space-y-2">
          <Input
            placeholder="あなたの成長目標を入力してください"
            value={userGoal}
            onChange={e => setUserGoal(e.target.value)}
          />
          <Button onClick={generateInsight}>内省の問いを生成</Button>
        </CardContent>
      </Card>

      {aiInsight && (
        <Card>
          <CardContent>
            <p className="whitespace-pre-line font-medium">{aiInsight}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
