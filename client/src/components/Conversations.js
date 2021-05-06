import React from 'react'
import { ListGroup, ButtonToolbar, Button } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider';
import { BsFillTrashFill } from 'react-icons/all'
export default function Conversations() {
  const { conversations, selectConversationIndex, deleteConversationsByIndex } = useConversations();
  const handleDetete = (index) => {
    let confirm = window.confirm('Are you sure you wish to delete this conversation?');
    if (confirm == true) {
      deleteConversationsByIndex(index)
    }

  }
  return (
    <ListGroup variant="flush">
      {conversations.map((conversation, index) => (
        <ButtonToolbar style={{ display: 'flex', flexDirection: 'row', borderBottomWidth: 1 }}>
          <ListGroup.Item style={{ width: "82%" }}
            key={index}
            action
            onClick={() => selectConversationIndex(index)}
            active={conversation.selected}
          >
            {conversation.recipients.map(r => r.name).join(', ')}
          </ListGroup.Item>
          <Button style={{ backgroundColor: 'transparent', color: 'black', border: 'none' }} onClick={() => handleDetete(index)}> <BsFillTrashFill /></Button>
        </ButtonToolbar>
      ))}
    </ListGroup>
  )
}
