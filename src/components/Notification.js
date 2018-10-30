import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import { Colors } from '../themes';

export default class Notification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      positionValue: new Animated.Value(60),
    };

    this.animateNotification = this.animateNotification.bind(this);
  }

  animateNotification(value) {
    const { positionValue } = this.state;
    Animated.timing(positionValue, {
      toValue: value,
      uration: 400,
      velocity: 3,
      tension: 2,
      friction: 8,
      easing: Easing.easeOutBack,
    }).start();
  }

  closeNotification() {
    this.props.handleCloseNotification;
  }
  render() {
    const {
      type,
      firstLine,
      secondLine,
      handleCloseNotification,
      showNotification,
    } = this.props;
    showNotification
      ? this.animateNotification(0)
      : this.animateNotification(60);
    const { positionValue } = this.state;
    return (
      <Animated.View
        style={[{ transform: [{ translateY: positionValue }] }, styles.wrapper]}
      >
        <View style={styles.notificationContent}>
          <Text style={styles.errorText}> {type} </Text>
          <Text style={styles.errorMessage}> {firstLine} </Text>
          <Text style={styles.errorMessage}> {secondLine} </Text>
        </View>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={handleCloseNotification}
        >
          <Icon name="times" size={20} color={Colors.lightGray} />
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

Notification.propTypes = {
  type: PropTypes.string,
  firstLine: PropTypes.string,
  secondLine: PropTypes.string,
  handleCloseNotification: PropTypes.func,
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.white,
    height: 60,
    width: '100%',
    padding: 10,
  },
  notificationContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  errorText: {
    color: Colors.darkOrange,
    marginRight: 5,
    fontSize: 14,
    marginBottom: 2,
  },
  errorMessage: {
    marginBottom: 2,
    fontSize: 14,
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});
