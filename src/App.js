import React, { Component, createRef } from 'react';
import './App.css';
import './animations.css'
import Formulaire from './components/Formulaire';
import Message from './components/Message'
//Firebase
import base from './base';
//Animation
import { CSSTransition, TransitionGroup } from 'react-transition-group';


class App extends Component {
  state = {
    messages: {},
    pseudo: this.props.match.params.pseudo
  }

  messagesRef = createRef();                //Manipulation du DOM avec react

  componentDidMount() {                     //Quand le state est monté
    base.syncState('/', {
      context: this,
      state: 'messages'
    })
  }

  componentDidUpdate() {                    //Quand le state se met a jour
    const ref = this.messagesRef.current;   //current fait reference a notre ref actuelle cest a dire qu'on recupere notre div
    ref.scrollTop = ref.scrollHeight;
  }

  addMessage = message => {
    const messages = {...this.state.messages};
    messages[`message-${Date.now()}`] = message;
    Object.keys(messages).slice(0, -10).forEach(key => { messages[key] = null });   //Garde seulement les 10 derniers messages
    this.setState({ messages });
  }

  isUser = pseudo => pseudo === this.state.pseudo;



  render () {
    const messages = Object.keys(this.state.messages).map(key => ( 
                                                                    <CSSTransition timeout={200} classNames='fade' key={key}>
                                                                      <Message message={this.state.messages[key].message} pseudo={this.state.messages[key].pseudo} isUser={this.isUser} /> 
                                                                    </CSSTransition> 
                                                                  ));


    return (
      <div className='box'>
        <div>
          <div className="messages" ref={this.messagesRef}>
            <TransitionGroup className="message">
              {messages}
            </TransitionGroup>
          </div>
        </div>
        <Formulaire addMessage={this.addMessage} pseudo={this.state.pseudo} length={140} />
      </div>
    )
  }
}

export default App
