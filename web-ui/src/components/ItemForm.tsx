import { Form, ButtonToolbar, Button } from 'rsuite'
import { Item, NewItem } from '../types'

type ItemFormProps = {
  onCancel: () => any,
  onSave: (item: NewItem) => any,
  initialValue?: Item,
}

function ItemForm({ onCancel, onSave, initialValue }: ItemFormProps) {
  const handleSubmitClickEvent = (_: any, event: any) => {
    const name = event.target[0].value
    const description = event.target[1].value

    onSave({ name, description })
  }

  const handleCancelClickEvent = (event: any) => {
    onCancel()
  }

  return (
    <Form fluid onSubmit={handleSubmitClickEvent}>
      <Form.Group controlId="item-name">
        <Form.ControlLabel>Name</Form.ControlLabel>
        <Form.Control name="item-name" defaultValue={initialValue?.name} />
        <Form.HelpText>Required</Form.HelpText>
      </Form.Group>
      <Form.Group controlId="item-description">
        <Form.ControlLabel>Description</Form.ControlLabel>
        <Form.Control name="item-description" defaultValue={initialValue?.description} />
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

export default ItemForm
