import { useEffect } from "react";
import AgeCalculator from "./components/AgeCalculator/AgeCalculator.jsx";

// body[data-task] is used by styles/base.css for this task's page background.
const TASK_ID = "4";

export default function App() {
  useEffect(() => {
    document.body.dataset.task = TASK_ID;
    return () => { delete document.body.dataset.task; };
  }, []);

  return (
    <main className="page">
      <div className="page-head">
        <span className="task-chip">Task 4</span>
        <h1 className="page-title">Evaluate Current Age</h1>
        <p className="page-sub">Enter a date of birth and the app does the date arithmetic against today's date to find the present age.</p>
      </div>
      <AgeCalculator />
    </main>
  );
}
