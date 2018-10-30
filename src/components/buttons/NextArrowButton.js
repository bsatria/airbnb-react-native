import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { PropTypes } from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Colors } from '../../themes';

export default class NextArrowButton extends Component {
  render() {
    const { disabled, handleNextButton } = this.props;
    const opacityStyle = disabled
      ? { backgroundColor: 'rgba(255,255,255,0.2)' }
      : { backgroundColor: 'rgba(255,255,255,0.6)' };
    return (
      <TouchableOpacity
        onPress={handleNextButton}
        disabled={disabled}
        style={[opacityStyle, styles.button]}
      >
        <Icon
          name="angle-right"
          color={Colors.green01}
          size={32}
          style={styles.icon}
        />
      </TouchableOpacity>
    );
  }
}

NextArrowButton.propTypes = {
  disabled: PropTypes.bool,
  handleNextButton: PropTypes.func,
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
  },
  icon: {
    marginRight: -2,
    marginTop: -2,
  },
});
