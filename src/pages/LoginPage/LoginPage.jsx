import './LoginPage.scss';

import React, { PureComponent } from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import {serverAddress} from 'constants/ServerAddress';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const linkToRegister = props => <Link to="/register" {...props}/>;

/**
 * Класс LoginPage - компонент, отображающий страницу авторизации
 */
export default class LoginPage extends PureComponent {
  constructor(props) {
    super(props);
    
    // значения полей, используемых в render()
    this.state = {
      email: '',
      password: '',
      isChecked: false,
    };
  }

  static propTypes = {
    setToken: PropTypes.func,
    jwtToken: PropTypes.string,
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSend = () => {
    const authJSON = JSON.stringify({
      'auth':
        {
          'email': this.state.email,
          'password': this.state.password,
        },
    });
    const { setToken } = this.props;
    fetch(`${serverAddress}/api/login`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: authJSON,
    })
      .then(res => res.json())
      .then(res => {
        setToken(res.jwt);
      });
  };
  
  render() {
    const {email, password, isChecked} = this.state;
    return (
      <div className="container">
        <div className="login_form">
          <FormControl required={true}>
            <TextField
              id="user-email"
              label="Email"
              onChange={this.handleChange}
              type="email"
              name="email"
              autoComplete="email"
              margin="normal"
              value={email}
            />
            <TextField
              id="user-password"
              label="Пароль"
              type="password"
              name="password"
              autoComplete="current-password"
              onChange={this.handleChange}
              value={password}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isChecked}
                  color="primary"
                />
              }
              label="Запомнить меня"
              className="form_control_label"
            />
            <Button
              className="login_button"
              variant="contained"
              color="primary"
              onClick={this.handleSend}
              >
              Войти
            </Button>
            <Button
              component={linkToRegister}
              className="registration_button"
              variant="contained"
              color="secondary"
            >
              Зарегистрироваться
            </Button>
          </FormControl>
        </div>
      </div>
    );
  }
}