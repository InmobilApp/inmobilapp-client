import React from 'react';
import CardReviews from './CardReviews';
import {
	Card,
	withStyles,
	Typography,
	CardActionArea,
} from '@material-ui/core';

const Listreviews = ({ reviews, classes }) => {
	return (
		<div className={classes.contenedor}>
			<Card>
				<Typography className={classes.title}>
					Opiniones de los usuarios
				</Typography>
				<CardActionArea>
					{reviews.map((review) => {
						return <CardReviews key={review.id} review={review} />;
					})}
				</CardActionArea>
			</Card>
		</div>
	);
};

export default withStyles({
	title: {
		padding: '0px',
		margin: '0px',
		fontSize: 24,
		color: '#6c6c6c',
		marginTop: '0px',
		display: 'flex',
		justifyContent: 'center',
	},
})(Listreviews);
