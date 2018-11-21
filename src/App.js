import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListContacts from './ListContacts';
import CreateContact from './CreateContact';
import * as ContactsAPI from './utils/ContactsAPI';
import './App.css';

class App extends Component {
  state = {
    contacts: []
  }
  componentDidMount() {
    ContactsAPI.getAll().then(contacts => {
      this.setState({ contacts })
    })
  }
  removeContact = contact => {
    this.setState(state => ({
      contacts: state.contacts.filter(item => item.id !== contact.id)
    }))

    ContactsAPI.remove(contact)
  }
  createContact(contact) {
    ContactsAPI.create(contact).then(contact => {
      this.setState(state => ({
        contacts: state.contacts.concat([ contact ])
      }))
    })
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <ListContacts
            onDeleteContact={this.removeContact}
            contacts={this.state.contacts}
          ></ListContacts>
        )}>
        </Route>
        <Route path='/create' render={({ history }) => (
          <CreateContact
            onCreateContact={contact => {
              this.createContact(contact)
              history.push('/')
            }}>
          </CreateContact>
        )}>
        </Route>
      </div>
    );
  }
}

export default App
