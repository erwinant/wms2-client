<template>
    <q-page padding>
        <Breadcrumb title="Full Location">
            <template #right>
                <div>
                    <q-btn color="primary" icon="add" label="Add Warehouse" />
                </div>
            </template>
        </Breadcrumb>
    </q-page>
</template>

<script lang="ts">
import Breadcrumb from 'components/Breadcrumb.vue';
import Filterbox from 'components/Filterbox.vue';
import LocationApi from 'src/api/location';
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'FullLocation',
    components: {
        Breadcrumb,
        // Filterbox,
    },
});
</script>
