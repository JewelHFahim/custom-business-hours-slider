export const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const marks = [
  { value: 0, label: "12:00 AM" },
  { value: 120, label: "2:00 AM" },
  { value: 240, label: "4:00 AM" },
  { value: 360, label: "6:00 AM" },
  { value: 480, label: "8:00 AM" },
  { value: 600, label: "10:00 AM" },
  { value: 720, label: "12:00 PM" },
  { value: 840, label: "2:00 PM" },
  { value: 960, label: "4:00 PM" },
  { value: 1080, label: "6:00 PM" },
  { value: 1200, label: "8:00 PM" },
  { value: 1320, label: "10:00 PM" },
  { value: 1440, label: "12:00 AM" },
];

export const VerticalStepIndicators = [...Array(97)].map((_, index) => {
  const value = index * 15;
  return (
    <div
      key={value}
      style={{
        position: "absolute",
        left: `${(value / 1440) * 100}%`,
        height: "10px",
        width: "1px",
        backgroundColor: "#425066",
        top: "23px",
        opacity: 0.1,
      }}
    />
  );
});
