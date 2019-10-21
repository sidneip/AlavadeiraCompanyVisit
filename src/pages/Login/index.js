import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput, View, StyleSheet, Text, Button } from 'react-native';
import { Image } from "react-native-elements";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const Logo = require('./../../assets/logo.png');
import { login } from '../../store/ducks/auth'

// import { Container } from './styles';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.login.bind(this);
  }

  login(){
    this.props.login(this.state.email, this.state.password)
  }
  render() {
    return(
      <View style={styles.container}>
        <Image source={Logo} style={styles.logoImage} />
        <View style={styles.loginForm}>
          <TextInput style={styles.input} placeholder="Login" value={this.state.email}  onChangeText={(text) => this.setState({email: text})}/>
          <TextInput style={styles.input} placeholder="Senha" secureTextEntry={true} value={this.state.password}  onChangeText={(text) => this.setState({password: text})}/>
          <View style={styles.buttonEnter}>
            <Button title="Entrar" onPress={() => this.login()}></Button>
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ login }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    backgroundColor: '#64beb2'
  },
  title: {
    fontSize: 40,
    color: '#8CD7A8',
    shadowColor: "#fff",
    shadowOpacity: 1,
    shadowRadius: 2
  },
  logoImage: {
    marginBottom: 10,
    width: 300,
    height: 100
  },
  input: {
    marginTop: 10,
    width: "80%",
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loginForm: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%'
  },
  buttonEnter: {
    marginTop: 10,
    width: '80%'
  }
})