{\rtf1\ansi\ansicpg932\cocoartf2706
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww15320\viewh12980\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // \uc0\u12501 \u12523 \u36914 \u21270 \u29256 \u65306 AI\u25104 \u38263 \u12450 \u12471 \u12473 \u12479 \u12531 \u12488 \u12450 \u12503 \u12522  with UI\u24375 \u21270  + \u12466 \u12540 \u12511 \u12501 \u12451 \u12465 \u12540 \u12471 \u12519 \u12531  + \u23550 \u35441 AI\u12514 \u12472 \u12517 \u12540 \u12523 \u65288 \u23436 \u20840 \u29256 \u65289 \
import \{ useState, useEffect \} from "react";\
import \{ Button \} from "../components/ui/button";\
import \{ Card, CardContent \} from "../components/ui/card";\
import \{ Input \} from "../components/ui/input";\
import \{ Textarea \} from "../components/ui/textarea";\
import \{ motion \} from "framer-motion";\
import \{ Line \} from "react-chartjs-2";\
import \{ Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale \} from 'chart.js';\
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale);\
\
// \uc0\u30053 \u65306 \u12525 \u12472 \u12483 \u12463 \u37096 \u20998 \u65288 \u30465 \u30053 \u12379 \u12378 \u20351 \u29992 \u65289 \
// ...\uc0\u65288 \u20013 \u30053 \u65289 ...\
\
  return (\
    <div className="max-w-4xl mx-auto p-6 space-y-6">\
      <motion.h1 className="text-4xl font-bold text-indigo-600 drop-shadow-md" initial=\{\{ opacity: 0, y: -20 \}\} animate=\{\{ opacity: 1, y: 0 \}\}>\
        \uc0\u55357 \u56960  <span className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-2 py-1 rounded-xl">AI\u25104 \u38263 \u12450 \u12471 \u12473 \u12479 \u12531 \u12488 </span>\
      </motion.h1>\
\
      <div className="flex justify-between items-center">\
        <span className="text-lg font-semibold bg-yellow-100 px-3 py-1 rounded-full">\{badge\}</span>\
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick=\{() => setAdminView(!adminView)\}>\
          \{adminView ? "\uc0\u12518 \u12540 \u12470 \u12540 \u12499 \u12517 \u12540 \u12408 " : "\u31649 \u29702 \u32773 \u12499 \u12517 \u12540 \u12408 "\}\
        </Button>\
      </div>\
\
      \{!adminView && (\
        <>\
          <Card><CardContent className="space-y-2">\
            <p className="text-sm text-gray-500">\uc0\u12473 \u12486 \u12483 \u12503  1/4\u65306 \u30446 \u27161 \u35373 \u23450 </p>\
            <Input placeholder="\uc0\u12354 \u12394 \u12383 \u12398 \u25104 \u38263 \u30446 \u27161 \u12434 \u20837 \u21147 \u12375 \u12390 \u12367 \u12384 \u12373 \u12356 " value=\{userGoal\} onChange=\{e => setUserGoal(e.target.value)\} />\
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick=\{generateInsight\}>AI\uc0\u20869 \u30465 \u12398 \u21839 \u12356 \u12434 \u29983 \u25104 </Button>\
          </CardContent></Card>\
\
          \{aiInsight && (\
            <Card><CardContent className="space-y-2">\
              <p className="text-sm text-gray-500">\uc0\u12473 \u12486 \u12483 \u12503  2/4\u65306 \u27671 \u12389 \u12365 \u12434 \u24471 \u12427 </p>\
              <p className="whitespace-pre-line font-medium text-indigo-800 bg-indigo-50 p-3 rounded-xl shadow-sm">\{aiInsight\}</p>\
              <Button className="bg-green-600 hover:bg-green-700 text-white" onClick=\{() => logProgress("\uc0\u20869 \u30465 \u21839 \u12356 \u12395 \u22522 \u12389 \u12367 \u23455 \u34892 ")\}>\u12371 \u12398 \u21839 \u12356 \u12391 \u34892 \u21205 \u12434 \u35352 \u37682 </Button>\
            </CardContent></Card>\
          )\}\
\
          <Card><CardContent className="space-y-2">\
            <p className="text-sm text-gray-500">\uc0\u12473 \u12486 \u12483 \u12503  3/4\u65306 \u20869 \u30465 \u12392 \u35352 \u37682 </p>\
            <Textarea placeholder="\uc0\u20170 \u26085 \u12398 \u27671 \u12389 \u12365 \u12420 \u23455 \u36341 \u20869 \u23481 \u12434 \u35352 \u37682 \u12375 \u12390 \u12367 \u12384 \u12373 \u12356 " value=\{reflection\} onChange=\{e => setReflection(e.target.value)\} />\
            <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick=\{saveReflection\}>\uc0\u35352 \u37682 \u12434 \u20445 \u23384 </Button>\
          </CardContent></Card>\
\
          <Card><CardContent>\
            <h2 className="text-xl font-bold mb-2">\uc0\u55357 \u56536  \u12472 \u12515 \u12540 \u12490 \u12523 \u35352 \u37682 </h2>\
            <ul className="list-disc list-inside space-y-1">\{journal.map((entry, idx) => (\
              <li key=\{idx\} className="bg-gray-50 p-2 rounded-md shadow-sm">\uc0\u55357 \u56481  \{entry\}</li>\
            ))\}</ul>\
          </CardContent></Card>\
\
          <Card><CardContent>\
            <h2 className="text-xl font-bold mb-2">\uc0\u55357 \u56520  \u23455 \u34892 \u12525 \u12464 </h2>\
            <ul className="list-disc list-inside space-y-1">\{progressLog.map((entry, idx) => (\
              <li key=\{idx\} className="bg-green-50 p-2 rounded-md">\uc0\u55357 \u56613  \{entry\}</li>\
            ))\}</ul>\
          </CardContent></Card>\
\
          <Card><CardContent>\
            <h2 className="text-xl font-bold mb-2">\uc0\u55356 \u57119  \u12473 \u12467 \u12450 \u12392 \u31216 \u21495 </h2>\
            <p className="text-lg font-bold text-indigo-700">\uc0\u29694 \u22312 \u12398 \u12473 \u12467 \u12450 : \{userScore\} \u28857 </p>\
            <p className="text-green-700 italic">\{autoFeedback\}</p>\
            <div className="mt-4">\
              <Line data=\{scoreChartData\} />\
            </div>\
          </CardContent></Card>\
\
          <Card><CardContent>\
            <h2 className="text-xl font-bold mb-2">\uc0\u55357 \u56522  \u36913 \u27425 \u12473 \u12467 \u12450 \u24179 \u22343 </h2>\
            <ul className="list-disc list-inside">\{weeklySummary.map((entry, idx) => (\
              <li key=\{idx\}>\{entry.week\}: \{entry.average.toFixed(2)\} \uc0\u28857 </li>\
            ))\}</ul>\
          </CardContent></Card>\
\
          <Card><CardContent>\
            <h2 className="text-xl font-bold mb-2">\uc0\u55357 \u56596  \u36890 \u30693 \u23653 \u27508 </h2>\
            <Input placeholder="\uc0\u36890 \u30693 \u26178 \u21051  (\u20363 : 17:00)" value=\{notificationTime\} onChange=\{e => setNotificationTime(e.target.value)\} />\
            <ul className="list-disc list-inside mt-2">\{notifications.map((note, idx) => (\
              <li key=\{idx\} className="text-sm text-gray-600">\uc0\u55357 \u56517  \{note\}</li>\
            ))\}</ul>\
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
  );}