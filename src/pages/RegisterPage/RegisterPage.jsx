import './RegisterPage.scss';

import React, { PureComponent } from 'react';
/*import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';*/
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
//import green from '@material-ui/core/colors/green';

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
      // isChecked: false,
    };
  }

  handleClick = () => {
    this.setState({
      isChecked: this.state.isChecked ? false : true,
    });
  }

  handleChange = () => event => {
    this.setState({ isChecked: event.target.checked });
  }

  render() {
    return (
      <div className="container">
        <div className="register_form">
          <FormControl required='true'>
            <TextField
            id='user-email'
            label='Email'
          // className={classes.textField}
            //value={this.state.email}
            //onChange={this.handleChange('name')}
            type="email"
            name="email"
            autoComplete="email"
            margin='normal'
            />
            <TextField
            id='user-password'
            label='Пароль'
          // value={this.state.password}
            type="password"
            autoComplete="current-password"
            />
            <TextField
                id='user-name'
                label='Ваше имя'
                // value={this.state.password}
                type="text"
                // autoComplete="current-password"
            />
            <TextField
                id='user-phone'
                label='Телефон'
                // value={this.state.password}
                type="text"
                // autoComplete="current-password"
            />
            <TextField
                id='user-address'
                label='Адрес'
                // value={this.state.password}
                type="text"
                // autoComplete="current-password"
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