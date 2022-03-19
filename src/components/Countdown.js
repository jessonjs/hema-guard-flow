import { Box, Typography } from "@mui/material";

const Countdown = ({ paused, countdown }) => {
    return (
        <>
            {!paused && countdown > 0 &&
                <Box sx={{
                    height: '100%',
                    width: '100%',
                    background: 'rgba(0, 0, 0, 80%)',
                    color: 'white',
                    position: 'absolute',
                    top: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Typography fontSize={120}>{countdown}</Typography>
                </Box>
            }
        </>
    );
}

export { Countdown }