<template>
  <button
  class="btn"
  v-bind="$attrs">
    <slot name="default"></slot>
  </button>
</template>

<style>
.btn {
  outline: none;
  border: 0;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  background-color: #1D2C6F;
  color: white;
}

.btn:hover {
  background-color: #0A1A54
}
</style>