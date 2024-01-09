<template>
    <q-page padding>
        <Breadcrumb title="Warehouse List">
            <template #right>
                <div>
                    <q-btn color="primary" icon="add" label="Add Warehouse" @click="newWarehouse" />
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
            :pagination="pagination"
            :loading="loading"
            @request="onRequest"
        >
            <template v-slot:body-cell-zones="props">
                <q-td :props="props">
                    <q-btn
                        flat
                        dense
                        color="primary"
                        icon-right="chevron_right"
                        :label="props.row.zones_count || 0"
                        @click="toLocation(props.row._id, 'zone')"
                    />
                </q-td>
            </template>
            <template v-slot:body-cell-aisles="props">
                <q-td :props="props">
                    <q-btn
                        flat
                        dense
                        color="primary"
                        icon-right="chevron_right"
                        :label="props.row.aisles_count || 0"
                        @click="toLocation(props.row._id, 'parent')"
                    />
                </q-td>
            </template>
            <template v-slot:body-cell-racks="props">
                <q-td :props="props">
                    <q-btn
                        flat
                        dense
                        color="primary"
                        icon-right="chevron_right"
                        :label="props.row.racks_count || 0"
                        @click="toLocation(props.row._id, 'parent')"
                    />
                </q-td>
            </template>
            <template v-slot:body-cell-shelves="props">
                <q-td :props="props">
                    <q-btn
                        flat
                        dense
                        color="primary"
                        icon-right="chevron_right"
                        :label="props.row.shelves_count || 0"
                        @click="toLocation(props.row._id, 'parent')"
                    />
                </q-td>
            </template>
            <template v-slot:body-cell-bins="props">
                <q-td :props="props">
                    <q-btn
                        flat
                        dense
                        color="primary"
                        icon-right="chevron_right"
                        :label="props.row.bins_count || 0"
                        @click="toLocation(props.row._id, 'mobile')"
                    />
                </q-td>
            </template>
            <template v-slot:body-cell-locations="props">
                <q-td :props="props">
                    <q-btn
                        flat
                        dense
                        color="primary"
                        icon-right="chevron_right"
                        :label="props.row.locations_count || 0"
                        @click="toLocation(props.row._id, 'location')"
                    />
                </q-td>
            </template>

            <template v-slot:body-cell-action="props">
                <q-td :props="props">
                    <q-btn-dropdown flat dense dropdown-icon="more_vert">
                        <q-list>
                            <q-item clickable v-close-popup @click="toLocation(props.row._id, 'parent')">
                                <q-item-section>
                                    <q-item-label>Parent Location</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item clickable v-close-popup @click="toLocation(props.row._id, 'mobile')">
                                <q-item-section>
                                    <q-item-label>Mobile Location</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item clickable v-close-popup @click="toLocation(props.row._id, 'location')">
                                <q-item-section>
                                    <q-item-label>Full Location</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item
                                clickable
                                v-close-popup
                                @click="
                                    $router.push({
                                        name: 'edit-warehouse',
                                        params: { id: props.row._id },
                                    })
                                "
                            >
                                <q-item-section>
                                    <q-item-label>Edit</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item clickable v-close-popup>
                                <q-item-section>
                                    <q-item-label>Delete</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-btn-dropdown>
                </q-td>
            </template>
        </q-table>

        <q-dialog
            v-model="modalCreate"
            persistent
            :full-height="$q.screen.lt.sm"
            :maximized="$q.screen.lt.md"
            transition-show="slide-up"
            transition-hide="slide-down"
        >
            <q-card :style="$q.screen.gt.sm ? 'width: 900px; max-width: 80vw;' : ''">
                <q-card-section class="row items-center q-gutter-md">
                    <div class="text-subtitle1 text-weight-bold">Create New Warehouse</div>
                    <q-space />
                    <q-btn dense flat round icon="close" v-close-popup />
                </q-card-section>
                <q-separator />
                <q-card-section>
                    <q-form @submit.prevent.stop="onSaveData" ref="myForm" class="q-gutter-md">
                        <div>
                            <div class="row items-start q-qutter-md">
                                <div class="col">
                                    <div class="q-gutter-md">
                                        <div class="text-grey text-weight-bold">Warehouse Detail</div>
                                        <q-input
                                            v-model="formState.name"
                                            filled
                                            type="text"
                                            label="Warehouse Name"
                                            :rules="[
                                                (val) => !!val || 'Field is required',
                                                (val) => val.length >= 3 || 'Please use minimum 3 characters',
                                            ]"
                                        />
                                        <q-input
                                            v-model="formState.code"
                                            filled
                                            type="text"
                                            label="Warehouse Code"
                                            :rules="[
                                                (val) => !!val || 'Field is required',
                                                (val) => val.length >= 3 || 'Please use minimum 3 characters',
                                            ]"
                                        />
                                        <q-select
                                            v-model="formState.type"
                                            :options="warehouseType"
                                            label="Type"
                                            filled
                                            :rules="[(val) => !!val || 'Field is required']"
                                        />
                                    </div>
                                </div>
                                <q-separator vertical class="q-mx-md" />
                                <div class="col">
                                    <div class="q-gutter-md">
                                        <div class="text-grey text-weight-bold">Contact Information</div>
                                        <q-input v-model="formState.contact_name" filled type="text" label="Name" />
                                        <q-input
                                            v-model="formState.contact_email"
                                            filled
                                            type="text"
                                            label="Email"
                                            :rules="[(val) => validateEmail(val) || 'Must be a valid email.']"
                                        />
                                        <q-input v-model="formState.contact_phone" filled type="text" label="Phone" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <q-separator />
                        <div class="row items-center">
                            <q-btn label="Reset" type="reset" color="secondary" class="q-ml-sm" />
                            <q-space />
                            <q-btn label="Submit" type="submit" color="primary" />
                        </div>
                    </q-form>
                </q-card-section>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script>
