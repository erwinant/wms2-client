<template>
    <q-page padding>
        <Breadcrumb title="Merchant List">
            <template #right>
                <div>
                    <q-btn color="primary" icon="add" label="Register Merchant" @click="openDialogAddMerchant(null)" />
                </div>
            </template>
        </Breadcrumb>

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
            <template v-slot:body-cell-action="props">
                <q-td :props="props">
                    <div class="row inline no-wrap q-gutter-xs">
                        <q-btn
                            v-if="props.row.status === 'active'"
                            flat
                            dense
                            color="secondary"
                            icon="loop"
                            label="Token"
                            title="Refresh Token"
                            :disable="disableBtnRefreshToken"
                            @click="refreshToken(props.row.type, props.row.app_key)"
                        />
                        <q-btn
                            v-else
                            flat
                            dense
                            color="secondary"
                            icon="settings_ethernet"
                            label="BIND"
                            :disable="disableBtnRefreshToken"
                            @click="bindingToken(props.row.type, props.row.app_id, props.row.app_key, props.row.state)"
                        />
                        <q-btn
                            flat
                            round
                            dense
                            color="secondary"
                            icon="edit"
                            @click="openDialogChangePassword(props.row)"
                        />
                        <q-btn flat round dense color="negative" icon="delete" />
                    </div>
                </q-td>
            </template>
            <template v-slot:body-cell-status="props">
                <q-td :props="props">
                    <div>
                        <q-badge :color="props.value === 'active' ? 'green' : 'purple'" :label="props.value" />
                    </div>
                </q-td>
            </template>
        </q-table>
        <q-dialog v-model="dialogAddMerchant" persistent>
            <q-card style="width: 400px">
                <q-card-section class="row items-center q-gutter-md">
                    <div class="text-subtitle1 text-weight-bold text-capitalize">Register Merchant</div>
                    <q-space />
                    <q-btn dense flat round icon="close" v-close-popup />
                </q-card-section>
                <q-separator />
                <q-card-section>
                    <GenericForm :fields="formAddEditMerchant" @fire="fireAddEditMerchant" />
                </q-card-section>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import Breadcrumb from 'components/Breadcrumb.vue';
import Filterbox from 'components/Filterbox.vue';
import { MerchantApi } from 'src/api';
import GenericForm from 'src/components/GenericForm.vue';
import { silence } from 'src/common';
import { useQuasar } from 'quasar';
import { date } from 'quasar';
import { openURL } from 'quasar';

const $q = useQuasar();

const dialogAddMerchant = ref(false);

const disableBtnRefreshToken = ref(false);

const openDialogAddMerchant = async (data = null) => {
    formAddEditMerchant.value = formAddEditMerchant.value.map((m) => {
        if (data) m.value = data[m.name];
        else delete m.value;
        return m;
    });
    dialogAddMerchant.value = true;
};

const formAddEditMerchant = ref([
    {
        label: 'ID',
        name: '_id',
        type: 'text',
        disabled: true,
        placeholder: '_id',
    },
    {
        label: 'Name',
        name: 'name',
        type: 'text',
        mandatory: true,
        placeholder: 'name',
    },
    {
        label: 'Type',
        name: 'type',
        type: 'select',
        mandatory: true,
        placeholder: 'Type',
        options: ['tiktok'],
    },
    {
        label: 'App Id',
        name: 'app_id',
        type: 'text',
        mandatory: true,
        placeholder: 'App Id',
    },
    {
        label: 'App Key',
        name: 'app_key',
        type: 'text',
        mandatory: true,
        placeholder: 'App Key',
    },
    {
        label: 'App Secret',
        name: 'app_secret',
        type: 'text',
        mandatory: true,
        placeholder: 'App Secret',
    },
]);

