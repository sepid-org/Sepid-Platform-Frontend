import { AccountReducer } from './Account';
import { currentStateReducer } from './currentState';
import { programsReducer } from './programs';
import { translatorReducer } from './translator';
import { whiteboardReducer } from './whiteboard';
import { workshopReducer } from './workshop';
import { articleReducer } from './article';
import { assessmentReducer } from './assessment';
import { AnswerReducer } from './Answer';
import { WebsiteReducer } from './Website';
import { GlobalReducer } from './Global';
import { websocketReducer } from 'apps/chat/redux/websocket';

const allReducers = {
  account: AccountReducer,
  websocket: websocketReducer,
  global: GlobalReducer,
  website: WebsiteReducer,
  currentState: currentStateReducer,
  whiteboard: whiteboardReducer,
  programs: programsReducer,
  workshop: workshopReducer,
  article: articleReducer,
  Intl: translatorReducer,
  scoring: assessmentReducer,
  answer: AnswerReducer,
};

export default allReducers;
