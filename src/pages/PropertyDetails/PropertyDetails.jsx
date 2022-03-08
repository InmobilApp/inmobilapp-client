import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import propertyService from '../../services/property';
import Loading from '../../componentes/Loading';
import Navbar from '../../componentes/Navbar';
import { withStyles } from '@material-ui/core/styles';
import Footer from '../../componentes/Footer';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BathroomIcon from '@mui/icons-material/Bathroom';
import GarageIcon from '@mui/icons-material/Garage';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ListReviews from '../../componentes/ListReviews';
import {
	Grid,
	Card,
	Box,
	Container,
	CardMedia,
	CardContent,
	Typography,
	Button,
	Modal,
} from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';
import clientService from '../../services/client';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(3),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

let imageIndex = 0;

const getUserForLocalStorage = () => {
	const loggedUserJSON = window.localStorage.getItem('loggedUser');

	if (loggedUserJSON !== null && loggedUserJSON !== undefined) {
		try {
			return JSON.parse(loggedUserJSON);
		} catch (e) {
			return null;
		}
	}

	return null;
};

function PropertyDetails(props, classes) {
	const [open, setOpen] = React.useState(false);
	const [mensaje, setMensaje] = React.useState('');
	const [title, setTitle] = React.useState('');
	const handleOpen = (msj) => {
		setMensaje(msj);
		setOpen(true);
	};
	const handleClose = () => setOpen(false);
	const user = getUserForLocalStorage();
	const [property, setProperty] = useState({});
	const [image, setImage] = useState();

	const { id } = useParams();
	let previousButton = null;

	useEffect(async () => {
		const request = await propertyService.getPropertyDetail(id);
		setImage(request.images[0]);
		setProperty(request);
	}, []);

	return property.hasOwnProperty('id') && image ? (
		<Grid spacing={3} container className={props.classes.root}>
			<Container>
				<Navbar />
				<Box mt={2}>
					<Card className={props.classes.card}>
						<CardMedia>
							<Button className={props.classes.buttonge} href='/'>
								<ArrowBackIcon className={props.classes.buttonback} />
							</Button>

							<Carousel className={props.classes.carousel}>
								{property.images.map((image, index) => (
									<CardMedia
										className={props.classes.media}
										key={index}
										image={image}
										alt='property-images'
										component='img'
										title='property-images'
										height='400'
									/>
								))}
							</Carousel>
						</CardMedia>
						<Container className={props.classes.container}>
							<Grid>
								<Box>
									<Box />
									<Box>
										<CardContent>
											<Grid className={props.classes.gridItem}>
												<Grid>
													<Item>
														<BedroomParentIcon className={props.classes.icon} />
														<span>Rooms: </span>
														{property.details.rooms
															? property.details.rooms
															: 'Not available'}
													</Item>
												</Grid>
												<Grid>
													<Item>
														<DashboardIcon className={props.classes.icon} />
														<span>Area: </span>
														{property.details.area}
													</Item>
												</Grid>
												<Grid>
													<Item>
														<BathroomIcon className={props.classes.icon} />
														<span>Baths: </span>
														{property.details.baths
															? property.details.baths
															: 'N/A'}
													</Item>
												</Grid>
												<Grid>
													<Item>
														<GarageIcon className={props.classes.icon} />
														<span>Garage: </span>
														{property.details.garage ? 'Yes' : 'No'}
													</Item>
												</Grid>
											</Grid>
										</CardContent>
										<Box className={props.classes.title}>
											<Typography variant='h4'>
												{property.location.address}
											</Typography>
										</Box>
										<Box>
											<Typography variant='h6'>
												{property.description}
											</Typography>
										</Box>
										<Grid>
											<Item>
												<span className={props.classes.Agen}>Name: </span>
												{property.agentID ? property.agentID.name : 'No agent'}
												<br />
												<span className={props.classes.Agen}>Phone: </span>
												{property.agentID ? property.agentID.phone : 'No Found'}
											</Item>
											<Item>
												{(user && user.role === 'AGENT') ||
												(user && user.role === 'ADMIN') ? (
													<> </>
												) : user && user.role === 'CLIENT' ? (
													<div>
														<Button
															onClick={() =>
																clientService
																	.addFavoriteProperty(id)
																	.then(() => {
																		handleOpen(
																			`Que bien😄 ${user.name} La propiedad se agrego a tus favoritos😄`
																		);
																	})
																	.catch((err) => {
																		handleOpen(
																			`  ${user.name} Esta propiedad ya fue agregada a tus favoritos, por favor intenta con otra propiedad`
																		);
																	})
															}
															variant='contained'
															className={props.classes.button}
														>
															Añadir a favoritos <FavoriteIcon />
														</Button>

														<Modal
															className={props.classes.modal}
															open={open}
															onClose={handleClose}
															aria-labelledby='modal-modal-title'
															aria-describedby='modal-modal-description'
														>
															<Box sx={style}>
																<Typography
																	id='modal-modal-title'
																	variant='h6'
																	component='h2'
																>
																	{title}
																</Typography>
																<Typography
																	id='modal-modal-description'
																	sx={{ mt: 2 }}
																>
																	{mensaje}
																</Typography>
															</Box>
														</Modal>
													</div>
												) : (
													<div>
														<span>
															Para añadir a favoritos debes iniciar sesión
														</span>
														<br />
														<Button
															className={props.classes.button}
															size='small'
															color='primary'
															href='/login'
														>
															{' '}
															Iniciar sesión{' '}
														</Button>
													</div>
												)}
											</Item>
											<>
												<ListReviews reviews={property.reviews} />
											</>
										</Grid>
									</Box>
								</Box>
							</Grid>
						</Container>
					</Card>
				</Box>
				<Footer />
			</Container>
		</Grid>
	) : (
		<Loading />
	);
}

