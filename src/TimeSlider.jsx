import { useState } from "react";
import { Box, Slider, Typography } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { daysOfWeek, marks, VerticalStepIndicators } from "./utils/StaticData";

const TimeSlider = () => {
  const initialRanges = Array(7).fill([480, 1080]);
  const [timeRanges, setTimeRanges] = useState(initialRanges);
  const [hasSlider, setHasSlider] = useState(Array(7).fill(true));
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const formatTime = (value) => {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${
      hours < 12 ? "AM" : "PM"
    }`;
  };

  const handleAddSlider = (index) => {
    const updatedSliders = [...hasSlider];
    updatedSliders[index] = true;
    setHasSlider(updatedSliders);
  };

  const handleRemoveSlider = (index) => {
    const updatedSliders = [...hasSlider];
    updatedSliders[index] = false;
    setHasSlider(updatedSliders);
  };

    // Function to get day-wise time range data
    const getDayWiseData = () => {
      return daysOfWeek.map((day, index) => ({
        day: day,
        timeRange: hasSlider[index] ? timeRanges[index] : [null, null],
      }));
    };

    console.log(getDayWiseData())

  return (
    <div id="app" className="py-5">
      <Typography className="border-b text-lg border-gray-400  px-5 text-[#232F40]">
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

              {/* Slider or skeleton depending on hasSlider state */}
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
                      sx={{
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

                        "& .MuiSlider-rail": {
                          backgroundColor: "#E2E6E9",
                        },
                        "& .MuiSlider-track": {
                          backgroundColor: "#A946BA",
                          border: "1px solid #A946BA",
                          height: "8px",
                        },
                        "& .MuiSlider-mark": {
                          transition: "opacity 0.3s ease-in-out",
                          backgroundColor: "#E2E6E9",
                          height: "8px",
                          width: "2px",
                          borderRadius: "2px",
                          opacity: hoveredIndex === index ? 1 : 0,
                        },
                        "& .MuiSlider-markLabel": {
                          transition: "opacity 0.3s ease-in-out",
                          fontSize: "12px",
                          color: "#425066",
                          marginTop: "5px",
                          opacity: hoveredIndex === index ? 1 : 0,
                        },
                        "& .MuiSlider-valueLabel": {
                          backgroundColor: "transparent",
                          color: "#425066",
                          fontSize: "14px",
                          margin: "0",
                          padding: "0",
                        },
                      }}
                    />
                    {/* Vertical Step Indicators */}
                    {VerticalStepIndicators}
                  </>
                ) : (
                  <>
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
                    {/* Vertical Step Indicators */}
                    {VerticalStepIndicators}
                  </>
                )}

                {/* Add/Remove Slider Button */}
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
