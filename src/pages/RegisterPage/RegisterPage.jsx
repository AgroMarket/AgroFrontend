import './RegisterPage.scss';

import React, {PureComponent} from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {serverAddress} from 'constants/ServerAddress';
import {login} from 'helpers/login';
import {register} from 'helpers/register';

const linkToLogin = props => <Link to="/login" {...props}/>;

/**
 * Класс RegisterPage - компонент, отображающий страницу регистрации
 */
export default class RegisterPage extends PureComponent {
  constructor(props) {
    super(props);

    // значения полей, используемых в render()
    this.state = {
      email: '',
      password: '',
      name: '',
      phone: '',
      address: '',
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
    const {email, password, name, phone, address} = this.state;
    const {setToken} = this.props;

    register(serverAddress, email, password, name, phone, address)
    .then(res => res.json())
    .then(() => {
      login(serverAddress, email, password)
        .then(res => res.json())
        .then(res => {
          setToken(res.jwt);
        });
    });
  };

  render() {
    const {email, password, name, phone, address, isChecked} = this.state;
    return (
      <div className="container">
        <div className="register_form">
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
            <TextField
              id="user-name"
              label="Ваше имя"
              type="text"
              name="name"
              onChange={this.handleChange}
              value={name}
            />
            <TextField
              id="user-phone"
              label="Телефон"
              type="text"
              name="phone"
              onChange={this.handleChange}
              value={phone}
            />
            <TextField
              id="user-address"
              label="Адрес"
              type="text"
              name="address"
              onChange={this.handleChange}
              value={address}
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
              className="registration_button"
              variant="contained"
              color="primary"
              onClick={this.handleSend}
            >
              Отправить сведения
            </Button>
            <Button
              component={linkToLogin}
              className="login_button"
              variant="contained"
              color="secondary"
            >
              Я уже зарегистрирован
            </Button>
          </FormControl>
        </div>
      </div>
    );
  }
}