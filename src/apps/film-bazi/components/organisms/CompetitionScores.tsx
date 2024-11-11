import React, { Fragment } from "react";
import { Box, Grid } from "@mui/material";
import WinnerCard from "../molecules/WinnerCard";
import ScoreRecord from "../molecules/ScoreRecord";
import ScoreRecordSkeleton from "../molecules/ScoreRecordsSkeleton";
import WinnerCardsSkeleton from "../molecules/WinnerCardsSkeleton";
import { toPersianNumber } from "commons/utils/translateNumber";

export default function CompetitionScores({ allScores, winnerScores }) {

	const getDisplayName = (user: string, first_name: string, last_name: string) => {
		if (first_name && last_name) {
			return `${first_name} ${last_name}`;
		}

		// Hash the UUID to get a 4-digit number
		const hashCode = Math.abs(
			Array.from(user).reduce((acc, char) => acc + char.charCodeAt(0), 0)
		) % 10000;

		return `کاربر ${toPersianNumber(hashCode.toString().padStart(4, '0'))}`;
	}

	return (
		<Box
			sx={{
				height: "auto",
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<Box
				sx={{
					textAlign: 'center',
					marginTop: "40px"
				}}
			>
				<Grid
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center"
					}}
				>
					{winnerScores.length > 0 ?
						<Fragment>
							<Grid>
								<WinnerCard
									score={winnerScores[2]?.score}
									rank={3}
									name={getDisplayName(winnerScores[2]?.user, winnerScores[2]?.first_name, winnerScores[2]?.last_name)}
								/>
							</Grid>
							<Grid>
								<WinnerCard
									score={winnerScores[0]?.score}
									rank={1}
									name={getDisplayName(winnerScores[0]?.user, winnerScores[0]?.first_name, winnerScores[0]?.last_name)}
								/>
							</Grid>
							<Grid>
								<WinnerCard
									score={winnerScores[1]?.score}
									rank={2}
									name={getDisplayName(winnerScores[1]?.user, winnerScores[1]?.first_name, winnerScores[1]?.last_name)}
								/>
							</Grid>
						</Fragment> :
						<WinnerCardsSkeleton />
					}
				</Grid>
			</Box>
			<Grid
				sx={{
					display: "flex",
					justifyContent: "center",
					width: '100%',
					marginBottom: "10px"
				}}
				container
			>
				{allScores.winnerUsersInfo.length > 0 ?
					allScores.winnerUsersInfo.map((record, index) => (
						<ScoreRecord
							key={record.id}
							rank={index + 1}
							name={getDisplayName(record.user, record.first_name, record.last_name)}
							score={record.score}
							currentUser={record.currentUser}
							user={record.id}
						/>
					)) :
					<ScoreRecordSkeleton />
				}
				{(allScores.currentUser != null && allScores.winerUsresInfo && !allScores.currentUserExistsInWinners) &&
					<>
						<Box sx={{ marginTop: 2, marginBottom: 2 }}>
							<Box sx={{ backgroundColor: "white", borderRadius: "50%", width: "10px", height: "10px", margin: "2px" }} />
							<Box sx={{ backgroundColor: "white", borderRadius: "50%", width: "10px", height: "10px", margin: "2px" }} />
							<Box sx={{ backgroundColor: "white", borderRadius: "50%", width: "10px", height: "10px", margin: "2px" }} />
						</Box>
						<ScoreRecord
							key={allScores.currentUser.id}
							rank={allScores.currentUser.rank}
							name={getDisplayName(allScores.currentUser.user, allScores.currentUser.first_name, allScores.currentUser.last_name)}
							score={allScores.currentUser.score}
							currentUser={allScores.currentUser.currentUser}
							user={allScores.currentUser.id}
						/>
					</>
				}
			</Grid>
		</Box>
	);
}