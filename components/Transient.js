import React, {Component} from 'react';
import {View} from 'react-native';
import {Button, Text, Input}  from 'react-native-elements';
import * as Icon from '@expo/vector-icons';
import {connect} from 'react-redux';
import {has, toUpper} from 'lodash';
import axios from 'axios';
import { setCarInfo } from '../actions';
import { SEARCH_TICKET_URL, MAIN_COLOR } from '../constants';
import Option from './RampForm/Option';
import Picker from './Picker';
import Barcode from './Barcode';
import CarDetailsInput from './RampForm/CarDetailsInput';
import Comment from './RampForm/Comment';
import SubmitBtn from './RampForm/SubmitBtn';
import CheckOutDate from './CheckOutDate';

class Transient extends Component {
  state = {
    hasValidTicket: false,
    loading: false,
    paymentMethodOptions: [
      {key: 'cash', label: 'CASH'},
      {key: 'credit', label: 'CREDIT'}
    ]
  }

  componentWillMount = () => this.props.setCarInfo({ name: this.props.selected_location });

  render() {
    const { setCarInfo, car, error } = this.props;

    return (
      <View>
        <Barcode />
        {this.state.hasValidTicket && has(error, 'ticketno') && <Input errorMessage={error.ticketno}/>}
        {
          this.state.hasValidTicket
            ? this._transientForm()
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

  _transientForm() {
    const { setCarInfo, car, error } = this.props;
    const { paymentMethodOptions } = this.state;

    return (
      <View>
        <Input label={"OPTION"} />
        <Option />
        {has(error, 'opt') && <Input errorMessage={error.opt}/>}
{/*         
        {car.opt == 'delivery' && <FormLabel>FLOOR NUMBER</FormLabel>}
        {car.opt == 'delivery' && <Input onChangeText={floor_number => setCarInfo({floor_number})} value={car.floor_number} />}
        {car.opt == 'delivery' && <FormValidationMessage>{has(error,'floor_number') && error.floor_number}</FormValidationMessage>} */}

        <Input label={"HOTEL NAME"} />
        <View style={{ margin: 15 }}>
          <Text style={{ marginLeft: 5 }}>{toUpper(car.name)}</Text>
        </View>
        {has(error, 'name') && <Input errorMessage={error.name}/>}

        <Input label={"CHECKOUT DATE"} />
        <View style={{marginLeft: 15}}>
          <CheckOutDate date={this.props.car.checkout_date} onDateChange={checkout_date => setCarInfo({ checkout_date })} />
        </View>
        {has(error,'checkout_date') && <Input errorMessage={error.checkout_date}/>}

        <Input label={"PAYMENT METHOD"} />
        <View style={{ marginLeft: 10 }}>
          <Picker value={car.payment_method} onValueChange={payment_method => setCarInfo({ payment_method })} options={paymentMethodOptions} />
        </View>
        {has(error, 'payment_method') && <Input errorMessage={error.payment_method}/>}

        <Input label={"CONTACT NO."} />
        <Input
          inputStyle={{ marginLeft: 5 }}
          onChangeText={contact_no => setCarInfo({ contact_no })}
          value={car.contact_no}
          placeholder='09xxxxxxxxx'
          dataDetectorTypes='phoneNumber'
          keyboardType='phone-pad' />
        {has(error, 'contact_no') && <Input errorMessage={error.contact_no}/>}


        <CarDetailsInput />
        <Comment />
        <SubmitBtn />
      </View>
    );
  }

  _searchTicket = () => {
    const params = {
      hotel: this.props.car.name,
      ticketno: this.props.car.ticketno,
      ticket_type: 'transient'
    };

    this.setState(() => ({ loading: true }));
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
}

const mapStateToProps = ({ car, error, selected_location }) => ({ car, error, selected_location });

export default connect(mapStateToProps, { setCarInfo})(Transient);