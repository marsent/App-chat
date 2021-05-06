import React, { useState, useCallback } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider';
import { IoSend } from 'react-icons/all'
export default function OpenConversation() {
  const [text, setText] = useState('')
  const setRef = useCallback(node => {
    if (node) {
      node.scrollIntoView({ smooth: true })
    }
  }, [])
  const { sendMessage, selectedConversation } = useConversations()

  function handleSubmit(e) {
    e.preventDefault()

    sendMessage(
      selectedConversation.recipients.map(r => r.id),
      text
    )
    setText('')
  }

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
          {selectedConversation.messages.map((message, index) => {
            const lastMessage = selectedConversation.messages.length - 1 === index
            return (
              <div
                ref={lastMessage ? setRef : null}
                key={index}
                className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}
              >
                <div
                  style={{ height: "45px", display: 'flex', alignItems: 'center' }}
                  className={`rounded px-2 py-1 ${message.fromMe ? 'bg-primary text-white' : 'border'}`}>
                  {message.text}
                </div>
                <div className={`text-muted small ${message.fromMe ? 'text-right' : ''}`}>
                  {message.fromMe ? 'You' : message.senderName}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2" style={{ display: 'flex', justifyContent: 'space-around' }}>
          <InputGroup style={{ width: "95%" }}>
            <Form.Control
              as="textarea"
              required
              value={text}
              onChange={e => setText(e.target.value)}
              style={{ height: '40px', resize: 'none', borderRadius: "20px", marginRight: '1rem' }}
            />
            <InputGroup.Append>
              <Button type="submit" style={{ backgroundColor: 'transparent', border: 'none' }}><IoSend style={{ color: "#115DCD", fontSize: '1.7rem' }} /></Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  )
}
