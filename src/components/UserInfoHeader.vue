<template>
    <q-img
        class="absolute-top"
        src="backGround.png"
        style="height: 150px"
    >
        <div class="absolute-bottom bg-transparent">

        <q-avatar v-if="props.photoUrl" size="56px" class="q-mb-sm">
            <img :src="props.photoUrl" />
        </q-avatar>

        <q-avatar
            v-else
            size="56px"
            color="blue-5"
            icon="person"
            text-color="indigo-7"
        />

        <div class="text-weight-bold">{{ props.fullName }}</div>
        </div>
    </q-img>
</template>

<script setup>

const props = defineProps({
    fullName: {
        type: String,
        default: 'Пользователь'
    },

    photoUrl: {
        type: String,
        default: null
    }
})

</script>