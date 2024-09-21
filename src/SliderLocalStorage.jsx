import { useState, useEffect } from "react";
import { Box, Slider, Typography } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { daysOfWeek, marks, VerticalStepIndicators } from "./utils/StaticData";

const TimeSlider = () => {
  const initialRanges = Array(7).fill([480, 1080]);
  const initialSliders = Array(7).fill(true);

  // Retrieve data from localStorage or use defaults
  const getStoredRanges = () => {
    const storedRanges = localStorage.getItem("timeRanges");
    return storedRanges ? JSON.parse(storedRanges) : initialRanges;
  };

  const getStoredSliders = () => {
    const storedSliders = localStorage.getItem("hasSlider");
    return storedSliders ? JSON.parse(storedSliders) : initialSliders;
  };

  const [timeRanges, setTimeRanges] = useState(getStoredRanges());
  const [hasSlider, setHasSlider] = useState(getStoredSliders());
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  // Save data to localStorage on change
  useEffect(() => {
    localStorage.setItem("timeRanges", JSON.stringify(timeRanges));
  }, [timeRanges]);

  useEffect(() => {
    localStorage.setItem("hasSlider", JSON.stringify(hasSlider));
  }, [hasSlider]);

  //   Time Formate
  const formatTime = (value) => {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${
      hours < 12 ? "AM" : "PM"
    }`;
  };

  //   Add Slider
  const handleAddSlider = (index) => {
    const updatedSliders = [...hasSlider];
    updatedSliders[index] = true;
    setHasSlider(updatedSliders);
  };

  //   Remove Slider
  const handleRemoveSlider = (index) => {
    const updatedSliders = [...hasSlider];
    updatedSliders[index] = false;
    setHasSlider(updatedSliders);
  };

  //   Get All Day Wise Data
  const getDayWiseData = () => {
    return daysOfWeek.map((day, index) => ({
      day: day,
      timeRange: hasSlider[index] ? timeRanges[index] : [null, null],
    }));
  };

  console.log(getDayWiseData());

  return (
    <div className="py-5">
      <Typography className="border-b text-lg border-gray-300 px-5 text-[#232F40] pb-2">
        Business Hours
      </Typography>

      <Box className="section m-5 border rounded-lg pt-5 px-5 shadow-md">
        <Typography className="text-[#232F40] text-base">
          Custom Business Hours
        </Typography>

        <div className="container pt-5">
          {daysOfWeek.map((day, index) => (
            <div
              className="column flex flex-1 items-start gap-5 px-8 min-h-[60px] relative mb-[25px]"
              key={day}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(-1)}
            >
              <Typography className="min-w-[70px] pt-1 text-[#232F40] text-[13px] font-medium">
                {day}
              </Typography>

              <Box sx={{ position: "relative", width: "100%" }}>
                {hasSlider[index] ? (
                  <>
                    <Slider
                      value={timeRanges[index]}
                      onChange={(e, newValue) => {
                        const newRanges = [...timeRanges];
                        newRanges[index] = newValue;
                        setTimeRanges(newRanges);
                      }}
                      valueLabelDisplay="on"
                      min={0}
                      max={1440}
                      step={15}
                      marks={marks}
                      valueLabelFormat={(value) => formatTime(value)}
                      // Customise Slider track, thumb
                      sx={{
                        // Range Thumb Circle
                        "& .MuiSlider-thumb": {
                          height: 20,
                          width: 20,
                          backgroundColor: "#fff",
                          border: "1px solid #A946BA",
                          boxShadow: "0 0 2px 0px rgb(169, 70, 186, 0.8)",
                          "&:focus, &:hover, &.Mui-active": {
                            boxShadow: "0px 0px 3px 1px rgb(169, 70, 186, 0.8)",
                          },
                        },

                        // Unselected Time range
                        "& .MuiSlider-rail": {
                          backgroundColor: "#E2E6E9",
                        },

                        // Selected Time Range
                        "& .MuiSlider-track": {
                          backgroundColor: "#A946BA",
                          border: "1px solid #A946BA",
                          height: "8px",
                        },

                        // On Track Highlighted Mark
                        "& .MuiSlider-mark": {
                          transition: "opacity 0.3s ease-in-out",
                          backgroundColor: "#E2E6E9",
                          height: "8px",
                          width: "2px",
                          borderRadius: "2px",
                          opacity: hoveredIndex === index ? 1 : 0,
                        },

                        // On Hover Visible Time Slot
                        "& .MuiSlider-markLabel": {
                          transition: "opacity 0.3s ease-in-out",
                          fontSize: "12px",
                          color: "#425066",
                          marginTop: "5px",
                          opacity: hoveredIndex === index ? 1 : 0,
                        },
                        // Visible Time Slot
                        "& .MuiSlider-valueLabel": {
                          backgroundColor: "transparent",
                          color: "#425066",
                          fontSize: "14px",
                          margin: "0",
                          padding: "0",
                        },
                      }}
                    />
                    {VerticalStepIndicators}
                  </>
                ) : (
                  <>
                    {/* Offline Hours/Days */}
                    <Box
                      sx={{
                        backgroundColor: "#f0f0f0",
                        height: "4px",
                        borderRadius: "4px",
                        position: "relative",
                        marginTop: "15px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          transition: "opacity 0.3s ease-in-out",
                          color: "#999",
                          fontSize: "14px",
                          fontWeight: "500",
                          marginTop: "4px",
                          opacity: hoveredIndex === index ? 0 : "",
                        }}
                      >
                        Businesses Offline
                      </Typography>
                    </Box>
                    {VerticalStepIndicators}
                  </>
                )}

                {hoveredIndex === index && (
                  <button
                    onClick={() =>
                      hasSlider[index]
                        ? handleRemoveSlider(index)
                        : handleAddSlider(index)
                    }
                    className={`absolute p-1 right-[50%] bg-white shadow-lg border  rounded-md ${
                      hasSlider[index] ? "top-[50%] text-red-600" : "top-[140%]"
                    } z-10`}
                  >
                    {hasSlider[index] ? (
                      <DeleteOutlinedIcon />
                    ) : (
                      <AddOutlinedIcon />
                    )}
                  </button>
                )}
              </Box>
            </div>
          ))}
        </div>
      </Box>
    </div>
  );
};

export default TimeSlider;
