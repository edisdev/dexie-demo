<template>
  <div
    v-for="user in userList"
    :key="user.username">
    <User :user="user"/>
  </div>
</template>

<script setup>
import { liveQuery } from 'dexie'
import { onBeforeUnmount, onMounted, ref } from 'vue'
//
import { createBulk, UserTable } from '@/database/models/User'
//
import User from '@/components/User.vue'

const userList = ref([])

const userObservable = liveQuery(() => {
  return UserTable.orderBy('username').toArray()
})

const subscription = userObservable.subscribe({
  next: result =>  userList.value = result,
  error: error => console.error(error),
  start: (e) => {
    console.log('start subscribe', e)
  }
});

onMounted(() => {
  fetch('https://jsonplaceholder.typicode.com/users/')
  .then(async (response) => {
    const users = await response.json()
    await createBulk(users)
  })
})

onBeforeUnmount(() => {
  subscription.unsubscribe()
})
</script>