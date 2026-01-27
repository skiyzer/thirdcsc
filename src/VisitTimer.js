import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const TOTAL_TIME_MS = 3 * 60 * 60 * 1000;
const START_KEY = "visit-timer-start";
const VISITED_KEY = "visit-timer-sites";

function readStorage(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    return;
  }
}

function getStartTime() {
  const stored = Number(readStorage(START_KEY));
  if (Number.isFinite(stored) && stored > 0) {
    return stored;
  }
  const fresh = Date.now();
  writeStorage(START_KEY, String(fresh));
  return fresh;
}

function getVisitedSites() {
  const stored = readStorage(VISITED_KEY);
  if (!stored) {
    return [];
  }
  try {
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed)) {
      return parsed.map(id => String(id));
    }
  } catch {
    return [];
  }
  return [];
}

function formatTime(milliseconds) {
  const totalSeconds = Math.max(Math.floor(milliseconds / 1000), 0);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function VisitTimer() {
  const location = useLocation();
  const [startTime] = useState(getStartTime);
  const [visitedSites, setVisitedSites] = useState(getVisitedSites);
  const [now, setNow] = useState(Date.now);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    writeStorage(VISITED_KEY, JSON.stringify(visitedSites));
  }, [visitedSites]);

  useEffect(() => {
    const match = location.pathname.match(/^\/site\/([^/]+)$/);
    if (!match) {
      return;
    }
    const siteId = match[1];
    setVisitedSites(prevSites => (prevSites.includes(siteId) ? prevSites : [...prevSites, siteId]));
  }, [location.pathname]);

  const remaining = Math.max(startTime + TOTAL_TIME_MS - now, 0);
  const timerText = remaining === 0 ? "Congrats! Time is up." : formatTime(remaining);

  return (
    <section className="visit-timer">
      <div className="visit-timer__text">
        <p className="visit-timer__label">See how many sites you can visit in 3 hours</p>
        <strong className="visit-timer__time">{timerText}</strong>
      </div>
      <div className="visit-timer__stats">
        <span className="visit-timer__stat-label">Sites visited</span>
        <span className="visit-timer__stat-value">{visitedSites.length}</span>
      </div>
    </section>
  );
}

export default VisitTimer;