import { useQuasar } from 'quasar';
import { ref, reactive, onMounted } from 'vue';
import Breadcrumb from 'components/Breadcrumb.vue';
import Filterbox from 'components/Filterbox.vue';
import LocationApi from 'src/api/location';
import { useRouter } from 'vue-router';

const columns = [
    {
        name: 'name',
        required: true,
        label: 'Warehouse Name',
        align: 'left',
        field: (row) => row.name,
        format: (val) => `${val}`,
        sortable: true,
    },
    { name: 'code', align: 'left', label: 'code', field: 'code', sortable: true },
    {
        name: 'type',
        align: 'left',
        label: 'Type',
        field: 'type',
        sortable: true,
    },
    { name: 'parent', label: 'parent', field: 'parents', align: 'center' },
    { name: 'mobile', label: 'Mobile', field: 'mobile', align: 'center' },
    {
        name: 'locations',
        label: 'Locations',
        field: 'locations',
        align: 'center',
    },
    {
        name: 'action',
        label: 'Action',
        field: 'action',
    },
];

const filterBox = [
    { name: 'name', type: 'text', label: 'Name' },
    { name: 'code', type: 'text', label: 'Code', operator: 'equal' },
    { name: 'type', type: 'text', label: 'Type', operator: 'equal' },
];

const warehouseType = [{ label: 'Regular', value: 'regular' }];

export default {
    name: 'MasterWarehouse',
    components: {
        Breadcrumb,
        Filterbox,
    },
    setup(props) {
        const $q = useQuasar();
        const router = useRouter();

        const rows = ref([]);
        const loading = ref(false);
        const pagination = ref({
            filter: {},
            sortBy: 'created_at',
            page: 1,
            rowsPerPage: 10,
            rowsNumber: 10,
        });
        const initialFilter = reactive(filterBox);
        const modalCreate = ref(false);
        const formState = ref({
            name: '',
            code: '',
            type: '',
            contact_name: '',
            contact_email: '',
            contact_phone: '',
        });
        const myForm = ref(null);

        function onRequest(props) {
            const { page, rowsPerPage, sortBy, descending } = props.pagination;
            getData(page, rowsPerPage, sortBy);
        }

        const findFilter = (e) => {
            pagination.value.filter = e;
            getData(1, pagination.value.rowsPerPage, 'created_at');
        };

        const getData = async (page, pageSize, sort) => {
            const filter = { ...pagination.value.filter };
            loading.value = true;
            const [{ data: result }, { data: count }] = await Promise.all([
                LocationApi.getWarehouse({
                    params: {
                        filter: filter,
                        // sort: sort,
                        skip: (page - 1) * pageSize,
                        limit: pageSize,
                        dummy: Math.random(),
                    },
                }),
                LocationApi.countWarehouse({
                    params: { filter: filter },
                }),
            ]);
            loading.value = false;
            rows.value = result;
            pagination.value.rowsNumber = count;
            pagination.value.page = page;
            pagination.value.rowsPerPage = pageSize;
            pagination.value.sortBy = sort.replace('-', '');
            pagination.value.descending = sort.indexOf('-') > -1 ? true : false;
        };

        onMounted(() => {
            getData(1, 20, pagination.value.sortBy);
        });

        const newWarehouse = () => {
            modalCreate.value = true;
            formState.value = {
                name: '',
                code: '',
                type: '',
                contact_name: '',
                contact_email: '',
                contact_phone: '',
            };
        };

        function validateEmail(email) {
            return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);
        }

        /**
         * save and edit data warehouse
         */
        async function onSaveData() {
            const doSave = async () => {
                try {
                    loading.value = true;
                    const obj = formState.value;
                    await LocationApi.createWarehouse(obj);
                    loading.value = false;
                    getData(1, 20, pagination.value.sortBy);
                } catch (error) {
                    loading.value = false;
                    $q.notify({
                        color: 'red-5',
                        textColor: 'white',
                        icon: 'error',
                        message: error.message,
                    });
                }
            };

            myForm.value.validate().then((success) => {
                if (success) {
                    doSave();
                } else {
                    $q.notify({
                        color: 'red-5',
                        textColor: 'white',
                        icon: 'warning',
                        message: 'There is something missing, please check the input form',
                    });
                }
            });
        }

        const toLocation = (warehouse_id, type) => {
            return router.push({
                name: `${type}-list`,
                params: { id: warehouse_id },
            });
        };

        return {
            columns,
            rows,
            pagination,
            initialFilter,
            findFilter,
            loading,
            onRequest,
            newWarehouse,
            modalCreate,
            formState,
            warehouseType,
            validateEmail,
            myForm,
            onSaveData,
            toLocation,
        };
    },
};
</script>
src/api/location
