import './RegisterPage.scss';

import React, { PureComponent } from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import {serverAddress} from '../../constants/ServerAddress';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import  { Redirect } from 'react-router-dom';

const linkToLogin = props => <Link to="/login" {...props}/>;

/**
 * Класс RegisterPage - компонент, отображающий страницу авторизации
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

  handleChange = name => event => {
      this.setState({
          [name]: event.target.value,
      });
  };

  handleSend = () => {
    const authJSON = JSON.stringify({
      'consumer':
        {
          'email': this.state.email,
          'password': this.state.password,
          'name': this.state.name,
          'phone': this.state.phone,
          'address': this.state.address,
        },
    });
    fetch(`${serverAddress}/api/consumers`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: authJSON,
    })
      .then(res => res.json())
      .then(res => {
          this.props.setToken(res.jwt);
          if(res.status !== 404)
          {
            return <Redirect to='/' exact />;
          }
        }
      );

  };

  render() {
    const {email, password, name, phone, address} = this.state;
    return (
      <div className="container">
        <div className="register_form">
          <FormControl required='true'>
            <TextField
            id='user-email'
            label='Email'
          // className={classes.textField}
            //value={this.state.email}
            onChange={this.handleChange('email')}
            type="email"
            name="email"
            autoComplete="email"
            margin='normal'
            value={email}
            />
            <TextField
            id='user-password'
            label='Пароль'
            onChange={this.handleChange('password')}
          // value={this.state.password}
            type="password"
            autoComplete="current-password"
            value={password}
            />
            <TextField
            id='user-name'
            label='Ваше имя'
            onChange={this.handleChange('name')}
            // value={this.state.password}
            type="text"
            // autoComplete="current-password"
            value={name}
            />
            <TextField
            id='user-phone'
            label='Телефон'
            onChange={this.handleChange('phone')}
            // value={this.state.password}
            type="text"
            // autoComplete="current-password"
            value={phone}
            />
            <TextField
            id='user-address'
            label='Адрес'
            onChange={this.handleChange('address')}
            // value={this.state.password}
            type="text"
            // autoComplete="current-password"
            value={address}
            />
            <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.isChecked}
                    onChange={this.handleChange}
                    onClick={this.handleClick}
                    value={this.state.isChecked}
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
              Зарегистрироваться
            </Button>
            <Button
              component={linkToLogin}
              className="login_button"
              variant="contained"
              color="secondary"
              >
              Войти
            </Button>
          </FormControl>
        </div>
        </div>
    );
  }
}