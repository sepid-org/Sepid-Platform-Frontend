import { UserInfoType } from 'types/profile';
import { updateToken } from 'configs/axios';
import createStore from './createStore';

export const getPersistedState = (): { userInfo: UserInfoType; token: string; refresh: string; } => {
  return localStorage.getItem('sepid-state')
    ? JSON.parse(localStorage.getItem('sepid-state'))
    : {};
}

const reduxStore = createStore(getPersistedState());

reduxStore.subscribe(() => {
  const state = reduxStore.getState();
  localStorage.setItem(
    'sepid-state',
    JSON.stringify({
      account: {
        userInfo: state.account.userInfo,
        token: state.account.token,
        refresh: state.account.refresh,
      },
      Intl: state.Intl,
    })
  );
  updateToken(state.account.token);
});

export default reduxStore;
