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
//import green from '@material-ui/core/colors/green';

/**
 * Класс LoginPage - компонент, отображающий страницу авторизации
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
              className="login_button"
              variant="contained"
              color="primary"
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