import React from 'react';
import { View, Text, Modal, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {connect} from 'react-redux';
import {Icon, FormInput, FormLabel} from 'react-native-elements';
import {setCarInfo} from '../actions';
import { WIN_WIDTH} from '../constants';
import * as Permissions from 'expo-permissions';

class Barcode extends React.Component {
  state = {
    showBarcode: false,
    hasCameraPermission: null,
    scanned: false,
  }

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { showBarcode, hasCameraPermission, scanned } = this.state;

    if (showBarcode === true && hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (showBarcode === true && hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }

    return (    
      <View>
        <FormLabel>
          TICKET NO.
        </FormLabel>

        <View style={{ flexDirection: 'row', width: WIN_WIDTH }}>
          <View style={{ width: WIN_WIDTH*0.8 }}>
            <FormInput onChangeText={(val) => this.props.setCarInfo({ticketno: val})} value={this.props.car.ticketno} keyboardType='numeric' />
          </View>

          <View style={{ width: WIN_WIDTH * 0.2 }}>
          <Icon
            iconStyle={{marginTop: 10 }}
            name='barcode-scan'
            type='material-community'
            onPress={() => this.setState({...this.state, showBarcode: true})}
            />
          </View>

          {showBarcode && <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.viewImg}
            onRequestClose={() => this.setState({...this.state, showBarcode: false})}>
          <View style={{flex: 1}}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : this._handleBarCodeRead}
              style={StyleSheet.absoluteFillObject}
            />
            {scanned && (
              <Button
                title={'Tap to Scan Again'}
                onPress={() => this.setState({ scanned: false })}
              />
            )}
          </View>
        </Modal>}
        </View>
      </View>
      );
  }

  _handleBarCodeRead = ({ type, data }) => {
    this.setState({ scanned: true });
    this.props.setCarInfo({ticketno: data});
    this.setState(() => ({...this.state, showBarcode: false}));
  }
}

const mapStateToProps = ({ car }) => ({ car });

export default connect(mapStateToProps, {setCarInfo})(Barcode)