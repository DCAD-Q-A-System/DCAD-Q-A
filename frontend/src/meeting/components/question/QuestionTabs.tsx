import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { MessageStructure } from "../../../utils/interfaces";

export function QuestionTabs({ questions }: { questions: MessageStructure[] }) {
  enum TABS {
    CURRENT = "Current",
    ANSWERED = "Answered",
  }
  const [key, setKey] = useState(TABS.CURRENT.toLowerCase());

  return (
    <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3" fill>
      <Tab eventKey={TABS.CURRENT} title={TABS.CURRENT}>
        CURRENT
      </Tab>
      <Tab eventKey={TABS.ANSWERED} title={TABS.ANSWERED}>
        ANSWERED
      </Tab>
    </Tabs>
  );
}
