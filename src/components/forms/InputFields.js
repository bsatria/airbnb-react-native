import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
  Animated,
  Easing,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Colors } from '../../themes';

export default class InputFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secureInput:
        props.inputType === 'text' || props.inputType === 'email'
          ? false
          : true,
      scaleCheckmarkValue: new Animated.Value(0),
    };
    this.showPassword = this.showPassword.bind(this);
  }
  scaleCheckmark(value) {
    Animated.timing(this.state.scaleCheckmarkValue, {
      toValue: value,
      duration: 400,
      easing: Easing.easeOutBack,
    }).start();
  }
  showPassword() {
    this.setState({
      secureInput: !this.state.secureInput,
    });
  }
  render() {
    const {
      labelText,
      labelTextSize,
      labelColor,
      textColor,
      borderBottomColor,
      inputType,
      customStyle,
      onTextChange,
      showCheckmark,
      autoFocus,
      autoCapitalize,
    } = this.props;
    const { secureInput, scaleCheckmarkValue } = this.state;
    const fontSize = labelTextSize || 14;
    const color = labelColor || Colors.white;
    const inputColor = textColor || Colors.white;
    const borderBottom = borderBottomColor || Colors.white;
    const keyboardType = inputType === 'email' ? 'email-address' : 'default';
    const iconScale = scaleCheckmarkValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.5, 1],
    });
    const scaleValue = showCheckmark ? 1 : 0;
    this.scaleCheckmark(scaleValue);
    return (
      <View style={[customStyle, styles.wrapper]}>
        <Text style={[{ color, fontSize }, styles.label]}> {labelText} </Text>
        {inputType === 'password' ? (
          <TouchableOpacity
            style={styles.showButton}
            onPress={this.showPassword}
          >
            <Text style={styles.showButtonText}>
              {secureInput ? 'Show' : 'Hide'}
            </Text>
          </TouchableOpacity>
        ) : null}
        <Animated.View
          style={[
            { transform: [{ scale: iconScale }], opacity: scaleValue ? 1 : 0 },
            styles.checkMarkWrapper,
          ]}
        >
          <Icon name="check" color={Colors.white} size={20} />
        </Animated.View>
        <TextInput
          style={[
            { color: inputColor, borderBottomColor: borderBottom },
            styles.inputField,
          ]}
          secureTextEntry={secureInput}
          onChangeText={onTextChange}
          autoCorrect={false}
          autoFocus={autoFocus}
          autoCapitalize={autoCapitalize}
        />
      </View>
    );
  }
}

InputFields.propTypes = {
  labelText: PropTypes.string.isRequired,
  fontSize: PropTypes.number,
  labelColor: PropTypes.string,
  textColor: PropTypes.string,
  borderBottomColor: PropTypes.string,
  inputType: PropTypes.string.isRequired,
  showCheckmark: PropTypes.bool.isRequired,
  onChangeText: PropTypes.func,
  autoFocus: PropTypes.bool,
  autoCapitalize: PropTypes.bool,
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
  },
  label: {
    fontWeight: '700',
    marginBottom: 10,
  },
  inputField: {
    borderBottomWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
  },
  showButton: {
    position: 'absolute',
    right: 0,
  },
  showButtonText: {
    color: Colors.white,
  },
  checkMarkWrapper: {
    position: 'absolute',
    right: 0,
    bottom: 10,
  },
});
