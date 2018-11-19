import './LoginPage.scss';

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
import {serverAddress} from '../../constants/ServerAddress';
import PropTypes from 'prop-types';
//import green from '@material-ui/core/colors/green';

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
      //isChecked: false,
    };
  }

  static propTypes = {
    // свойство должно быть функцией
    loginPage: PropTypes.func,
    jwt: PropTypes.func,
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
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
    fetch(`${serverAddress}/api/login`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: authJSON,
    })
      .then(res => res.json())
      .then(
        res => {
          this.props.loginPage(res.jwt);
        }        
      );
  }
  
  render() {
    const {email, password} = this.state;
    //const {jwt} = this.props;
    return (
      <div className="container">
        <div className="login_form">
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
            value={password}
            type="password"
            autoComplete="current-password"
            onChange={this.handleChange('password')}
            />
            <FormControlLabel
                control={
                  <Checkbox 
                    checked={this.state.isChecked} 
                   // onChange={this.handleChange} 
                    value={this.state.isChecked}
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