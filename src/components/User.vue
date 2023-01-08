<template>
  <div class="UserContent">
    <div class="User">
      <div class="userId">{{ user.id }}</div>
      <div class="username">{{ user.username }}</div>
      <div class="name">{{ user.name }}</div>
      <div class="website">{{ user.website }}</div>
      <div class="actions">
        <Btn
         type="button"
         class="item"
         @click="toogleEditMode">
         {{ toogleText }}
        </Btn>
        <Btn
        type="button"
        class="item"
        @click="deleteUser">
        Delete
        </Btn>
      </div>
    </div>
    <div class="UserInput" v-if="editMode">
      <input
        type="text"
        :name="user.username"
        v-model="name"
      >
      <Btn
        type="button"
        @click="saveChange">
        Save
      </Btn>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref, watch, computed } from 'vue'
import { 
  update as UserUpdate,
  remove as removeUser
} from '@/database/models/User'
//
import Btn from './Btn.vue'

const props = defineProps({
  user: { type: Object, default: () => ({}) }
})

const editMode = ref(false)
const name = ref('')

const userFullName = computed(() => {
  return props.user?.name || ''
})
const toogleText = computed(() => {
  return editMode.value ? 'Close' : 'Open'
})

function toogleEditMode () {
  editMode.value = !editMode.value
}

async function deleteUser() {
  await removeUser(props.user.id)
  editMode.value = false
}
async function saveChange () {
  await UserUpdate({ ...props.user, name: name.value })
  editMode.value = false
}

function setName (value) {
  name.value = value
}

watch(() => userFullName.value, (fullName) => {
  setName(fullName)
})

onBeforeMount(() => {
  setName(userFullName.value)
})
</script>

<style>
.UserContent {
  border-bottom: 1px solid silver;
  padding: 20px;
}
.User {
  display: grid;
  grid-template-columns: repeat(4, 1fr) 130px;
  font-weight: 500;
}

.User .actions {
  display: flex;
  border-left: 1px solid silver;
  height: 100%;
}

.User .actions .item {
  margin-right: 10px;
  margin-left: 10px;
}

.UserInput{
  width: 100%;
  padding: 10px;
}

.UserInput input {
  width: 90%;
  height: 35px;
  margin-right: 10px;
  text-indent: 10px;
}
</style>