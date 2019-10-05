import moment from 'moment';
import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import styled from 'styled-components/native';

const getCountdownTime = (
  startTime: string,
  seconds: number
): string | undefined => {
  const end = moment(startTime).add(seconds, 'seconds');
  const now = moment();

  const ms = end.diff(now);

  if (ms > 0) {
    return moment.utc(ms).format('mm:ss');
  }

  return undefined;
};

enum STATUS {
  WORK_READY,
  WORK_RUNNING,
  WORK_FINISH,
  BREAK_RUNNING,
  BREAK_FINISH,
}

enum TIME {
  WORK = '25:00',
  BREAK = '5:00',
}

enum SECONDS {
  WORK = 1500,
  BREAK = 300,
}

export const CountdownScreen = () => {
  const [countdownTime, setCountdownTime] = useState<undefined | string>(
    TIME.WORK
  );
  const [timer, setTimer] = useState<any>(undefined);
  const [status, setStatus] = useState<STATUS>(STATUS.WORK_READY);

  const onStart = (
    seconds: number,
    startStatus: STATUS,
    endStatus: STATUS,
    endTime: TIME
  ) => {
    const startTime = moment().format();
    const interval: any = setInterval(() => {
      const time = getCountdownTime(startTime, seconds);

      if (time) {
        setStatus(startStatus);
        setCountdownTime(time);
        return;
      }

      onEnd(interval, endStatus, endTime);
    }, 1000);

    setTimer(interval);
  };

  const onEnd = (interval: any, endStatus: STATUS, endTime: TIME) => {
    setStatus(endStatus);
    setCountdownTime(endTime);
    clearInterval(interval);
  };

  const onStartWork = () => {
    onStart(SECONDS.WORK, STATUS.WORK_RUNNING, STATUS.WORK_FINISH, TIME.BREAK);
  };

  const onEndWork = (interval: any) => {
    onEnd(interval, STATUS.WORK_FINISH, TIME.BREAK);
  };

  const onStartBreak = () => {
    onStart(
      SECONDS.BREAK,
      STATUS.BREAK_RUNNING,
      STATUS.BREAK_FINISH,
      TIME.BREAK
    );
  };

  const onEndBreak = (interval: any) => {
    onEnd(interval, STATUS.BREAK_FINISH, TIME.WORK);
  };

  return (
    <Screen>
      <Timer>{countdownTime}</Timer>
      {(status === STATUS.WORK_READY || status === STATUS.BREAK_FINISH) && (
        <PrimaryButton onPress={onStartWork} uppercase={false} mode="contained">
          Start
        </PrimaryButton>
      )}
      {status === STATUS.WORK_RUNNING && (
        <PrimaryButton
          onPress={() => onEndWork(timer)}
          uppercase={false}
          mode="contained"
        >
          Stop
        </PrimaryButton>
      )}
      {status === STATUS.WORK_FINISH && (
        <PrimaryButton onPress={onStartWork} uppercase={false} mode="outlined">
          Reset
        </PrimaryButton>
      )}
      {status === STATUS.WORK_FINISH && (
        <PrimaryButton
          onPress={onStartBreak}
          uppercase={false}
          mode="contained"
        >
          Start
        </PrimaryButton>
      )}
      {status === STATUS.BREAK_RUNNING && (
        <PrimaryButton
          onPress={() => onEndBreak(timer)}
          uppercase={false}
          mode="contained"
        >
          Stop
        </PrimaryButton>
      )}
    </Screen>
  );
};

const Screen = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Timer = styled.Text`
  font-size: 64;
`;

const PrimaryButton = styled(Button)`
  margin-top: 20;
`;
