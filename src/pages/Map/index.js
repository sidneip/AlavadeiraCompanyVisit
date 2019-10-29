import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
                
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
},
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
                
class Map extends Component {

    constructor(props){
        super(props)
        this.state = {
          latitude: -23.638040,
          longitude: -46.798720
        }
    }

    componentDidMount(){
        // Geolocation.getCurrentPosition(position => {
        //     console.log(position)
        //     this.setState({
        //       latitude: position.coords.latitude,
        //       longitude: position.coords.longitude
        //     })
        // });
    }

  render() {
    const { region } = this.props;
                
    return (
      <View style ={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
          {this.props.visits.map(marker => (
            <MapView.Marker title={marker.customer.name} coordinate={{latitude: marker.address.latitude, longitude: marker.address.longitude}}>
            </MapView.Marker>
          ))}
            
        </MapView>
      </View>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {visits: state.visitReducer.visits}
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({}, dispatch);


export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(Map);
