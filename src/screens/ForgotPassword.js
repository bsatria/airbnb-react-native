import React, { Component } from 'react';
import { Text, StyleSheet, View, KeyboardAvoidingView } from 'react-native';

import { Colors } from '../themes';
import InputFields from '../components/forms/InputFields';
import NextArrowButton from '../components/buttons/NextArrowButton';
import Notification from '../components/Notification';
import Loader from '../components/Loader';

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formValid: true,
      loadingVisible: false,
      validEmail: false,
      emailAddress: '',
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.goToNextStep = this.goToNextStep.bind(this);
    this.handleCloseNotification = this.handleCloseNotification.bind(this);
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

  goToNextStep() {
    if (this.state.validEmail) {
      this.setState({
        loadingVisible: true,
      });
      setTimeout(() => {
        if (this.state.emailAddress === 'bagas@gmail.com') {
          this.setState({
            loadingVisible: false,
            formValid: false,
          });
        } else {
          this.setState({
            loadingVisible: false,
            formValid: true,
          });
        }
      }, 2000);
    }
  }

  handleCloseNotification() {
    this.setState({
      formValid: true,
    });
  }

  render() {
    const background = this.state.formValid
      ? Colors.green01
      : Colors.darkOrange;
    return (
      <KeyboardAvoidingView
        style={[{ backgroundColor: background }, styles.wrapper]}
        behavior="padding"
      >
        <View style={styles.form}>
          <Text style={styles.forgotPasswordHeading}>
            Forgot your password?
          </Text>
          <Text style={styles.forgotPasswordSubHeading}>
            Enter your email to find your account
          </Text>
          <InputFields
            customStyle={{ marginBottom: 30 }}
            textColor={Colors.white}
            labelText="EMAIL ADDRESS"
            labelTextSize={14}
            labelColor={Colors.white}
            borderBottomColor={Colors.white}
            inputType="email"
            onTextChange={this.handleEmailChange}
            showCheckmark={this.state.validEmail}
            autoFocus={true}
          />
        </View>
        <View style={styles.nextButton}>
          <NextArrowButton
            handleNextButton={this.goToNextStep}
            disabled={!this.state.validEmail}
          />
        </View>
        <View>
          <Notification
            type="Error"
            firstLine="Email account not found"
            showNotification={!this.state.formValid}
            handleCloseNotification={this.handleCloseNotification}
          />
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
  form: {
    marginTop: 90,
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
  },
  forgotPasswordHeading: {
    fontSize: 27,
    color: Colors.white,
    fontWeight: '300',
  },
  forgotPasswordSubHeading: {
    fontSize: 12,
    color: Colors.white,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 40,
  },
  nextButton: {
    alignItems: 'flex-end',
    right: 20,
    bottom: 10,
  },
});
