import Dexie from 'dexie'

const DB = new Dexie('DemoDB')

DB.version(1).stores({
  users: '++id,username'
})

DB.close()

DB.version(1.1).stores({
  users: '++id, uniqId, username',
  notes: '++id'
})

export default DB