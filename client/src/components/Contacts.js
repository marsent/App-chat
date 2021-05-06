import React from 'react'
import { ListGroup, Button } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider';
import { BsFillTrashFill } from 'react-icons/all'
import { useConversations } from '../contexts/ConversationsProvider'
export default function Contacts() {
  const { contacts, deleteContact } = useContacts();
  const { deleteConversations } = useConversations();
  const handleDelete = (id) => {
    let confirm = window.confirm('Are you sure you wish to delete this conversation?');
    if (confirm == true) {
      deleteContact(id);
      deleteConversations(id);
    }
  }

  return (
    <ListGroup variant="flush">
      {contacts.map(contact => (
        <ListGroup.Item key={contact.id} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' }}>
          {contact.name}
          <Button style={{ border: 'none', backgroundColor: 'transparent', color: 'black' }} onClick={() => handleDelete(contact.id)}>
            <BsFillTrashFill />
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}
