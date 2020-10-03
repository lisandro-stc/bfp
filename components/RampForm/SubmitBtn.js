import React, {Component} from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-elements';
import * as Icon from '@expo/vector-icons';
import {connect} from 'react-redux';
import axios from 'axios';
import {setCarInfo, setErrors, resetCarInfo} from '../../actions';
import {MAIN_COLOR, HOME_NAV, ADD_CAR_URL} from '../../constants';


class SubmitBtn extends Component {
  state = {
    loading: false,
  }

  render() {
    return (
      <View style={{ marginBottom: 200, marginTop: 20 }}>
        <Button
          loading={this.state.loading}
          backgroundColor={MAIN_COLOR}
          icon={<Icon.MaterialIcons name='save'size={24}/>}
          title='CREATE TICKET' 
          onPress={this._save}
        />
        
      </View>
    );
  }

  _save = () => {
    this.setState(() => ({loading: true}));
    axios.post(ADD_CAR_URL, {
      ...this.props.car,
      location: this.props.selected_location
    }).then(({ data }) => {
      this.setState(() => ({ loading: false }));
      if(data.error) {
        this.props.setErrors(data.data);
        return;
      } else {
        this.props.setErrors({});
        this.props.resetCarInfo();
        this.props.nav.navigate(HOME_NAV);
      }
    }).catch((error) => {
      this.setState(() => ({ loading: false }));
      console.log(error);
    });
  }
}

const mapStateToProps =({car, nav, selected_location, user}) => ({car, nav, selected_location, user});

export default connect(mapStateToProps, {setErrors, resetCarInfo, setCarInfo})(SubmitBtn);

