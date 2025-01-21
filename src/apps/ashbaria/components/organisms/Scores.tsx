import React, { Fragment, useEffect, useRef } from "react";
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import ScoreRecord from "../molecules/ScoreRecord";
import ScoreRecordSkeleton from "../molecules/ScoreRecordsSkeleton";
import WinnerCardsSkeleton from "../molecules/WinnerCardsSkeleton";
import BackButton from "../molecules/buttons/Back";
import SearchIcon from "../atoms/icons/Search";
import CupIcon from "../atoms/icons/Cup";
import rankings from "../../assets/rankings.svg";
import { ASHBARIA_COIN } from '../../constants/game-info';
import useGetScoreBoardData from "apps/ashbaria/hooks/useGetScoreboardData";
import WinnerRecord from "../molecules/WinnerRecord";
import { toPersianNumber } from "commons/utils/translateNumber";
import hashStringToNumber from "commons/utils/hashStringToNumber";

export default function Scores() {
	const {
		winnerScores,
		scoreRecordsState,
		isWinnerScoresLoading,
		isScoreRecordsLoading,
	} = useGetScoreBoardData(ASHBARIA_COIN);

	const getDisplayName = (user_id: string, first_name: string, last_name: string) => {
		if (first_name && last_name) {
			return `${first_name} ${last_name}`;
		}

		const hashCode = hashStringToNumber(user_id);
		return `دادبستان ${toPersianNumber(hashCode.toString().padStart(4, '0'))}`;
	}

	const currentUserScoreRecord = useRef(null);
	useEffect(() => {
		if (currentUserScoreRecord.current) {
			currentUserScoreRecord.current.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
				inline: 'nearest'
			})
		}
	}, [currentUserScoreRecord.current]);

	return (
		<Stack alignItems={'center'} justifyContent={'center'} padding={2} spacing={2} position={'relative'}>
			<Stack direction={'row'}>
				<Box position={'absolute'} left={4} top={4}>
					<BackButton />
				</Box>
				<Stack direction={'row'} spacing={1} alignItems={'center'} justifyContent={'center'}>
					<CupIcon size={32} />
					<Typography fontSize={24} fontWeight={800}>
						{'شاخ‌ترین‌ها'}
					</Typography>
				</Stack>
				{/* <Box position={'absolute'} right={8} top={6}>
					<IconButton>
						<SearchIcon size={32} />
					</IconButton>
				</Box> */}
			</Stack>

			{/* <Stack paddingTop={1}>
				{winnerScores.length > 0 ?
					<Container
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							marginTop: 12,
						}}
					>
						<Box
							sx={{
								marginBottom: 1,
								position: "relative",
								width: '482px',
							}}
						>
							<Stack
								sx={{
									position: "absolute",
									bottom: '-50px',
									left: '80px',
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									flexDirection: "column",
								}}
								spacing={1}
							>
								<WinnerRecord
									profileImg={winnerScores[1].profile_image}
									name={getDisplayName(winnerScores[1]?.user_id, winnerScores[1]?.first_name, winnerScores[1]?.last_name)}
									score={winnerScores[1].score}
								/>
							</Stack>
							<Stack
								sx={{
									position: "absolute",
									top: '-100px',
									left: "200px",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									flexDirection: "column",
								}}
								spacing={1}
							>
								<WinnerRecord
									profileImg={winnerScores[0].profile_image}
									name={getDisplayName(winnerScores[0]?.user_id, winnerScores[0]?.first_name, winnerScores[0]?.last_name)}
									score={winnerScores[0].score}
								/>
							</Stack>
							<Stack
								sx={{
									position: "absolute",
									bottom: '-70px',
									right: "70px",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									flexDirection: "column",
								}}
								spacing={1}
							>
								<WinnerRecord
									profileImg={winnerScores[2].profile_image}
									name={getDisplayName(winnerScores[2]?.user_id, winnerScores[2]?.first_name, winnerScores[2]?.last_name)}
									score={winnerScores[2].score}
								/>
							</Stack>
						</Box>
						<Box
							component="img"
							src={rankings}
							width="60%"
							height="200px"
						/>
					</Container> :
					<WinnerCardsSkeleton />
				}
			</Stack> */}

			{scoreRecordsState.winnerUsersInfo.length > 0 ? (
				<Fragment>
					{/* Additional ScoreRecord component rendered only if the condition is true 
					<ScoreRecord
						key={scoreRecordsState.currentUser.id}
						rank={scoreRecordsState.currentUser.rank}
						name={getDisplayName(scoreRecordsState.currentUser.id, scoreRecordsState.currentUser.first_name, scoreRecordsState.currentUser.last_name)}
						score={scoreRecordsState.currentUser.score}
						currentUser={scoreRecordsState.currentUser.currentUser}
						user_id={scoreRecordsState.currentUser.id}
						profileImg={scoreRecordsState.currentUser.profileImg}
					/>
				*/}
					{/* Mapped ScoreRecord components */}
					{scoreRecordsState.winnerUsersInfo
						.slice(0, 990)
						.map((record, index) => (
							<ScoreRecord
								key={record.user_id}
								rank={index + 11}
								name={getDisplayName(record.user_id, record.first_name, record.last_name)}
								score={record.score}
								currentUser={record.currentUser}
								user_id={record.user_id}
								profileImg={record.profile_image}
								ref={record.currentUser ? currentUserScoreRecord : null}
							/>
						))}
				</Fragment>
			) : (
				<ScoreRecordSkeleton />
			)}
		</Stack>
	);
}