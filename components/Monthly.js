import React, {Component} from 'react';
import {View} from 'react-native';
import {Text, Input}  from 'react-native-elements';
import {connect} from 'react-redux';
import {has, toUpper, map, findIndex} from 'lodash';
import axios from 'axios';
import {FETCH_MONTHLY_GUEST_URL} from '../constants';
import {setCarInfo} from '../actions';
import Option from './RampForm/Option';
import Comment from './RampForm/Comment';
import SubmitBtn from './RampForm/SubmitBtn';
import Picker from '../components/Picker';

class Monthly extends Component {
  state = {
    monthly_guest: []
  }

  componentDidMount() {
    axios.post(FETCH_MONTHLY_GUEST_URL)
    .then(({data}) => {
      this.setState(() => ({ ...this.state, monthly_guest: data }));
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    const {car, error} = this.props;
    const {monthly_guest} = this.state;
    const monthlyGuestOption = map(monthly_guest, (guest) => ({
      key: guest.guest_name,
      label: guest.guest_name,
    }));

    return (
      <View>
        <Input label={"GUEST NAME"} />
        <View style={{ marginLeft: 15 }}>
          <Picker value={car.guest_name} options={monthlyGuestOption} onValueChange={this._onGuestNameChange} />
        </View>
        {has(error,'guest_name') && <Input errorMessage={error.guest_name}/>}
        
        <Input label={"CONTACT NO."} />
        <View style={{ marginLeft: 20 }}>
          <Text>{car.contact_no || '-'}</Text>
        </View>
        <Input label={"OPTION"} />
          <Option />
          {has(error,'opt') && <Input errorMessage={error.opt}/>}
{/*           
          {car.opt == 'delivery' && <FormLabel>FLOOR NUMBER</FormLabel>}
          {car.opt == 'delivery' && <Input onChangeText={floor_number => setCarInfo({floor_number})} value={car.floor_number} />}
          {car.opt == 'delivery' && <FormValidationMessage>{has(error,'floor_number') && error.floor_number}</FormValidationMessage>}
         */}
          
          <Input label={"HOTEL NAME"} />
          <View style={{ marginLeft: 20 }}>
            <Text>{toUpper(car.name) || '-'}</Text>
          </View>
          
          <Input label={"CAR COLOR"} />
          <View style={{ marginLeft: 20 }}>
            <Text>{toUpper(car.car_color) || '-'}</Text>
          </View>
      
          <Input label={"CAR PLATE NO"} />
          <View style={{ marginLeft: 20 }}>
            <Text>{toUpper(car.car_plate_no) || '-'}</Text>
          </View>
  
          <Input label={"CAR MAKE&MODEL"} />
          
          <View style={{ marginLeft: 20 }}>
            <Text>{toUpper(car.car_model) || '-'}</Text>
          </View>
          <Comment />
          <SubmitBtn />
      </View>
    );
  }

  _onGuestNameChange = guestName => {
    const INVALID_INDEX = -1;
    const index = findIndex(this.state.monthly_guest, {guest_name: guestName});

    if (index > INVALID_INDEX)
      this.props.setCarInfo(this.state.monthly_guest[index]);
  }
}

const mapStateToProps = ({ car, error, selected_location }) => ({ car, error, selected_location });

export default connect(mapStateToProps, { setCarInfo})(Monthly);