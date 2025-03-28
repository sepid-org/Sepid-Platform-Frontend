import { useGetCourtsQuery } from "../redux/slices/GameLogics";
import useGetCourtFinalSupportPercentage from "./useGetCourtFinalSupportPercentage";

const useGetCourtFinalScore = (fsmId: number) => {
  const courtFinalSupportPercentage = useGetCourtFinalSupportPercentage(fsmId);
  const { data: courts, isFetching } = useGetCourtsQuery();
  const court = courts?.find(court => court.corresponding_fsm === fsmId);

  if (courtFinalSupportPercentage === undefined || isFetching) {
    return undefined;
  }

  return Math.floor(court?.reward_score * courtFinalSupportPercentage / 100);
}

export default useGetCourtFinalScore;