import React from 'react';
import renderer from 'react-test-renderer';
import { CountdownScreen } from '.';

describe('GIVEN I am "user type" "any"', () => {
  describe('WHEN I am at "Countdown Screen"', () => {
    const tree = renderer.create(<CountdownScreen />).toJSON();

    it('THEN I Should see "default UI"', () => {
      expect(tree).toMatchSnapshot();
    });
  });
});
