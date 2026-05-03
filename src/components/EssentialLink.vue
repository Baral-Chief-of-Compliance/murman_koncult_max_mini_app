<template>
  <q-item
    clickable
    :to="props.to"
    tag="a"
  >

    <!-- tag="a"
    :href="props.link"
    target='_blanc' -->
    <q-item-section
      v-if="props.icon"
      avatar
    >
      <q-icon 
        :name="props.icon"
        color="orange"
      />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ props.title }}</q-item-label>
      <q-item-label caption>{{ props.caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>

const props = defineProps({
  title: {
    type: String,
    required: true
  },

  caption: {
    type: String,
    default: ''
  },

  link: {
    type: String,
    default: '#'
  },

  icon: {
    type: String,
    default: ''
  },

  to: {
    type: String,
    default: ''
  }
})
</script>
