import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Switch } from 'react-router';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import { createUser } from './services/userAPI';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      isButtonDisable: true,
      loading: false,
      irSearch: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.checkButton = this.checkButton.bind(this);
    this.onClickButton = this.onClickButton.bind(this);
  }

  handleChange({ target }) {
    const valueDigitado = target.value;
    this.setState({ userName: valueDigitado }, () => this.checkButton());
  }

  onClickButton() {
    const { userName } = this.state;
    this.setState({ loading: true },
      () => createUser({ name: userName }).then(() => this.setState({
        loading: false,
        irSearch: true,
      })));
  }

  checkButton() {
    const { userName } = this.state;
    if (userName.length >= Number('3')) {
      this.setState({ isButtonDisable: false });
    }
  }

  render() {
    const {
      isButtonDisable,
      loading,
      irSearch,
    } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (<Login
              { ...props }
              handleChange={ this.handleChange }
              isButtonDisable={ isButtonDisable }
              onClickButton={ this.onClickButton }
              loading={ loading }
              irSearch={ irSearch }
            />) }
          />
          <Route exact path="/album/:id" render={ (props) => <Album { ...props } /> } />
          <Route
            exact
            path="/favorites"
            render={ (props) => <Favorites { ...props } /> }
          />
          <Route exact path="/profile" render={ (props) => <Profile { ...props } /> } />
          <Route
            path="/profile/edit"
            render={ (props) => <ProfileEdit { ...props } /> }
          />
          <Route exact path="/search" render={ (props) => <Search { ...props } /> } />
          <Route exact render={ (props) => <NotFound { ...props } /> } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
