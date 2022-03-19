import { Box, FormControl, Slider, Typography } from "@mui/material";

const Duration = ({ timer, setTimer }) => {
    return (
        <FormControl>
            <Box sx={{ width: 250 }}>
                <Typography id="input-slider" gutterBottom fontWeight={600}>
                    Duration
                </Typography>
                <Slider
                    value={timer / 1000}
                    step={1}
                    marks
                    min={1}
                    max={10}
                    onChange={(ev) => {
                        setTimer(ev.target.value * 1000);
                    }}
                    aria-labelledby="input-slider"
                />
                {timer / 1000} Seconds
            </Box>
        </FormControl>
    );
};

export { Duration }