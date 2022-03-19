import './App.css';
import { useMainGuards } from './guards/mainGuards';
import { useSecondaryGuards } from './guards/secondaryGuards';
import { useTertiaryGuards } from './guards/tertiaryGuards';
import { useEffect, useState } from 'react';
import { Box, Button, Divider, Typography } from '@mui/material';
import { Countdown } from './components/Countdown';
import { Duration } from './components/Duration';
import { GuardsLevel } from './components/GuardsLevel';

function App() {
  const levels = {
    1: useMainGuards(),
    2: useSecondaryGuards(),
    3: useTertiaryGuards(),
  };

  const [availableGuards, setAvailableGuards] = useState(levels[1]);
  const [timer, setTimer] = useState(3000);
  const [guardDisplayed, setGuardDisplayed] = useState(levels[1][0]);
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(true);
  const [countdown, setCountdown] = useState(3);

  const updateCurrentLevel = (level) => {
    let joined = [];

    for (let i = 1; i <= level; i++) {
      joined = [...joined, ...levels[i]];
    }

    setAvailableGuards(joined);
  };

  useEffect(() => {
    let currentGuard = null;
    let guardChangeInterval = null;

    const getNewGuard = () => {
      const currentGuardIndex = availableGuards.indexOf(currentGuard);

      let _availableGuards = currentGuardIndex > -1 ?
        [...availableGuards.slice(0, currentGuardIndex), ...availableGuards.slice(currentGuardIndex + 1)] :
        availableGuards;

      currentGuard = _availableGuards[Math.floor(Math.random() * (_availableGuards.length))];

      return currentGuard;
    };

    const updateGuardChangeInterval = () => setInterval(() => {
      setGuardDisplayed(getNewGuard());
    }, timer);

    if (!paused && countdown === 0) {
      guardChangeInterval = updateGuardChangeInterval();
    }

    return () => {
      clearInterval(guardChangeInterval);
    };
  }, [timer, availableGuards, paused, countdown]);

  useEffect(() => {
    if (!paused) {
      setTimeout(() => {
        if (countdown !== 0) {
          setCountdown(countdown - 1);
        }
      }, 1000);
    } else {
      setCountdown(3);
    }
  }, [paused, countdown]);

  return (
    <>
      <Box maxWidth={300} mx='auto' textAlign='center' mt={4} position='absolute' left={0} right={0}>
        <Button
          variant='contained'
          color={!started ? 'success' : (paused ? 'info' : 'error')}
          size='large'
          onClick={() => {
            if (!started) {
              setStarted(true);
            }
            setPaused(!paused)
          }}>{!started ? 'start' : (paused ? 'Continue' : 'Pause')}</Button>
      </Box>
      <Box className="App" sx={{
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center'
      }} px={3}>
        {(
          started && countdown === 0 ||
          (paused && started)) &&
          <Box sx={{
            fontSize: 60
          }}>
            <h1>{guardDisplayed}</h1>
          </Box>
        }
        <Box mb={3} mt={10}>
          <GuardsLevel updateCurrentLevel={updateCurrentLevel} />
        </Box>
        <Divider />
        <Box mt={3}>
          <Duration timer={timer} setTimer={setTimer} />
        </Box>
      </Box>
      <Countdown countdown={countdown} paused={paused} />
      <Typography position='absolute' bottom={0}>v1.0.0-alpha</Typography>
    </>
  );
}

export default App;
