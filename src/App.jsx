import { useState } from 'react'
import './App.css'

// Initial contacts data
const initialContacts = [
  { id: 1, name: 'Priya Sharma', email: 'priya.sharma@example.com', phone: '+91 98765 43210' },
  { id: 2, name: 'Raj Patel', email: 'raj.patel@example.com', phone: '+91 87654 32109' },
  { id: 3, name: 'Anita Singh', email: 'anita.singh@example.com', phone: '+91 76543 21098' },
]

function App() {
  const [contacts, setContacts] = useState(initialContacts)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [newContact, setNewContact] = useState({
    name: '',
    email: '',
    phone: ''
  })

  // Filter contacts based on search term
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Handle adding a new contact
  const handleAddContact = (e) => {
    e.preventDefault()
    if (newContact.name.trim() === '') {
      alert('Please enter a name')
      return
    }

    const contact = {
      id: contacts.length + 1,
      name: newContact.name,
      email: newContact.email,
      phone: newContact.phone
    }

    setContacts([...contacts, contact])
    setNewContact({ name: '', email: '', phone: '' })
    setShowAddForm(false)
  }

  // Handle input changes for new contact
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewContact({
      ...newContact,
      [name]: value
    })
  }

  return (
    <div className="app">
      <div className="container">
        <header>
          <h1>Contact List</h1>
        </header>

        <div className="search-section">
          <input
            type="text"
            placeholder="Search contacts by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="add-contact-section">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="add-button"
          >
            {showAddForm ? 'Cancel' : '+ Add Contact'}
          </button>

          {showAddForm && (
            <form onSubmit={handleAddContact} className="add-form">
              <input
                type="text"
                name="name"
                placeholder="Name *"
                value={newContact.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={newContact.email}
                onChange={handleInputChange}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={newContact.phone}
                onChange={handleInputChange}
              />
              <button type="submit" className="submit-button">Add Contact</button>
            </form>
          )}
        </div>

        <div className="contacts-section">
          {filteredContacts.length === 0 ? (
            <div className="no-results">
              {searchTerm ? `No contacts found for "${searchTerm}"` : 'No contacts available'}
            </div>
          ) : (
            <div className="contacts-list">
              {filteredContacts.map(contact => (
                <div key={contact.id} className="contact-card">
                  <div className="contact-name">{contact.name}</div>
                  {contact.email && (
                    <div className="contact-info">
                      <span className="contact-label">Email:</span> {contact.email}
                    </div>
                  )}
                  {contact.phone && (
                    <div className="contact-info">
                      <span className="contact-label">Phone:</span> {contact.phone}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App

