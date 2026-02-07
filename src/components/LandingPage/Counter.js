import React, { useEffect, useState } from "react";
import "./Counter.css";
import { FaAward, FaCalendarCheck, FaSuitcase, FaUsers } from "react-icons/fa";

const Counter = () => {
  const counters = [
    { icon: <FaCalendarCheck/>, num: 6, label: "Years Completed" },
    { icon: <FaSuitcase/>, num: 5, label: "Successful Projects" },
    { icon: <FaUsers />, num: 50, label: "Team Members" },
    { icon: <FaAward/>, num: 15, label: "Awards" },
  ];

  const [counts, setCounts] = useState(counters.map(() => 0));

  useEffect(() => {
    counters.forEach((item, index) => {
      let start = 0;
      const end = item.num;
      const duration = 1500; // 1.5 sec
      const startTime = performance.now();

      const animate = (currentTime) => {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const value = Math.floor(progress * end);

        setCounts((prev) => {
          const updated = [...prev];
          updated[index] = value;
          return updated;
        });

        if (progress < 1) requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    });
  }, []);

  return (
    <div className="landing-pages">
      <div className="testimonial-box">
        <div className="counter-grid">
          {counters.map((item, i) => (
            <div className="counter-bx" key={i}>
              <div className="counter-icon">{item.icon}</div>
              <div className="counter-num">
                <h3 className="count">{counts[i]}</h3>
                <span>{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Counter;