const columns = [
    {
        name: 'name',
        required: true,
        label: 'Name',
        align: 'left',
        field: 'name',
        sortable: true,
    },
    {
        name: 'status',
        align: 'left',
        label: 'Status',
        field: 'status',
        sortable: true,
    },
    { name: 'type', align: 'left', label: 'Type', field: 'type', sortable: true },
    {
        name: 'seller_name',
        align: 'left',
        label: 'Seller',
        field: 'seller_name',
        sortable: true,
    },
    {
        name: 'app_id',
        align: 'left',
        label: 'App Id',
        field: 'app_id',
        sortable: true,
    },
    {
        name: 'app_key',
        align: 'left',
        label: 'App Key',
        field: 'app_key',
        sortable: true,
    },
    {
        name: 'app_secret',
        label: 'App Secret',
        field: 'app_secret',
        sortable: true,
    },
    {
        name: 'redirect_url',
        label: 'Redirect Url',
        field: 'redirect_url',
        sortable: true,
    },
    {
        name: 'current_token',
        label: 'Current Token',
        field: 'current_token',
        sortable: true,
    },
    {
        name: 'current_token_expired',
        label: 'Exp. Token',
        field: (row) => date.formatDate(row.current_token_expired_date, 'YYYY-MM-DD'),
        sortable: true,
    },
    {
        name: 'current_refresh_token',
        label: 'Current Refresh Token',
        field: 'current_refresh_token',
        sortable: true,
    },
    {
        name: 'current_refresh_token_expired',
        label: 'Exp. Refresh Token',
        field: 'current_refresh_token_expired',
        sortable: true,
    },
    { name: 'action', label: 'Action', field: 'action' },
];

const filterBox = [
    { name: 'type', type: 'text', label: 'Type' },
    { name: 'name', type: 'text', label: 'Name' },
    { name: 'app_key', type: 'text', label: 'App Key' },
    { name: 'app_id', type: 'text', label: 'App Id' },
];

const rows = ref([]);
const visibleColumns = ref([
    'type',
    'status',
    'seller_name',
    'name',
    'app_id',
    'app_key',
    'current_token_expired',
    'action',
]);
const loading = ref(false);
const pagination = ref({
    filter: {},
    sortBy: 'created_at',
    page: 1,
    rowsPerPage: 10,
    rowsNumber: 10,
});
const initialFilter = reactive(filterBox);

const refreshToken = async (type, appKey) => {
    disableBtnRefreshToken.value = true;
    switch (type) {
        case 'tiktok':
            await MerchantApi.refreshTokenTikTok(appKey);
            break;

        default:
            break;
    }
    disableBtnRefreshToken.value = false;
    $q.notify({
        color: 'green-5',
        textColor: 'white',
        icon: 'announcement',
        message: `App Key (${appKey}) with type ${type} refreshed!`,
    });
};

const bindingToken = async (type, appId, appKey, state) => {
    disableBtnRefreshToken.value = true;
    switch (type) {
        case 'tiktok':
            openURL(`${process.env.TIKTOK_AUTH_URL}?service_id=${appId}&app_key=${appKey}&state=${state}`, undefined, {
                noopener: true,
                menubar: false,
                toolbar: true,
                noreferrer: false,
                scrollbars: true,
                resizable: false,
                top: 50,
                left: 50,
                width: 1024,
                height: 800,
            });
            break;

        default:
            break;
    }
    disableBtnRefreshToken.value = false;
};

const fireAddEditMerchant = async (data) => {
    formAddEditMerchant.value = silence(formAddEditMerchant.value, true);
    const updating = data.reduce((aggr, curr) => {
        aggr = { ...aggr, [curr.name]: curr.value };
        return aggr;
    }, {});
    try {
        if (updating._id) {
            await MerchantApi.update(updating._id, updating);
        } else {
            delete updating._id;
            await MerchantApi.create({
                ...updating,
                status: 'inactive',
                state: (Math.random() + 1).toString(36).substring(7),
            });
        }
        $q.notify({
            color: 'green-5',
            textColor: 'white',
            icon: 'announcement',
            message: 'Saved!',
        });
        dialogAddMerchant.value = false;
    } catch (e) {
        $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: e.response.data.statusCode == 409 ? e.response.data.message : 'Something Error With Data!',
        });
    } finally {
        formAddEditMerchant.value = silence(formAddEditMerchant.value, false, ['_id']);
        getData(1, 20, pagination.value.sortBy);
    }
};

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
        MerchantApi.get({
            params: {
                filter: filter,
                // sort: sort,
                skip: (page - 1) * pageSize,
                limit: pageSize,
                dummy: Math.random(),
            },
        }),
        MerchantApi.count({
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
