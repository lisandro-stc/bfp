import React, { Component } from 'react';
import { Alert, View, ScrollView, Text } from 'react-native';
import { Header, List, ListItem, Icon } from 'react-native-elements';
import axios from 'axios';
import { connect } from 'react-redux';
import { toUpper } from 'lodash';
import Barcode from 'react-native-barcode-expo';
import { setValidationActiveTask } from '../actions';
import { errorHandler } from '../utilities';
import { UPDATE_VALIDATION_TASK_URL, HOME_NAV } from '../constants';

class ValidationActiveTask extends Component {
  state = {
    loading: false,
    isInitialValidationCount: false,
    options: [
      { key: 'validation', label: 'VALIDATION' },
      { key: 'executive comp', label: 'EXECUTIVE COMP' }
    ],
  }

  componentDidMount() {
    const { active_task } = this.props.validation_list;
    const isInitialValidationCount = active_task.validation_count == -1;
    this.setState({ ...this.state, isInitialValidationCount });
  }

  render() {
    const { active_task } = this.props.validation_list;
    return (
      <View style={{ flex: 1 }}>
        <Header
          leftComponent={<Icon name='md-arrow-round-back' type='ionicon' color='#fff' onPress={this._onBackBtnPress} />}
          centerComponent={{ text: active_task.ticket_number || '-', style: { color: '#fff' } }}
        />

        <ScrollView keyboardShouldPersistTaps={'handled'}
          style={{ marginTop: 20 }}
        >
          <List containerStyle={{ marginBottom: 20 }}>
            <ListItem
              hideChevron
              title={
                <View>
                  <Text style={{ textAlignVertical: "center", textAlign: "center" }}>{active_task.ticket_number || '-'}</Text>
                  {active_task.ticket_number && <Barcode value={active_task.ticket_number} format="CODE128" />}
                </View>
              }
            />

            <ListItem
              hideChevron
              title={active_task.guest_name || '-'}
              subtitle='GUEST NAME'
            />

            <ListItem
              hideChevron
              title={active_task.room_number || '-'}
              subtitle='ROOM NO.'
            />

            <ListItem
              hideChevron
              title={active_task.ori_checkin_date}
              subtitle='CHECKIN DATE'
            />

            <ListItem
              hideChevron
              title={active_task.ori_checkout_date || '-'}
              subtitle='CHECKOUT DATE'
            />

            <ListItem
              hideChevron
              title={toUpper(active_task.car_make) || '-'}
              subtitle='CAR MAKE'
            />

            <ListItem
              hideChevron
              title={toUpper(active_task.car_model) || '-'}
              subtitle='CAR MODEL'
            />

            <ListItem
              hideChevron
              title={toUpper(active_task.car_plate_no) || '-'}
              subtitle='CAR PLATE NO'
            />

            <ListItem
              hideChevron
              title={toUpper(active_task.car_color) || '-'}
              subtitle='CAR COLOR'
            />

            <ListItem
              hideChevron
              title={active_task.validation_count || '-'}
              subtitle='VALIDATION COUNT LEFT'
            />

            <ListItem
              hideChevron
              title={active_task.type || '-'}
              subtitle='TYPE'
            />

            <ListItem
              hideChevron
              title={active_task.comment || '-'}
              numberOfLines={null}
              subtitle='COMMENT'
            />
          </List>
          <View style={{ height: 200 }} />
        </ScrollView>
      </View>
    );
  }

  _onBackBtnPress = () => {
    this.props.setValidationActiveTask(null)
  }

  _updateTask = () => {
    Alert.alert(
      'Task Confirmation',
      'Click ok to confirm action?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: this._onUpdateTaskConfirm },
      ]
    );
  }

  _onPickerChangeVal = (type) => {
    this.props.setValidationActiveTask({ itemValue })
  }

  _onUpdateTaskConfirm = () => {
    let { validation_count } = this.props.validation_list.active_task;
    validation_count = parseInt(validation_count);

    const isValidValidationCount = validation_count > -1;

    if (!isValidValidationCount) {
      alert('Invalid validation count input. Must be numeric and non negative numbers');
      return;
    }

    this.setState({ loading: true });
    axios.post(UPDATE_VALIDATION_TASK_URL, this.props.validation_list.active_task)
      .then(this._processUpdateTaskResponse)
      .catch(errorHandler)
      ;
  }

  _processUpdateTaskResponse = ({ data }) => {
    const { nav, setValidationActiveTask } = this.props;

    this.setState({ loading: false });
    setValidationActiveTask(null);
    nav.navigate(HOME_NAV);
  }
}

const stateToProps = ({ validation_list, nav }) => ({ validation_list, nav });

export default connect(stateToProps, { setValidationActiveTask })(ValidationActiveTask);