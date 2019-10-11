import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-native-push-notification', () => {
  return {
    localNotificationSchedule: jest.fn(),
    cancelLocalNotifications: jest.fn(),
  };
});
