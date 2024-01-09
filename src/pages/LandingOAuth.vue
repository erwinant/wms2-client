<template>
    <div class="fullscreen bg-green text-white text-center q-pa-md flex flex-center">
        <div>
            <div style="font-size: 10vh">Congratulations!</div>

            <div class="text-h3" style="opacity: 0.4">Merchant now is connected</div>
            <div class="text-h5">You can close this window and refresh data merchant</div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
onMounted(() => {
    console.log(route.params);
});
</script>
