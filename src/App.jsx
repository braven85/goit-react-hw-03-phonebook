import "./App.css";
import React from "react";

import { nanoid } from "nanoid";
import { Repository } from "./components/Repository/Repository";
import HorizontalLine from "./components/HorizontalLine/HorizontalLine";
import PropTypes from "prop-types";

import ContactForm from "./components/ContactForm/ContactForm";
import ContactsList from "./components/ContactsList/ContactsList";
import { Filter } from "./components/Filter/Filter";

class App extends React.Component {
  state = {
    contacts: [],
    filter: "",
  };

  addContact = ({ name, number }) => {
    const { contacts } = this.state;
    const contact = { id: nanoid(), name, number };
    contacts.some((el) => el.name === name)
      ? alert(`${name} is already on the contacts list`)
      : this.setState(({ contacts }) => ({
          contacts: [contact, ...contacts],
        }));
  };

  getContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter)
    );
  };

  filterContacts = (e) => {
    const value = e.target.value.toLowerCase();
    this.setState({ filter: value });
  };

  removeContact = (id) => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter((contact) => contact.id !== id),
    }));
  };

  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;
    if (nextContacts !== prevContacts) {
      localStorage.setItem("contacts", JSON.stringify(nextContacts));
    }
  }

  render() {
    const getContacts = this.getContacts();
    return (
      <div className="App">
        <Repository />
        <HorizontalLine />
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <HorizontalLine />
        <h1>Contacts</h1>
        <Filter filter={this.filterContacts} />
        <ContactsList
          contacts={getContacts}
          removeContact={this.removeContact}
        />
      </div>
    );
  }
}

export default App;

App.propTypes = {
  contacts: PropTypes.array,
  filter: PropTypes.string,
};
