// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { SnackbarProvider } from 'notistack';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import type { RootProps } from '../reducers/types';
import Routes from '../Routes';

const theme = createMuiTheme({
  palette: {
    primary: blue, //#2196f3
    secondary: { main: red[400] }, // #ef5350
    background: { default: grey[800], paper: grey[900] },
    type: 'dark' // Switching the dark mode on is a single property value change.
  },
  typography: {
    useNextVariants: true
  }
});

export default class Root extends Component<RootProps> {
  render() {
    const { store, history } = this.props;
    console.log('Root is rendering');
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider theme={theme}>
            <SnackbarProvider
              maxSnack={3}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
            >
              <Routes />
            </SnackbarProvider>
          </MuiThemeProvider>
        </ConnectedRouter>
      </Provider>
    );
  }
}
