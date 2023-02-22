import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { MessageStructure } from "../../../utils/interfaces";
import { Question } from "./Question";
import "./QuestionTabs.css";

export function QuestionTabs({ questions }: { questions: MessageStructure[] }) {
  enum TABS {
    CURRENT = "Current",
    ANSWERED = "Answered",
  }
  const [key, setKey] = useState(TABS.CURRENT.toLowerCase());
  const questionElements = questions.map((question, i) => (
    <Question key={i} {...question} />
  ));
  return (
    <div className="question-panel">
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3" fill>
        <Tab eventKey={TABS.CURRENT.toLowerCase()} title={TABS.CURRENT}>
          {questionElements}
        </Tab>
        <Tab eventKey={TABS.ANSWERED.toLowerCase()} title={TABS.ANSWERED}>
          {questionElements}
        </Tab>
      </Tabs>
    </div>
  );
}
