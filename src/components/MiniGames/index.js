import React from 'react';

import CompleteCode from './CompleteCode';
import Chart from './PhysicArticle/Chart';
import Graph from './PhysicArticle/Graph';

export const MINI_GAMES = {
  physic_article_graph: {
    label: 'گراف مقاله فیزیک',
    component: Graph,
  },
  physic_article_chart: {
    label: 'نمودار مقاله فیزیک',
    component: Chart,
  },
  first_complete_code: {
    label: 'بازی کامل کردن کد اول',
    component: CompleteCode,
    props: { mode: 0 },
  },
  second_complete_code: {
    label: 'بازی کامل کردن کد دوم',
    component: CompleteCode,
    props: { mode: 1 },
  },
  third_complete_code: {
    label: 'بازی کامل کردن کد سوم',
    component: CompleteCode,
    props: { mode: 2 },
  },
};

function MiniGames(props) {
  const { gameId } = props.match.params;
  if (!MINI_GAMES[gameId]) {
    return <div></div>;
  }
  const MiniGameComponent = MINI_GAMES[gameId].component;
  return <MiniGameComponent {...MINI_GAMES[gameId].props} />;
}

export default MiniGames;
