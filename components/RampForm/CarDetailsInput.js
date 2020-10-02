
import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {has} from 'lodash';
import {Input} from 'react-native-elements';
import {setCarInfo} from '../../actions';
import CarPicker from '../CarPicker';

const CarDetailsInput = (props) => (
  <View>
    <Input label={"CAR COLOR"} />
    <Input onChangeText={car_color => props.setCarInfo({ car_color })} value={props.car.car_color} />

    <Input label={"CAR PLATE NO"} />
    <Input onChangeText={car_plate_no => props.setCarInfo({ car_plate_no })} value={props.car.car_plate_no} />
    {has(props.error, 'car_plate_no') && <Input errorMessage={props.error.car_plate_no}/>}

    <Input label={"CAR MAKE&MODEL"} />
    <View style={{margin: 15}}>
      <CarPicker value={props.car.car_model} onValueChange={car_model => props.setCarInfo({car_model})} />
    </View>
      {has(props.error, 'car_model') && <Input errorMessage={props.error.car_model}/>}
  </View>
);

const mapStateToProps =({car, error}) => ({car, error});

export default connect(mapStateToProps, {setCarInfo})(CarDetailsInput);