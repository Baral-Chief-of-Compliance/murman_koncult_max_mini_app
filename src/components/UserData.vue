<template>
    <div class="column text-center flex q-mb-md justify-center">
        <div class="text-blue text-h5 ">{{ props.name }}</div>
        <div>
            <q-avatar v-if="props.photoUrl !== null">
                <img :src="props.photoUrl" />
            </q-avatar>
            <q-avatar 
                color="blue-5"
                icon="person"
                text-color="indigo-7"
            v-else />
        </div>

    </div>
</template>

<script setup>

const props = defineProps({
    name: {
        type: String,
        default: 'Имя Пользователя'
    },

    photoUrl: {
        type: String,
        default: null
    }
})

</script>