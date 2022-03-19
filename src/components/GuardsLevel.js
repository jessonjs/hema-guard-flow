import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";

const GuardsLevel = ({ updateCurrentLevel }) => {
    return (
        <FormControl>
            <Typography id="input-slider" gutterBottom fontWeight={600}>
                Guard Set Level
            </Typography>
            <RadioGroup name='guard-level-group' row onChange={ev => updateCurrentLevel(ev.target.value)} defaultValue={1}>
                <FormControlLabel value={1} label='Beginner' control={<Radio />} />
                <FormControlLabel value={2} label='Intermediate' control={<Radio />} />
                <FormControlLabel value={3} label='Advanced' control={<Radio />} />
            </RadioGroup>
        </FormControl>
    );
};

export { GuardsLevel }