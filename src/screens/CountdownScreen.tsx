import React from 'react';
import { Button } from 'react-native-paper';
import styled from 'styled-components/native';

export const CountdownScreen = () => {
  const onStartCountdown = () => {
    console.log('onStartCountdown');
  };

  return (
    <Screen>
      <Timer>25:00</Timer>
      <StartButton
        onPress={onStartCountdown}
        uppercase={false}
        mode="contained"
      >
        Start
      </StartButton>
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

const StartButton = styled(Button)`
  margin-top: 20;
  margin-bottom: 20;
`;
