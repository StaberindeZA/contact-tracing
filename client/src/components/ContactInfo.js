import React from 'react';

const ContactInfoDisplay = (props) => {
  return (
    <div>
        <h2>Contact Information</h2>
        <div>
          <label>
            Number of Contacts: 
            <span>{props.contactTotal}</span>
          </label>
          <br />
          <label>
            Positive Contacts: 
            <span>{props.contactPositiveTotal}</span>
          </label>
        </div>
      </div>
  )
}


class ContactInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contactTotal: 10,
      contactPositiveTotal: 0,
    };
  }
  
  render () {
    return (
      <ContactInfoDisplay 
        contactTotal={this.state.contactTotal}
        contactPositiveTotal={this.state.contactPositiveTotal}
      />
    )
  }
}

export default ContactInfo;