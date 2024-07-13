import { accountReducer } from './account';
import { currentStateReducer } from './currentState';
import { programsReducer } from './programs';
import { redirectReducer } from './redirect';
import { translatorReducer } from './translator';
import { whiteboardReducer } from './whiteboard';
import { workshopReducer } from './workshop';
import { articleReducer } from './article';
import { scoringReducer } from './scoring';
import { questionReducer } from './Question';
import { AnswerReducer } from './Answer';
import { WebsiteReducer } from './Website';
import { GlobalReducer } from './Global';

const allReducers = {
  global: GlobalReducer,
  website: WebsiteReducer,
  account: accountReducer,
  currentState: currentStateReducer,
  whiteboard: whiteboardReducer,
  redirect: redirectReducer,
  programs: programsReducer,
  workshop: workshopReducer,
  article: articleReducer,
  Intl: translatorReducer,
  scoring: scoringReducer,
  question: questionReducer,
  answer: AnswerReducer,
};

export default allReducers;
