import React,{Component} from 'react' 
import {ScrollView, View, Text} from 'react-native';
import {toUpper} from 'lodash';
import {ListItem, List, Header} from 'react-native-elements';
import * as Icon from '@expo/vector-icons';
import Barcode from 'react-native-barcode-builder';

export default class ActiveTaskListSelected extends Component {
  render() {
   const {selectedTask, onBackPress} = this.props;
    return (
      <View style={{flex: 1}}>
        <Header
          leftComponent={<Icon.Ionicons name='md-arrow-round-back' size={24} color='#fff' onPress={onBackPress} />}
          centerComponent={{ text: selectedTask.status, style: { color: '#fff' } }}
        />
        <ScrollView style={{marginTop: 20, marginBottom: 50}} >
        <View containerStyle={{marginBottom: 20}}>

          <ListItem
            hideChevron
            title={
              <View>
                <Text style={{textAlignVertical: "center",textAlign: "center"}}>{selectedTask.ticket_number || '-'}</Text>
                {selectedTask.ticket_number && <Barcode value={selectedTask.ticket_number}  format="CODE128" />}
              </View>
            }
          />
          
          <ListItem
            hideChevron
            title={selectedTask.guest_name || '-'}
            subtitle='GUEST NAME'
          />
          
          <ListItem
            hideChevron
            title={selectedTask.room_number || '-'}
            subtitle='ROOM NO.'
          />
          
          <ListItem
            hideChevron
            title={selectedTask.driver || '-'}
            subtitle='DRIVER'
          />

          <ListItem
            hideChevron
            title={toUpper(selectedTask.car_make) || '-'}
            subtitle='CAR MAKE'
          />

          <ListItem
            hideChevron
            title={toUpper(selectedTask.car_model) || '-'}
            subtitle='CAR MODEL'
          />

          <ListItem
            hideChevron
            title={toUpper(selectedTask.car_plate_no) || '-'}
            subtitle='CAR PLATE NO'
          />

          <ListItem
            hideChevron
            title={toUpper(selectedTask.car_color) || '-'}
            subtitle='CAR COLOR'
          />
          </View>
        
        </ScrollView>
      </View>
    );
  }
}