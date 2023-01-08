import DB from "../index"

export const UserTable = DB.table('users')

export function getModel () {
  return {
    id: null,
    uniqId: null,
    name: '',
    username: '',
    website: ''
  }
}

export function prepareUserModel (data) {
  const UserModel = getModel()

  UserModel.uniqId = data.id
  UserModel.id = data.id
  UserModel.name = data.name
  UserModel.username = data.username
  UserModel.website = data.website


  return UserModel
}

export function create (item) {
  const ModelData = prepareUserModel(item)
  return UserTable.put(ModelData)
}

export function createBulk (items) {
  const List = items.map(item => prepareUserModel(item))

  return UserTable.bulkPut(List)
}

export function update (item) {
  const ModelData = prepareUserModel(item)
  return UserTable.update(ModelData.id, ModelData)
}

export function remove (id) {
  return UserTable.delete(id)
}