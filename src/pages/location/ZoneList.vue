<template>
    <q-page padding>
        <Breadcrumb title="Zones">
            <template #right>
                <div>
                    <q-btn color="primary" icon="add" label="Add Zone" @click="addZone" />
                </div>
            </template>
        </Breadcrumb>

        <q-table
            flat
            bordered
            class="rounded-md"
            table-header-class="text-subtitle1"
            :rows="rows"
            :columns="columns"
            row-key="_id"
            :pagination="pagination"
            :loading="loading"
            @request="onRequest"
        >
            <template v-slot:top-right>
                <q-input outlined dense debounce="300" v-model="filter" placeholder="Search">
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </template>
        </q-table>

        <q-dialog v-model="dialogAdd" persistent>
            <q-card style="width: 400px">
                <q-card-section class="row items-center q-gutter-md">
                    <div class="text-subtitle1 text-weight-bold text-capitalize">{{ mode }} Zones</div>
                    <q-space />
                    <q-btn dense flat round icon="close" v-close-popup />
                </q-card-section>
                <q-separator />
                <q-card-section>
                    <form @submit.prevent="onSave" @reset.prevent="onReset" class="q-gutter-md">
                        <q-input v-model="zone.name" outlined type="text" label="Name" />
                        <q-input v-model="zone.code" outlined type="text" label="Code" />
                        <div class="row items-center justify-end">
                            <q-btn type="reset" flat label="Cancel" color="primary" v-close-popup />
                            <q-btn type="submit" flat label="Save" color="primary" />
                        </div>
                    </form>
                </q-card-section>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import Breadcrumb from 'components/Breadcrumb.vue';
import { defineComponent } from 'vue';

const columns = [
    {
        name: 'name',
        required: true,
        label: 'Zones Name',
        align: 'left',
        field: (row) => row.name,
        format: (val) => `${val}`,
        sortable: true,
    },
    { name: 'code', align: 'left', label: 'code', field: 'code', sortable: true },
    {
        name: 'action',
        label: 'Action',
        field: 'action',
    },
];

export default defineComponent({
    name: 'ZoneList',
    components: {
        Breadcrumb,
    },
    setup() {
        const rows = ref([]);
        const loading = ref(false);
        const dialogAdd = ref(false);
        const mode = ref('create');

        const zone = ref({
            name: null,
            code: null,
        });

        const onRequest = () => {};

        return {
            rows,
            columns,
            loading,
            dialogAdd,
            zone,
            mode,
            onRequest,
            addZone: () => {
                dialogAdd.value = true;
            },
        };
    },
});
</script>
