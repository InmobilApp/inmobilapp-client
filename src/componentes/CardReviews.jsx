import React from 'react';
import {
	Card,
	Box,
	Container,
	CardMedia,
	CardContent,
	Typography,
	Button,
	Grid,
	withStyles,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';

const CardReviews = ({ review, classes }) => {
	return (
		<Card className={classes.root}>
			<Typography variant='h5' component='h2' className={classes.title}>
				Cliente : {review.user}
			</Typography>
			<CardMedia className={classes.media}>
				{review.content} <br />
				Calificación:
				<Rating
					name='highlight-selected-only'
					defaultValue={review.score}
					highlightSelectedOnly
				/>
			</CardMedia>
		</Card>

		//
	);
};

export default withStyles({
	rootg: {
		padding: '0px',
		margin: '0px',
		fontSize: 24,
		color: '#6c6c6c',
		marginTop: '0px',
	},
	score: {
		color: '#FAA222',
	},
	contenedor: {},
	media: {
		color: '#fff',
	},
	title: {
		padding: '0px',
		margin: '0px',
		fontSize: 24,
		color: 'white',
		marginTop: '0px',
	},
	root: {
		backgroundColor: '#6c6c6c',
	},

	'&:hover': {
		backgroundColor: '#6c6c6c',
	},
})(CardReviews);
