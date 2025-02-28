import React, { useState, useEffect } from "react";
import { Typography, Paper } from "@mui/material";
import { differenceInSeconds, addYears, formatDuration, intervalToDuration } from "date-fns";

const getNextTargetDate = () => {
  const now = new Date();
  let targetYear = now.getFullYear();
  if (now > new Date(targetYear, 7, 7)) {
    targetYear += 4;
  } else if (targetYear % 4 !== 2) {
    targetYear = targetYear + (2 - (targetYear % 4));
  }
  return new Date(targetYear, 7, 7);
};

const CountdownTimer: React.FC = () => {
  const [targetDate, setTargetDate] = useState(getNextTargetDate());
  const [, setTimeLeft] = useState(differenceInSeconds(targetDate, new Date()));

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const secondsLeft = differenceInSeconds(targetDate, now);
      if (secondsLeft <= 0) {
        setTargetDate((prevDate) => addYears(prevDate, 4)); // Reiniciar el contador 4 años más
      } else {
        setTimeLeft(secondsLeft);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const duration = intervalToDuration({ start: new Date(), end: targetDate });

  return (
    <Paper elevation={3} sx={{ padding: 3, textAlign: "center", maxWidth: 400, margin: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Tiempo restante hasta el {formatTargetDate(targetDate)}:
      </Typography>
      <Typography variant="h4" color="primary">
        {formatDuration(duration, { format: ["years", "months", "days", "hours", "minutes", "seconds"] })}
      </Typography>
    </Paper>
  );
};

const formatTargetDate = (date: Date) => {
  return date.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });
};

export default CountdownTimer;
