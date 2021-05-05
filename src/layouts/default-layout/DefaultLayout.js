import React from "react";
import { Grid } from "@material-ui/core/";
import { withStyles, createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';

import { red } from '@material-ui/core/colors';

import styles from "./DefaultLayout.style";
import '../layout.css';


var palette = {
	type: "dark",
	primary: {
		main: "#0465ae",
		contrastText: "#fff"
	},															/* Setando as cores padroes do projeto */
	secondary: {
		main: red[800],
		contrastText: "#fff"
	},
	divider: "#ffffff80",
	contrastThreshold: 3,
	tonalOffset: 0.2,
}

var typography = {
	fontFamily: [
		'Montserrat',
		'Roobert',
		'"Helvetica Neue"',
		'Helvetica',
		'Arial',
		'sans-serif'
	].join(','),
}

class DefaultLayout extends React.Component {


	constructor(props) {
		super(props);
		let theme = createMuiTheme({ palette, typography });
		theme = responsiveFontSizes(theme);									/* Criação de tema do projeto */

		this.state = {
			theme: theme,
		};
	}

	render() {
		const { classes, children } = this.props;
		const { theme } = this.state;
		const childrenWithProps = React.Children.map(children, child =>
			React.cloneElement(child)
		);

		return (
			<ThemeProvider theme={theme}>
				<div className={classes.root}>
					<Grid
						container
						spacing={3}
						className={classes.container}
					>
						<Grid item md={3} xs={2}>

						</Grid>
						<Grid item md={6} xs={12}>						{/* Formato da página "pai" */}
							<main>
								{childrenWithProps}
							</main>
						</Grid>
						<Grid item md={3} xs={2}>

						</Grid>
					</Grid>
				</div>
			</ThemeProvider>
		);
	}
}

export default withStyles(styles)(DefaultLayout)