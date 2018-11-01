import { Dimensions } from 'react-native';
import Colors from './Colors';

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const width = Dimensions.get('window').width;
const transparentHeaderStyle = {
  borderBottomWidth: 0,
  elevation: 0,
};

const ApplicationStyles = { transparentHeaderStyle };

export default ApplicationStyles;
