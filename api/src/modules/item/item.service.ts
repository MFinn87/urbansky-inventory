const createMany = () => []

const findMany = () => []

const findOneById = async (id: string) => {
  return null
}

const updateOne = (_item: any) => null

const deleteOneById = (_id: string) => {
  return {
    result: 'Ok',
  }
}

export default {
  createMany,
  deleteOneById,
  findMany,
  findOneById,
  updateOne,
}
