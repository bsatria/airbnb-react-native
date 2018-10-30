import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Colors, Images } from '../themes';
import RoundedButton from '../components/buttons/RoundedButton';

export default class LoggedOut extends Component {
  onFacebook() {
    alert('bagas keren');
  }
  onCreateAccount() {
    alert('asdasd');
  }
  onMoreOption() {
    alert('asdasd');
  }
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.welcomeWrapper}>
          <Image style={styles.logo} source={Images.logoAirbnb} />
          <Text style={styles.welcomeText}>Welcome to Airbnb</Text>
          <RoundedButton
            textColor={Colors.green01}
            background={Colors.white}
            icon={
              <Icon
                name="facebook"
                size={20}
                style={styles.facebookButtonIcon}
              />
            }
            text="Continue with Facebook"
            handleOnPress={this.onFacebook}
          />
          <RoundedButton
            textColor={Colors.white}
            text="Create Account"
            handleOnPress={this.onCreateAccount}
          />
          <TouchableOpacity
            style={styles.moreOption}
            onPress={this.onMoreOption}
          >
            <Text style={styles.moreOptionText}>More Options</Text>
          </TouchableOpacity>
          <View style={styles.termAndCondition}>
            <Text style={styles.termText}>
              By tapping Continue, Create Account or More Options,
            </Text>
            <Text style={styles.termText}>I agree to Airbnb's </Text>
            <TouchableOpacity style={styles.termLink}>
              <Text style={styles.termText}>Term of Service</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: 'flex',
    backgroundColor: Colors.green01,
  },
  welcomeWrapper: {
    flex: 1,
    display: 'flex',
    marginTop: 30,
    padding: 20,
  },
  welcomeText: {
    fontSize: 30,
    color: Colors.white,
    fontWeight: '300',
    marginBottom: 40,
  },
  logo: {
    width: 50,
    height: 50,
    marginTop: 50,
    marginBottom: 40,
  },
  facebookButtonIcon: {
    color: Colors.green01,
    zIndex: 8,
    position: 'relative',
    left: 20,
  },
  moreOption: {
    marginTop: 10,
  },
  moreOptionText: {
    color: Colors.white,
    fontSize: 16,
  },
  termAndCondition: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginTop: 30,
  },
  termText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  termLink: {
    borderBottomWidth: 1,
    borderColor: Colors.white,
  },
});
