import { Button, Label, Modal, TextInput } from 'flowbite-react'
import React from 'react'

export const FormModal = (props:any) => {
  return (
  <Modal
    show={props.show}
    size="md"
    popup={true}
    onClose={props.onClose}
  >
    <Modal.Header />
    <Modal.Body>
        {props.children}
    </Modal.Body>
  </Modal>
  )
}
