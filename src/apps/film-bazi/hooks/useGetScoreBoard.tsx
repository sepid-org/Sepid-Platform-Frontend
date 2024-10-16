import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BankApiUrl } from '../constants/Urls';
import { ScoreBoardItemType } from '../types';
import { GAME_CURRENCY_NAME } from '../constants/game';

const useGetScoreBoard = (currencyName = GAME_CURRENCY_NAME) => {
  const [scoreBoard, setScoreBoard] = useState<ScoreBoardItemType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const accessToken = useSelector((state: any) => state.account.accessToken);

  useEffect(() => {
    const fetchScoreBoard = async () => {
      try {
        const headers = new Headers();
        if (accessToken) {
          headers.append('Authorization', `JWT ${accessToken}`);
        }

        const response = await fetch(`${BankApiUrl}counter/scoreboard/?currency_name=${currencyName}`, {
          headers: headers,
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: ScoreBoardItemType[] = await response.json();
        setScoreBoard(data);
        setLoading(false);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
        setLoading(false);
      }
    };
    if (accessToken) {
      fetchScoreBoard();
    }
  }, [accessToken]);

  return { scoreBoard, loading, error };
};

export default useGetScoreBoard;