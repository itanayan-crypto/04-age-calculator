import { useState } from "react";
import "./AgeCalculator.css";

const pad = (n) => String(n).padStart(2, "0");
const fmt = (d) => `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()}`;
const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

const startOfToday = () => {
  const n = new Date();
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
};

// "2000-05-17" -> local Date (timezone ki problem nahi aati)
const parseInput = (v) => {
  const [y, m, d] = v.split("-").map(Number);
  return new Date(y, m - 1, d);
};

// Date arithmetic: years, months, days (borrow logic ke saath)
function ageBetween(dob, today) {
  let years = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();
  let days = today.getDate() - dob.getDate();

  if (days < 0) {
    months -= 1;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); // pichle mahine ke din
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months, days };
}

export default function AgeCalculator() {
  const today = startOfToday();
  const [dobText, setDobText] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const onChange = (e) => {
    setDobText(e.target.value);
    setResult(null);
    setError("");
  };

  const find = () => {
    const dob = parseInput(dobText);
    if (dob > today) {
      setResult(null);
      setError("Date of birth cannot be in the future.");
      return;
    }
    setError("");
    setResult({
      ...ageBetween(dob, today),
      weekday: dob.toLocaleDateString("en-US", { weekday: "long" }),
      dob,
    });
  };

  return (
    <section className="panel" style={{ "--panel": "var(--sun)" }}>
      <div className="age-form">
        <label className="field">
          <span className="field-label">Enter your Date of Birth</span>
          <input className="input" type="date" max={toISO(today)} value={dobText} onChange={onChange} />
        </label>
        <div className="field">
          <span className="field-label">System Date (today's date)</span>
          <div className="readout">{fmt(today)}</div>
        </div>
      </div>

      <div className="btn-row mt">
        <button type="button" className="btn btn--ink" onClick={find} disabled={!dobText}>
          Find Present Age
        </button>
      </div>

      {error && <p className="alert" role="alert">{error}</p>}

      {result && (
        <div className="stat-grid mt" aria-live="polite">
          <div className="stat">
            <span className="stat-value">{result.years}</span>
            <span className="stat-name">Years</span>
          </div>
          <div className="stat">
            <span className="stat-value">{result.months}</span>
            <span className="stat-name">Months</span>
          </div>
          <div className="stat">
            <span className="stat-value">{result.days}</span>
            <span className="stat-name">Days</span>
          </div>
          <div className="stat stat--wide">
            <span className="stat-name">Day of birth ({fmt(result.dob)})</span>
            <span className="stat-value stat-value--text">{result.weekday}</span>
          </div>
        </div>
      )}
    </section>
  );
}