export default withStyles({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		color: '#535353',
		transition: '0.3s',
	},
	buttonge: {
		borderRadius: '10px',
	},
	buttonback: {
		margin: '0 auto',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: '0.5rem',
		justifyContent: 'center',
		color: '#fff',
		backgroundColor: '#FAA222',
		'&:hover': {
			backgroundColor: '#535353',
			color: '#fff',
			op: '1',
		},
	},
	button: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		margin: '0 auto',
		textTransform: 'yes',
		color: '#fff',
		backgroundColor: '#FAA222',
		'&:hover': {
			backgroundColor: '#535353',
			color: '#fff',
			op: '1',
		},
	},

	root: {
		backgroundImage: `url('https://www.semana.com/resizer/jnQaPKkvpQMk8c15-bx4f0F8zIo=/1200x675/filters:format(jpg):quality(50)//cloudfront-us-east-1.images.arcpublishing.com/semana/RGY5R6T7SFCSFJ6DDBEURLQCPM.jpg')`,
		flexGrow: 1,
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		opactity: '0.5',
	},
	Agen: {
		color: '#FAA222',
		fontWeight: 'bold',
		fontSize: '1.2rem',
	},
	icon: {
		color: '#FAA222',
		fontSize: '1.5rem',
		marginRight: '0.5rem',
		position: 'relative',
		top: '0.3rem',
		left: '0.3rem',
	},
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	media: {
		height: '400px',
		cover: true,
		direction: 'row',
		cursor: 'pointer',
		boxDecorationBreak: 'clone',
		boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
	},
	content: {},
	title: {
		fontSize: '1.5rem',
		fontWeight: 'bold',
		textAlign: 'center',
		color: '#FAA222',
	},
	actions: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		margin: '0px',
		padding: '0px',
	},
	carousel: {
		position: 'relative',
		width: '860px',
		height: '400px',
		margin: '0 auto',
		marginTop: '70px',
		marginBottom: '20px',
		hover: {
			cursor: 'pointer',
		},
	},
	card: {},
	gridItem: {
		display: 'flex',
		justifyContent: 'center',
		margin: '0px',
		padding: '0px',
		width: '100%',
		height: '100%',
	},
	box: {},
})(PropertyDetails);
