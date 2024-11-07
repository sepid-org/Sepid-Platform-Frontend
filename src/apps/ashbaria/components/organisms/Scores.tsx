import React, { Fragment } from "react";
import { Box, Container, Grid, IconButton, Stack, Typography } from "@mui/material";
import ScoreRecord from "../molecules/ScoreRecord";
import ScoreRecordSkeleton from "../molecules/ScoreRecordsSkeleton";
import WinnerCardsSkeleton from "../molecules/WinnerCardsSkeleton";
import BackButton from "../molecules/buttons/Back";
import SearchIcon from "../atoms/icons/Search";
import CupIcon from "../atoms/icons/Cup";
import rankings from "../../assets/rankings.svg";
import { ASHBARIA_COIN } from '../../constants/game-info';
import useGetScoreBoardData from "apps/film-bazi/hooks/useGetScoreboardData";
import WinnerRecord from "../molecules/WinnerRecord";

export default function Scores() {
	const {
		winnerScores,
		scoreRecordsState,
		isWinnerScoresLoading,
		isScoreRecordsLoading,
	} = useGetScoreBoardData(ASHBARIA_COIN);

	return (
		<Stack justifyContent={'center'} paddingY={2}>
			<Grid
				sx={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					marginTop: 1,
				}}
			>
				<BackButton />
				<Box sx={{ display: "flex", flexDirection: "row", }}>
					<CupIcon />
					<Typography
						fontWeight={800}
						fontSize={18}
					>
						{"شاخ‌ترین‌ها"}
					</Typography>
				</Box>
				<IconButton>
					<SearchIcon />
				</IconButton>
			</Grid>

			<Grid
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center"
				}}
			>
				{winnerScores.length > 0 ?
					<Container
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							marginTop: 15
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
									name={winnerScores[1].first_name + winnerScores[1].last_name}
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
									name={winnerScores[0].first_name + winnerScores[0].last_name}
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
									name={winnerScores[2].first_name + winnerScores[2].last_name}
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
			</Grid>

			<Stack alignItems={'center'} justifyContent={'center'} spacing={2}>
				{scoreRecordsState.winnerUsersInfo.length > 0 ?
					scoreRecordsState.winnerUsersInfo.map((record, index) => (
						<ScoreRecord key={record.id} rank={index + 1} first_name={record.first_name} last_name={record.last_name} score={record.score} currentUser={record.currentUser} id={record.id} profileImg={record.profile_image} />
					)) :
					<ScoreRecordSkeleton />
				}
			</Stack>
		</Stack>
	);
}