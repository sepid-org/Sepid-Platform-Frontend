import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MiniGames from '../../components/MiniGames';
import Article from '../../containers/Article';
import ChangePassword from '../../containers/ChangePassword';
import EventRegistration from '../../containers/Dashboard/EventRegistration';
import Events from '../../containers/Dashboard/Events';
import FailedPayment from '../../containers/Dashboard/FailedPayment';
import SuccessfulPayment from '../../containers/Dashboard/SuccessfulPayment';
import EditArticle from '../../containers/EditArticle';
import EditWorkshop from '../../containers/EditWorkshop';
import ZeroJourneyer from '../../containers/Landings/ZeroJourneyer';
import LoginPage from '../../containers/LoginPage';
import MentorPage from '../../containers/MentorPage';
import OurTeam from '../../containers/OurTeam';
import Registration from '../../containers/Registration';
import Survey from '../../containers/Survey';
import Workshop from '../../containers/Workshop';
import Workshops from '../../containers/Workshops';
import PrivateRoute from '../PrivateRoute';


const Root = () => {
  return (
    <>
      <Switch>
        <Route path="/our_team" component={OurTeam} />
        <Route path="/change-password" component={ChangePassword} />
        <Route path="/registration" component={Registration} />
        <PrivateRoute path='/payment/success/' component={SuccessfulPayment} />
        <PrivateRoute path='/payment/failure/' component={FailedPayment} />
        <PrivateRoute path="/events/" component={Events} />
        <Route path="/event/">
          <PrivateRoute path="/event/registration/:event_id?" component={EventRegistration} />
        </Route>
        <Route path="/loading/"></Route>
        <Route path="/admin" component={LoginPage}></Route>
        <Route path="/game/:gameId" component={MiniGames} />
        <PrivateRoute path="/edit_workshop/:fsmId/" component={EditWorkshop} />
        <PrivateRoute path="/edit_article/:articleId/" component={EditArticle} />
        <PrivateRoute path="/workshops/" component={Workshops} />
        <Route path="/workshop/">
          <Switch>
            <PrivateRoute
              path="/workshop/:playerUUID/:fsmId/:stateId/"
              component={Workshop}
            />
            <PrivateRoute path="/workshop/:fsmId/" component={Workshop} />
            <Route path="/workshop/" component={Workshops} />
          </Switch>
        </Route>
        <Route path="/article/:articleId" component={Article} />
        <PrivateRoute path="/mentor/" component={MentorPage} />
        <PrivateRoute path="/survey" component={Survey} />
        <Route path="/" component={ZeroJourneyer} />
        <Route
          path="*"
          render={() => <Redirect to={{ pathname: '/' }} />}
        />
      </Switch>
    </>
  );
};
export default Root;
