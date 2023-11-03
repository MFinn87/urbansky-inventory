import { ButtonToolbar, Button, Form } from 'rsuite'
import { Item, NewInventory } from '../types'

type InventoryFormProps = {
  item: Item,
  onCancel: () => any,
  onSave: (inventory: NewInventory) => any,
}

function InventoryForm({ item, onCancel, onSave }: InventoryFormProps) {
  const handleSubmitClickEvent = (_: any, event: any) => {
    const serial = event.target[0].value

    onSave({ item, serial })
  }

  const handleCancelClickEvent = (event: any) => {
    onCancel()
  }

  return (
    <Form fluid onSubmit={handleSubmitClickEvent}>
      <Form.Group controlId="inputPicker">
        Create Inventory For: { item.name }
      </Form.Group>
      <Form.Group controlId="inventory-serial">
        <Form.ControlLabel>Serial Number</Form.ControlLabel>
        <Form.Control name="inventory-serial" />
        <Form.HelpText>Required</Form.HelpText>
      </Form.Group>
      <Form.Group>
        <ButtonToolbar>
          <Button appearance="primary" type="submit">Submit</Button>
          <Button appearance="default" onClick={handleCancelClickEvent}>Cancel</Button>
        </ButtonToolbar>
      </Form.Group>
    </Form>
  )
}

export default InventoryForm
