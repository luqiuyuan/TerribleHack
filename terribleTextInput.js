import React, { Component } from 'react';
import {  
  TextInput,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

const pi=Math.PI.toString().split('');
export default class TerribleTextInput extends Component{
    constructor(props){
        super(props)
        this.state={
            width:10,
            disbale:false,
            maxLength:0,
            validating:true,
            temperary:0
        }
    }

    render(){
       
        let invalid=(
            <View>       
                <Text>String is not allow</Text>                
            </View>
        )

        let tes=this.state.validating ? null : invalid;

        let reviewInput=(
                        <View>
                            <TextInput
                                style={{height: 40, borderColor: 'gray', borderWidth: 1,width:100}}
                                onChangeText={this._piTextInput.bind(this)}
                            />
                            <View>{tes}</View>
                        </View>
                        )
        
        return(
        <View>
            <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1,width:this.state.width}}
                editable={this.state.disbale}
                maxLength={this.state.maxLength}
            />
            
            <Text>try here</Text>            
           {reviewInput}
        </View>
        )
    }

    _piTextInput(text){
        let tmp;
        try{
            tmp=parseInt(text) || null;
        }catch(e){
            console.warn("Non integer")
        }
        if(text.length >this.state.temperary){
            if(this.checkPi(text)){
                    this.setState({
                        width:this.state.width+20,
                        maxLength:this.state.maxLength+1,
                        disbale:true,
                        temperary:this.state.maxLength
                    })
                }
        }else{
            if(this.checkPi(text)){
                this.setState({
                    width:(this.state.width < 20 ? 10 : this.state.width-20),
                    maxLength:text.length,
                    disbale:this.state.width > 10,
                    temperary:this.state.maxLength
                })
            }
        }
        
        return tmp
    }

   checkPi(text){
     for(i=0;i<text.length;i++ ){
        if(text[i]!=pi[i]){
            return false
        }
    }
    return true
   }
}
        
/**
 * <View>
                    <Text>Oops you can type in to endure the length of your input </Text>
                </View>
            }
 */
        
