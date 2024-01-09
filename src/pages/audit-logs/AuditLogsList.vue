<template>
    <q-page padding>
        <Breadcrumb title="Audit Logs List"> </Breadcrumb>

        <Filterbox :fields="initialFilter" @find="findFilter" />

        <q-table
            flat
            bordered
            class="rounded-md"
            table-header-class="text-subtitle1"
            :rows="rows"
            :columns="columns"
            row-key="name"
            :visible-columns="visibleColumns"
            v-model:pagination="pagination"
            :loading="loading"
            @request="onRequest"
        >
            <template v-slot:header="props">
                <q-tr :props="props">
                    <q-th auto-width />
                    <q-th v-for="col in props.cols" :key="col.name" :props="props">
                        {{ col.label }}
                    </q-th>
                </q-tr>
            </template>
            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td auto-width>
                        <q-btn
                            size="sm"
                            color="accent"
                            round
                            dense
                            @click="props.expand = !props.expand"
                            :icon="props.expand ? 'remove' : 'add'"
                        />
                    </q-td>
                    <q-td v-for="col in props.cols" :key="col.name" :props="props">
                        {{ col.value }}
                    </q-td>
                </q-tr>
                <q-tr v-show="props.expand" :props="props">
                    <q-td colspan="100%">
                        <pre>
              <span class="inner-pre" style="font-size: 11px">
              {{ props.row.synch_data }}
              </span>
            </pre>
                    </q-td>
                </q-tr>
            </template>
        </q-table>
    </q-page>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import Breadcrumb from 'components/Breadcrumb.vue';
import Filterbox from 'components/Filterbox.vue';
import { AuditLogsApi } from 'src/api';

const columns = [
    {
        name: 'synch_data',
        align: 'left',
        label: 'Synch Data',
        field: 'synch_data',
        sortable: true,
    },
    {
        name: 'channel',
        align: 'left',
        label: 'Channel',
        field: 'channel',
        sortable: true,
    },
    { name: 'type', align: 'left', label: 'Type', field: 'type', sortable: true },
    {
        name: 'order_id',
        align: 'left',
        label: 'Order Id',
        field: 'order_id',
        sortable: true,
    },
    {
        name: 'order_status',
        align: 'left',
        label: 'Order Status',
        field: 'order_status',
        sortable: true,
    },
];

const filterBox = [
    { name: 'type', type: 'text', label: 'Type' },
    { name: 'channel', type: 'text', label: 'Channel' },
    { name: 'order_status', type: 'text', label: 'Order Status' },
];

const rows = ref([]);
const visibleColumns = ref(['type', 'channel', 'order_id', 'order_status']);
const loading = ref(false);
const pagination = ref({
    filter: {},
    sortBy: 'created_at',
    page: 1,
    rowsPerPage: 10,
    rowsNumber: 10,
});
const initialFilter = reactive(filterBox);

const onRequest = (props) => {
    const { page, rowsPerPage, sortBy, descending } = props.pagination;
    getData(page, rowsPerPage, sortBy);
};

const findFilter = (e) => {
    pagination.value.filter = e;
    getData(1, pagination.value.rowsPerPage, 'created_at');
};

const getData = async (page, pageSize, sort) => {
    const filter = { ...pagination.value.filter };
    loading.value = true;
    const result = await Promise.all([
        AuditLogsApi.get({
            params: {
                filter: filter,
                // sort: sort,
                skip: (page - 1) * pageSize,
                limit: pageSize,
                dummy: Math.random(),
            },
        }),
        AuditLogsApi.count({
            params: { filter: filter },
        }),
    ]);
    loading.value = false;

    rows.value = result[0].data;
    pagination.value.rowsNumber = result[1].data;
    pagination.value.page = page;
    pagination.value.rowsPerPage = pageSize;
    pagination.value.sortBy = sort.replace('-', '');
    pagination.value.descending = sort.indexOf('-') > -1 ? true : false;
};

onMounted(() => {
    getData(1, 20, pagination.value.sortBy);
});
</script>
