import React from "react";
import { Container, Box, Typography, Skeleton, Stack, } from "@mui/material";
import starIcon from "../../assets/starIcon.svg";
import { toPersianNumber } from 'commons/utils/translateNumber';

interface WinnerScore {
	rank: number,
	score: number,
	name: string,
}

const WinnerCard: React.FC<WinnerScore> = ({ rank, score, name }) => {
	const conditionalHeight = rank === 1 ? "198px" : rank === 2 ? "120px" : "58px";
	const conditionalColor = rank === 1 ? "#d9c66a" : rank === 2 ? "#686868" : "#853414";
	const conditionalRectangleColor = rank === 1 ? "linear-gradient(360deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 205, 32, 0.3) 100%)" : rank === 2 ? "linear-gradient(360deg, rgba(171, 191, 197, 0.08) 0%, rgba(171, 191, 197, 0.8) 100%)" : "linear-gradient(360deg, rgba(255, 255, 255, 0.03) 0%, rgba(235, 92, 36, 0.3) 100%);";

	return (
		<Stack
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<Box
				sx={{
					height: "60.52px",
					width: "60.52px",
					gap: "0px",
					border: "1.5px",
					borderRadius: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					marginBottom: 2,
					backgroundColor: conditionalColor,
				}}
			>
				<Box
					component="img"
					src={starIcon}
					sx={{
						width: "35.4px",
						height: "34.26px",
						top: "12.56px",
						left: "50.13px",
						border: "1.5px",
					}}
				/>
			</Box>
			<Typography
				sx={{
					marginBottom: 2,
					fontSize: "16px",
					fontWeight: "600",
					lineHeight: "24px",
					color: conditionalColor,
					overflow: 'hidden',
					whiteSpace: 'normal',
					textOverflow: 'ellipsis',
				}}
			>
				{name}
				<br />
				{toPersianNumber(score)}
			</Typography>
			<Box
				sx={{
					width: {
						md: "135.67px",
						xs: "100px"
					},
					height: conditionalHeight,
					borderRadius: "10px 10px 0px 0px",
					background: conditionalRectangleColor
				}}
			/>
		</Stack>
	);
}

export default WinnerCard;