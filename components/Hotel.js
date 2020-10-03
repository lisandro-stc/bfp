import React, {Component} from 'react';
import { View} from 'react-native';
import {Text, Input, Button}  from 'react-native-elements';
import * as Icon from '@expo/vector-icons';
import {connect} from 'react-redux';
import {has, toUpper} from 'lodash';
import axios from 'axios';
import {MAIN_COLOR, SEARCH_TICKET_URL} from '../constants';
import {setCarInfo} from '../actions';
import Barcode from './Barcode';
import Option from './RampForm/Option';
import CarDetailsInput from './RampForm/CarDetailsInput';
import Comment from './RampForm/Comment';
import SubmitBtn from './RampForm/SubmitBtn';
import CheckOutDate from './CheckOutDate';

class Hotel extends Component {
  state = {
    hasValidTicket: false,
    loading: false,
    showDatePicker: false,
    chosenDate: new Date(),
  }

  componentDidMount() {
    this.props.setCarInfo({ name: this.props.selected_location });
  }

  render() {
    const {setCarInfo, car, error} = this.props;

    return (
      <View>
        <Input label={"HOTEL NAME"} />
        <View style={{ margin: 15 }}>
          <Text style={{marginLeft: 5}}>{toUpper(car.name)}</Text>
        </View>
        {has(error, 'name') && <Input errorMessage={error.name}/>}
        <Barcode />
        {this.state.hasValidTicket  && has(error, 'ticketno') && <Input errorMessage={error.ticketno}/>}
        {
          this.state.hasValidTicket 
          ? this._hotelForm()
          : <Button 
            loading={this.state.loading} 
            backgroundColor={MAIN_COLOR} 
            icon={<Icon.MaterialIcons name='search'size={24}/>} 
            title='SEARCH' 
            onPress={this._searchTicket} />
        }
      </View>
    );
  }

  _searchTicket = () => {
    const params = {
      hotel: this.props.car.name,
      ticketno: this.props.car.ticketno,
      ticket_type: 'hotel'
    };

    this.setState(() => ({loading: true}));
    axios.post(SEARCH_TICKET_URL, params)
      .then(this._getTicketInfo)
      .catch(this._handdleErr)
    ;
  }

  _getTicketInfo = ({ data }) => {
    let hasValidTicket = false;
    if (data.error) {
      alert(data.msg);
    } else {
      hasValidTicket = true;
      data.data && this.props.setCarInfo(data.data);
    }
    this.setState(() => ({ ...this.state, loading: false, hasValidTicket }));
  }

  _handdleErr = (error) => {
    this.setState(() => ({ loading: false }));
    console.log(error);
  }

  _hotelForm() {
    const {setCarInfo, car, error} = this.props;
    
    return (
      <View>
        
        <Input label={"OPTION"} />
        <Option />
        {has(error,'opt') && <Input errorMessage={error.opt}/>}
{/*         
        {car.opt == 'delivery' && <FormLabel>FLOOR NUMBER</FormLabel>}
        {car.opt == 'delivery' && <Input onChangeText={floor_number => setCarInfo({floor_number})} value={car.floor_number} />}
        {car.opt == 'delivery' && <FormValidationMessage>{has(error,'floor_number') && error.floor_number}</FormValidationMessage>}
         */}
        <Input label={"GUEST NAME"} />
        <Input onChangeText={guest_name => setCarInfo({guest_name})} value={car.guest_name} />
        {has(error,'guest_name') && <Input errorMessage={error.guest_name}/>}

          <Input label={"FOLIO NUMBER"} />
        <Input onChangeText={folio_number => setCarInfo({folio_number})} value={car.folio_number} />
        {has(error,'folio_number') && <Input errorMessage={error.folio_number}/>}

          <Input label={"ROOM NUMBER"} />
        <Input onChangeText={room_number => setCarInfo({room_number})} value={car.room_number} />
        {has(error,'room_number') && <Input errorMessage={error.room_number}/>}

          <Input label={"CHECKOUT DATE"} />
        <View style={{marginLeft: 15}}>
          <CheckOutDate date={this.props.car.checkout_date} onDateChange={(checkout_date) => setCarInfo({ checkout_date })} />
        </View>
        {has(error,'checkout_date') && <Input errorMessage={error.checkout_date}/>}
        <CarDetailsInput />
        <Comment />
        <SubmitBtn />
      </View>
    )
  }
}

const mapStateToProps = ({ car, error, selected_location }) => ({ car, error, selected_location });

export default connect(mapStateToProps, { setCarInfo})(Hotel);