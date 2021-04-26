import { Component } from 'react';
import { v4 as randomID } from 'uuid';

import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import Container from './components/Container';

import styles from './App.module.scss';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addNewContact = (name, number) => {
    const contact = {
      id: randomID(),
      name,
      number,
    };

    const { contacts } = this.state;

    if (!name || !number) {
      alert('Please enter the correct name and number');
      return;
    }

    contacts.find(({ name }) => name === contact.name)
      ? alert(`${name} is already in contacts`)
      : this.setState(({ contacts }) => ({
          contacts: [contact, ...contacts],
        }));
  };

  handleChangeFilter = event => {
    this.setState({
      filter: event.currentTarget.value,
    });
  };

  getContactsToShow = () => {
    const { filter, contacts } = this.state;

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  handleDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { filter } = this.state;
    const contactsToShow = this.getContactsToShow();

    return (
      <Container>
        <div className={styles.phoneBookWrapper}>
          <h1 className={styles.title}>Phonebook</h1>
          <ContactForm onSubmit={this.addNewContact} />
        </div>
        <div className={styles.contactsWrapper}>
          <h2 className={styles.titleContacts}>Contacts</h2>
          <Filter value={filter} onChangeFilter={this.handleChangeFilter} />
          <ContactList
            contacts={contactsToShow}
            onDeleteContact={this.handleDeleteContact}
          />
        </div>
      </Container>
    );
  }
}

export default App;
