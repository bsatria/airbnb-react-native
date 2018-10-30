import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { PropTypes } from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Colors } from '../themes';
import InputFields from '../components/forms/InputFields';
import NextArrowButton from '../components/buttons/NextArrowButton';
import Notification from '../components/Notification';
import Loader from '../components/Loader';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formValid: false,
      validEmail: false,
      validPassword: false,
      emailAddress: '',
      loadingVisible: false,
    };
    this.handleCloseNotification = this.handleCloseNotification.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleNextButton = this.handleNextButton.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.toggleNextButtonState = this.toggleNextButtonState.bind(this);
  }

  handleNextButton() {
    this.setState({
      loadingVisible: true,
    });
    setTimeout(() => {
      if (this.state.emailAddress === 'bagas@gmail.com') {
        this.setState({
          formValid: false,
          loadingVisible: false,
        });
      } else {
        this.setState({
          formValid: true,
          loadingVisible: false,
        });
      }
    }, 2000);
  }
  handleCloseNotification() {
    this.setState({
      formValid: false,
    });
  }
  handleEmailChange(email) {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.setState({
      emailAddress: email,
    });
    if (!this.state.validEmail) {
      if (emailRegEx.test(email)) {
        this.setState({
          validEmail: true,
        });
      }
    } else {
      if (!emailRegEx.test(email)) {
        this.setState({
          validEmail: false,
        });
      }
    }
  }
  handleChangePassword(password) {
    if (!this.state.validPassword) {
      if (password.length >= 4) {
        this.setState({
          validPassword: true,
        });
      }
    } else if (password.length <= 4) {
      this.setState({
        validPassword: false,
      });
    }
  }
  toggleNextButtonState() {
    const { validEmail, validPassword } = this.state;
    if (validEmail && validPassword) {
      return false;
    }
    return true;
  }
  render() {
    const background = this.state.formValid
      ? Colors.darkOrange
      : Colors.green01;
    return (
      <KeyboardAvoidingView
        style={[{ backgroundColor: background }, styles.wrapper]}
      >
        <View style={styles.scrollWrapper}>
          <ScrollView style={styles.scroll}>
            <Text style={styles.login}> Log In </Text>
            <InputFields
              labelText="EMAIL ADDRESS"
              labelTextSize={14}
              labelColor={Colors.white}
              textColor={Colors.white}
              borderBottomColor={Colors.white}
              inputType="email"
              customStyle={{ marginBottom: 30 }}
              onTextChange={this.handleEmailChange}
              showCheckmark={this.state.validEmail}
              autoFocus={true}
            />
            <InputFields
              labelText="PASSWORD"
              labelTextSize={14}
              labelColor={Colors.white}
              textColor={Colors.white}
              borderBottomColor={Colors.white}
              inputType="password"
              onTextChange={this.handleChangePassword}
              customStyle={{ marginBottom: 30 }}
              showCheckmark={this.state.validPassword}
            />
          </ScrollView>
          <View style={styles.nextButton}>
            <NextArrowButton
              handleNextButton={this.handleNextButton}
              disabled={this.toggleNextButtonState()}
            />
          </View>
          <View>
            <Notification
              type="Error"
              firstLine="Those credentials don't look right."
              secondLine="Please try again. "
              showNotification={this.state.formValid}
              handleCloseNotification={this.handleCloseNotification}
            />
          </View>
        </View>
        <Loader modalVisible={this.state.loadingVisible} animationType="fade" />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flex: 1,
  },
  scrollWrapper: {
    flex: 1,
    marginTop: 70,
  },
  scroll: {
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 20,
    flex: 1,
  },
  login: {
    fontSize: 34,
    color: Colors.white,
    fontWeight: '300',
    marginBottom: 40,
  },
  nextButton: {
    alignItems: 'flex-end',
    right: 20,
    bottom: 10,
  },
});
