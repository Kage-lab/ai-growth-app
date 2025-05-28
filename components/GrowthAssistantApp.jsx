{\rtf1\ansi\ansicpg932\cocoartf2706
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww15320\viewh12980\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // \uc0\u39640 \u24230 \u27231 \u33021 \u36914 \u21270 \u29256 \u65306 AI\u25104 \u38263 \u12450 \u12471 \u12473 \u12479 \u12531 \u12488 \u12450 \u12503 \u12522 \
import \{ useState, useEffect \} from "react";\
import \{ Button \} from "../components/ui/button";\
import \{ Card, CardContent \} from "../components/ui/card";\
import \{ Input \} from "../components/ui/input";\
import \{ Textarea \} from "../components/ui/textarea";\
import \{ motion \} from "framer-motion";\
import \{ Line \} from "react-chartjs-2";\
import \{ Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale \} from 'chart.js';\
\
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale);\
\
function groupScoresByWeek(history) \{\
  const grouped = \{\};\
  history.forEach((\{ time, score \}) => \{\
    const date = new Date(time);\
    const week = `$\{date.getFullYear()\}-W$\{Math.ceil((date.getDate() + 6 - date.getDay()) / 7)\}`;\
    if (!grouped[week]) grouped[week] = [];\
    grouped[week].push(score);\
  \});\
  return Object.entries(grouped).map(([week, scores]) => (\{\
    week,\
    average: scores.reduce((a, b) => a + b, 0) / scores.length\
  \}));\
\}\
\
export default function GrowthAssistantApp() \{\
  const [userGoal, setUserGoal] = useState("");\
  const [aiInsight, setAiInsight] = useState("");\
  const [reflection, setReflection] = useState("");\
  const [journal, setJournal] = useState([]);\
  const [progressLog, setProgressLog] = useState([]);\
  const [userScore, setUserScore] = useState(0);\
  const [scoreHistory, setScoreHistory] = useState([]);\
  const [adminView, setAdminView] = useState(false);\
  const [notifications, setNotifications] = useState([]);\
  const [notificationTime, setNotificationTime] = useState("17:00");\
\
  useEffect(() => \{\
    const interval = setInterval(() => \{\
      const now = new Date();\
      const [hour, minute] = notificationTime.split(":".map(Number));\
      if (now.getHours() === hour && now.getMinutes() === minute) \{\
        const reminder = `\uc0\u55357 \u56596  $\{now.toLocaleTimeString()\} - \u20170 \u26085 \u12398 \u20869 \u30465 \u12479 \u12452 \u12512 \u12391 \u12377 \u65281 `;\
        setNotifications(prev => [...prev, reminder]);\
      \}\
    \}, 60000);\
    return () => clearInterval(interval);\
  \}, [notificationTime]);\
\
  const generateInsight = () => \{\
    if (userGoal.trim()) \{\
      setAiInsight(`\uc0\u12354 \u12394 \u12383 \u12398 \u30446 \u27161 \u12300 $\{userGoal\}\u12301 \u12395 \u23550 \u12375 \u12390 \u12289 \u27425 \u12398 \u21839 \u12356 \u12434 \u32771 \u12360 \u12390 \u12415 \u12414 \u12375 \u12423 \u12358 \u65306 \\n\u12300 \u12381 \u12428 \u12434 \u36948 \u25104 \u12375 \u12383 \u12356 \u29702 \u30001 \u12399 \u20309 \u12391 \u12377 \u12363 \u65311 \u12301 \\n\u12300 \u12381 \u12428 \u12434 \u22952 \u12370 \u12390 \u12356 \u12427 \u35201 \u22240 \u12399 \u20309 \u12391 \u12377 \u12363 \u65311 \u12301 `);\
    \}\
  \};\
\
  const saveReflection = () => \{\
    if (reflection.trim()) \{\
      const timestamp = new Date().toLocaleString();\
      setJournal(prev => [...prev, `$\{timestamp\}: $\{reflection\}`]);\
      const updatedScore = userScore + 5;\
      setUserScore(updatedScore);\
      setScoreHistory(prev => [...prev, \{ time: timestamp, score: updatedScore \}]);\
      setReflection("");\
    \}\
  \};\
\
  const logProgress = (action) => \{\
    const timestamp = new Date().toLocaleString();\
    const updatedScore = userScore + 10;\
    setProgressLog(prev => [...prev, `\uc0\u9989  $\{timestamp\} - $\{action\}`]);\
    setUserScore(updatedScore);\
    setScoreHistory(prev => [...prev, \{ time: timestamp, score: updatedScore \}]);\
  \};\
\
  const scoreChartData = \{\
    labels: scoreHistory.map((entry) => entry.time),\
    datasets: [\
      \{\
        label: '\uc0\u12473 \u12467 \u12450 \u25512 \u31227 ',\
        data: scoreHistory.map((entry) => entry.score),\
        borderColor: 'rgba(75,192,192,1)',\
        tension: 0.2\
      \}\
    ]\
  \};\
\
  const weeklySummary = groupScoresByWeek(scoreHistory);\
\
  return (\
    <div className="max-w-4xl mx-auto p-6 space-y-6">\
      <motion.h1 className="text-3xl font-bold" initial=\{\{ opacity: 0, y: -20 \}\} animate=\{\{ opacity: 1, y: 0 \}\}>\
        \uc0\u55357 \u56960  AI\u25104 \u38263 \u12450 \u12471 \u12473 \u12479 \u12531 \u12488 \u65288 \u27231 \u33021 \u36914 \u21270 \u29256 \u65289 \
      </motion.h1>\
\
      <Button onClick=\{() => setAdminView(!adminView)\}>\
        \{adminView ? "\uc0\u12518 \u12540 \u12470 \u12540 \u12499 \u12517 \u12540 \u12408 " : "\u31649 \u29702 \u32773 \u12499 \u12517 \u12540 \u12408 "\}\
      </Button>\
\
      \{!adminView && (\
        <>\
          <Card><CardContent className="space-y-2">\
            <Input placeholder="\uc0\u12354 \u12394 \u12383 \u12398 \u25104 \u38263 \u30446 \u27161 \u12434 \u20837 \u21147 \u12375 \u12390 \u12367 \u12384 \u12373 \u12356 " value=\{userGoal\} onChange=\{e => setUserGoal(e.target.value)\} />\
            <Button onClick=\{generateInsight\}>AI\uc0\u20869 \u30465 \u12398 \u21839 \u12356 \u12434 \u29983 \u25104 </Button>\
          </CardContent></Card>\
\
          \{aiInsight && (\
            <Card><CardContent className="space-y-2">\
              <p className="whitespace-pre-line font-medium">\{aiInsight\}</p>\
              <Button onClick=\{() => logProgress("\uc0\u20869 \u30465 \u21839 \u12356 \u12395 \u22522 \u12389 \u12367 \u23455 \u34892 ")\}>\u12371 \u12398 \u21839 \u12356 \u12391 \u34892 \u21205 \u12434 \u35352 \u37682 </Button>\
            </CardContent></Card>\
          )\}\
\
          <Card><CardContent className="space-y-2">\
            <Textarea placeholder="\uc0\u20170 \u26085 \u12398 \u27671 \u12389 \u12365 \u12420 \u23455 \u36341 \u20869 \u23481 \u12434 \u35352 \u37682 \u12375 \u12390 \u12367 \u12384 \u12373 \u12356 " value=\{reflection\} onChange=\{e => setReflection(e.target.value)\} />\
            <Button onClick=\{saveReflection\}>\uc0\u35352 \u37682 \u12434 \u20445 \u23384 </Button>\
          </CardContent></Card>\
\
          <Card><CardContent>\
            <h2 className="text-xl font-bold mb-2">\uc0\u55357 \u56536  \u12472 \u12515 \u12540 \u12490 \u12523 \u35352 \u37682 </h2>\
            <ul className="list-disc list-inside">\{journal.map((entry, idx) => (<li key=\{idx\}>\{entry\}</li>))\}</ul>\
          </CardContent></Card>\
\
          <Card><CardContent>\
            <h2 className="text-xl font-bold mb-2">\uc0\u55357 \u56520  \u23455 \u34892 \u12525 \u12464 </h2>\
            <ul className="list-disc list-inside">\{progressLog.map((entry, idx) => (<li key=\{idx\}>\{entry\}</li>))\}</ul>\
          </CardContent></Card>\
\
          <Card><CardContent>\
            <h2 className="text-xl font-bold mb-2">\uc0\u55356 \u57119  \u12473 \u12467 \u12450 </h2>\
            <p>\uc0\u29694 \u22312 \u12398 \u12473 \u12467 \u12450 : \{userScore\} \u28857 </p>\
            <div className="mt-4">\
              <Line data=\{scoreChartData\} />\
            </div>\
          </CardContent></Card>\
\
          <Card><CardContent>\
            <h2 className="text-xl font-bold mb-2">\uc0\u55357 \u56522  \u36913 \u27425 \u12473 \u12467 \u12450 \u24179 \u22343 </h2>\
            <ul className="list-disc list-inside">\{weeklySummary.map((entry, idx) => (<li key=\{idx\}>\{entry.week\}: \{entry.average.toFixed(2)\} \uc0\u28857 </li>))\}</ul>\
          </CardContent></Card>\
\
          <Card><CardContent>\
            <h2 className="text-xl font-bold mb-2">\uc0\u55357 \u56596  \u36890 \u30693 \u23653 \u27508 </h2>\
            <Input placeholder="\uc0\u36890 \u30693 \u26178 \u21051  (\u20363 : 17:00)" value=\{notificationTime\} onChange=\{e => setNotificationTime(e.target.value)\} />\
            <ul className="list-disc list-inside mt-2">\{notifications.map((note, idx) => (<li key=\{idx\}>\{note\}</li>))\}</ul>\
          </CardContent></Card>\
        </>\
      )\}\
\
      \{adminView && (\
        <Card><CardContent>\
          <h2 className="text-xl font-bold mb-2">\uc0\u55358 \u56785 \u8205 \u55357 \u56508  \u31649 \u29702 \u32773 \u12499 \u12517 \u12540 </h2>\
          <p>\uc0\u25104 \u38263 \u30446 \u27161 : \{userGoal || "\u26410 \u20837 \u21147 "\}</p>\
          <p>\uc0\u35352 \u37682 \u12373 \u12428 \u12383 \u12472 \u12515 \u12540 \u12490 \u12523 : \{journal.length\} \u20214 </p>\
          <p>\uc0\u34892 \u21205 \u12525 \u12464 : \{progressLog.length\} \u20214 </p>\
          <p>\uc0\u12473 \u12467 \u12450 : \{userScore\} \u28857 </p>\
          <p>\uc0\u36890 \u30693 \u23653 \u27508 : \{notifications.length\} \u20214 </p>\
        </CardContent></Card>\
      )\}\
    </div>\
  );\
\}\
}