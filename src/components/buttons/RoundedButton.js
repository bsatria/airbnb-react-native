import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { Colors } from '../../themes';

export default class RoundedButton extends Component {
  render() {
    const { text, textColor, background, icon, handleOnPress } = this.props;
    const backgroundColor = background || 'transparent';
    const color = textColor || Colors.black;
    return (
      <TouchableOpacity
        style={[{ backgroundColor }, styles.wrapper]}
        onPress={handleOnPress}
      >
        <View style={styles.buttonTextWrapper}>
          {icon}
          <Text style={[{ color }, styles.buttonText]}> {text} </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

RoundedButton.propTypes = {
  text: PropTypes.string.isRequired,
  textColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  icon: PropTypes.object,
  handleOnPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    padding: 15,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: Colors.white,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 16,
    width: '100%',
    textAlign: 'center',
  },
  buttonTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
