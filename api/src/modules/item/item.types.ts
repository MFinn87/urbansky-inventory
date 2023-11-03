import { Static } from '@sinclair/typebox'
import ItemModel from './item.model'
import { createRelatedModels } from '../../lib/models'

const [NewItemModel, UpdateItemModel] = createRelatedModels(ItemModel)

export type Item = Static<typeof ItemModel>
export type NewItem = Static<typeof NewItemModel>
export type UpdateItem = Static<typeof UpdateItemModel>
