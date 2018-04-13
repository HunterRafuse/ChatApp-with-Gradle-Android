import React from 'react';

import {GiftedChat} from 'react-native-gifted-chat';
import Backend from '../Backend';
class Home extends React.Component {
  state = {
    messages: []
  };
  //lifecycle called
  componentWillMount() {
    
  }
  render() {
    return(
      <GiftedChat 
        messages={this.state.messages}
        onSend={(message) => {
          //send message to backend
          Backend.sendMessage(message);
        }}
        user={{
          _id: Backend.getUid(),
          name: this.props.name,
        }}
      />
    );
  }
  componentDidMount(){
    Backend.loadMessages((message) => {
      this.setState((previousState) => {
        return {
          messages: GiftedChat.append(previousState.messages, message),
        };
      });
    });
  }
  //end lifecycle
  componentWillUnmount() {
    Backend.closeChat();
  }
}

Chat.defaultProps = {
  name: 'John',
};
//only allow strings for name
Chat.propTypes = {
  name: React.PropTypes.string,
};

export default Home;
