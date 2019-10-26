import Reactotron, { asyncStorage, openInEditor, networking, trackGlobalErrors } from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

if (__DEV__) {
  const tron = Reactotron.configure({
    host: '192.168.0.101'
  })
    .use(reactotronRedux())
    .use(networking())
    .use(sagaPlugin())
    .useReactNative()
    .connect();

  tron.clear();

  console.tron = tron;
}