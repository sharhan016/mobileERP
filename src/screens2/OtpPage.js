import React from 'react';
import { StyleSheet } from 'react-native';
import { Content, Item, Input,Text, Button } from 'native-base';
import { Grid, Col } from 'react-native-easy-grid';

class OtpInputs extends React.Component {
    static navigationOptions  = ({ navigation }) =>({header:null}); 
    state={
        otp:[]
    };
    getOtp(otp) {
        console.log('getOtp() = ' + otp);
        this.setState({ otp });
  }
    otpTextInput = [];

    componentDidMount() {
        this.otpTextInput[0]._root.focus();
    }

    renderInputs() {
        const inputs = Array(6).fill(0);
        const txt = inputs.map(
            (i, j) => <Col key={j} style={styles.txtMargin}><Item regular>
                <Input
                    style={[styles.inputRadius, { borderRadius: 10, }]}
                    keyboardType="numeric"
                    onChangeText={v => this.focusNext(j, v)}
                    onKeyPress={e => this.focusPrevious(e.nativeEvent.key, j)}
                    ref={ref => this.otpTextInput[j] = ref}
                />
            </Item></Col>
        );
        return txt;
    }

    focusPrevious(key, index) {
        if (key === 'Backspace' && index !== 0)
            this.otpTextInput[index - 1]._root.focus();
    }

    focusNext(index, value) {
        if (index < this.otpTextInput.length - 1 && value) {
            this.otpTextInput[index + 1]._root.focus();
        }
        if (index === this.otpTextInput.length - 1) {
            this.otpTextInput[index]._root.blur();
        }
        const otp = this.state.otp;
        console.log('index =   '+index)
        otp[index] = value;
        this.setState({ otp }, console.log('inside setState  '+ otp));
        this.getOtp(otp.join(''));
    }


    render() {
        return (
          
             <Content padder >
                 <Content style={styles.infoContainer} >
                 <Content style={{height:  100}} ></Content>
                     <Text style={styles.otpText}>Enter One Time Password</Text>
                     <Content style={{height:  50}} ></Content>
                     <Text style={styles.subText}>Please wait a 6 digit OTP will receive in your device shortly</Text>
                 </Content>
                <Grid style={styles.gridPad}>
                    {this.renderInputs()}
                </Grid>
                <Content padder>
                <Button style={styles.buttonStyle} onPress={ () => this.props.navigation.navigate('dashboard')}>
                    <Text style={{textAlign: 'center'}}>VERIFY</Text>
                </Button>
                </Content>
             </Content>
           
        );
    }
}

const styles = StyleSheet.create({
    gridPad: { padding: 30 },
    txtMargin: { margin: 3 },
    inputRadius: { textAlign: 'center' },
    infoContainer: {
        height: 300,
        

    },
    container:{ 
        alignItems: 'center',
        padding: 20,
        margin: 20,
    },
    otpText:{
        textAlign: 'center',
        fontSize: 30,
        color: '#21292F'
    },
    subText:{
        textAlign: 'center',
        fontWeight: '600',
        color: '#777C86'
    },
    buttonStyle:{
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%"
        
    },
});

export default OtpInputs;