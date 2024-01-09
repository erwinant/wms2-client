<template>
    <q-page padding>
        <Breadcrumb title="User List">
            <template #right>
                <div>
                    <q-btn color="primary" icon="add" label="Register User" @click="openDialogAddEditUser(null)" />
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
                            flat
                            round
                            dense
                            color="secondary"
                            icon="edit"
                            @click="openDialogAddEditUser(props.row)"
                        />
                        <q-btn flat round dense color="negative" icon="delete" />
                    </div>
                </q-td>
            </template>
        </q-table>
        <q-dialog v-model="dialogAddUser" persistent>
            <q-card style="width: 400px">
                <q-card-section class="row items-center q-gutter-md">
                    <div class="text-subtitle1 text-weight-bold text-capitalize">Register User</div>
                    <q-space />
                    <q-btn dense flat round icon="close" v-close-popup />
                </q-card-section>
                <q-separator />
                <q-card-section>
                    <GenericForm :fields="formAddEditUser" @fire="fireAddEditUser" />
                </q-card-section>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import Breadcrumb from 'components/Breadcrumb.vue';
import Filterbox from 'components/Filterbox.vue';
import { UserApi, LocationApi } from 'src/api';
import GenericForm from 'src/components/GenericForm.vue';
import { silence } from 'src/common';
import { useQuasar } from 'quasar';

const $q = useQuasar();

const formAddEditUser = ref([
    {
        label: 'ID',
        name: '_id',
        type: 'text',
        disabled: true,
        placeholder: '_id',
    },
    {
        label: 'Username',
        name: 'username',
        type: 'text',
        mandatory: true,
        placeholder: 'Username',
    },
    {
        label: 'First Name',
        name: 'first_name',
        type: 'text',
        mandatory: true,
        placeholder: 'First Name',
    },
    {
        label: 'Last Name',
        name: 'last_name',
        type: 'text',
        mandatory: true,
        placeholder: 'Last Name',
    },
    {
        label: 'Email',
        name: 'email',
        type: 'email',
        mandatory: true,
        placeholder: 'Email',
    },
    {
        label: 'Phone',
        name: 'phone',
        type: 'tel',
        mandatory: true,
        placeholder: 'Phone',
    },
    {
        label: 'Gender',
        name: 'gender',
        type: 'select',
        mandatory: true,
        placeholder: 'Gender',
        options: ['male', 'female'],
    },
    {
        label: 'Role',
        name: 'roles',
        type: 'select',
        option_value: 'value',
        mandatory: true,
        placeholder: 'Role',
        options: ['superadmin', 'inbound', 'order', 'packer', 'picker', 'putaway'],
        multiple: true,
    },
    {
        label: 'Warehouse Delegate',
        name: 'warehouse_delegate',
        type: 'select',
        mandatory: true,
        option_value: '_id',
        option_label: 'name',
        options: [],
        multiple: true,
    },
]);

const dialogAddUser = ref(false);

const openDialogAddEditUser = async (data = null) => {
    const warehouses = await LocationApi.getWarehouse({
        params: { select: ['_id', 'name', 'code'] },
    });
    formAddEditUser.value = formAddEditUser.value.map((m) => {
        if (m.name === 'warehouse_delegate') m.options = warehouses.data;
        if (data) m.value = data[m.name];
        else delete m.value;
        return m;
    });
    if (formAddEditUser.value.findIndex((f) => f.name === 'password') != -1)
        formAddEditUser.value.splice(
            formAddEditUser.value.findIndex((f) => f.name === 'password'),
            1,
        );

    if (!data) {
        formAddEditUser.value = [
            ...formAddEditUser.value,
            {
                label: 'Password',
                name: 'password',
                type: 'text',
                mandatory: true,
                placeholder: 'Password',
            },
        ];
    }

    dialogAddUser.value = true;
};

const fireAddEditUser = async (data) => {
    formAddEditUser.value = silence(formAddEditUser.value, true);
    const updating = data.reduce((aggr, curr) => {
        aggr = { ...aggr, [curr.name]: curr.value };
        return aggr;
    }, {});
    try {
        if (updating._id) {
            await UserApi.update(updating._id, updating);
        } else {
            delete updating._id;
            await UserApi.create(updating);
        }
        $q.notify({
            color: 'green-5',
            textColor: 'white',
            icon: 'announcement',
            message: 'Saved!',
        });
        dialogAddUser.value = false;
    } catch (e) {
        $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: 'Something Error With Data!',
        });
    } finally {
        formAddEditUser.value = silence(formAddEditUser.value, false, ['_id']);
        getData(1, 20, pagination.value.sortBy);
    }
};

const columns = [
    {
        name: 'username',
        required: true,
        label: 'Username',
        align: 'left',
        field: (row) => row.username,
        format: (val) => `${val}`,
        sortable: true,
    },
    {
        name: 'first_name',
        align: 'left',
        label: 'Fist Name',
        field: 'first_name',
        sortable: true,
    },
    {
        name: 'last_name',
        align: 'left',
        label: 'Last Name',
        field: 'last_name',
        sortable: true,
    },
    {
        name: 'email',
        align: 'left',
        label: 'Email',
        field: 'email',
        sortable: true,
    },
    {
        name: 'warehouse_delegate',
        label: 'Warehouse',
        field: (row) => row.warehouse_delegate.map((m) => `${m.name} | `),
        sortable: true,
    },
    { name: 'action', label: 'Action', field: 'action' },
];

const filterBox = [
    { name: 'username', type: 'text', label: 'Username' },
    { name: 'email', type: 'text', label: 'Email' },
    { name: 'first_name', type: 'text', label: 'First Name' },
    { name: 'last_name', type: 'text', label: 'Last Name' },
];

const rows = ref([]);
const visibleColumns = ref(['username', 'first_name', 'last_name', 'email', 'warehouse_delegate', 'action']);
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
        UserApi.get({
            params: {
                filter: filter,
                // sort: sort,
                skip: (page - 1) * pageSize,
                limit: pageSize,
                dummy: Math.random(),
                populate: 'warehouse',
            },
        }),
        UserApi.count({
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
