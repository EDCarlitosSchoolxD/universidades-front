import { Button, Label, Modal, TextInput } from 'flowbite-react'
import React from 'react'

export const FormModal = (props:any) => {
  return (
  <Modal className=''
    show={props.show}
    size={props.size?props.size:"xl"}
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
