<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <q-page padding>
        <!-- content -->
        <div class="row">
            <q-card class="my-card col-md-7 col-sm-12">
                <q-card-section>
                    <div class="row items-center no-wrap">
                        <div class="col text-subtitle1 text-weight-bold">General Information</div>
                        <div class="col-auto">
                            <q-btn color="primary" label="Change Password" @click="openDialogChangePassword"></q-btn>
                        </div>
                    </div>
                </q-card-section>
                <q-separator />
                <GenericForm :fields="formFields" @fire="fireSaved" />
            </q-card>
        </div>

        <q-dialog v-model="dialogChangePassword" persistent>
            <q-card style="width: 400px">
                <q-card-section class="row items-center q-gutter-md">
                    <div class="text-subtitle1 text-weight-bold text-capitalize">Change Password</div>
                    <q-space />
                    <q-btn dense flat round icon="close" v-close-popup />
                </q-card-section>
                <q-separator />
                <q-card-section>
                    <GenericForm :fields="formChangePassword" @fire="fireChangePassword" />
                </q-card-section>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import GenericForm from 'src/components/GenericForm.vue';
import { LocationApi, UserApi } from 'src/api';
import { useAuthStore } from 'stores/auth';
import { useQuasar } from 'quasar';
import { silence } from 'src/common';

const $q = useQuasar();
const authStore = useAuthStore();
const user = computed(() => authStore.user);

const dialogChangePassword = ref(false);
const formChangePassword = ref([
    {
        label: 'Old Password',
        name: 'old_password',
        type: 'password',
        mandatory: true,
        placeholder: 'Old Password',
    },
    {
        label: 'New Password',
        name: 'new_password',
        type: 'password',
        mandatory: true,
        placeholder: 'New Password',
    },
    {
        label: 'Confirm New Password',
        name: 'confirm_new_password',
        type: 'password',
        mandatory: true,
        placeholder: 'Confirm New Password',
    },
]);

const formFields = ref([
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
    // {
    //   label: "Role",
    //   name: "roles",
    //   type: "select",
    //   option_value:'value',
    //   mandatory: true,
    //   placeholder: "Role",
    //   options: ["superadmin","inbound","order","packer","picker","putaway"],
    //   multiple: true
    // },
    // {
    //   label: "Warehouse Delegate",
    //   name: "warehouse_delegate",
    //   type: "select",
    //   mandatory: true,
    //   option_value: "_id",
    //   option_label: "name",
    //   options: [],
    //   multiple: true,
    // },
]);

const fireSaved = async (data) => {
    formFields.value = silence(formFields.value, true);
    const updating = data.reduce((aggr, curr) => {
        aggr = { ...aggr, [curr.name]: curr.value };
        return aggr;
    }, {});
    try {
        await UserApi.update(updating._id, updating);
        $q.notify({
            color: 'green-5',
            textColor: 'white',
            icon: 'announcement',
            message: 'Saved!',
        });
    } catch (e) {
        $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: 'Something Error With Data!',
        });
    } finally {
        formFields.value = silence(formFields.value, false, ['_id']);
    }
};

const openDialogChangePassword = () => {
    formChangePassword.value = formChangePassword.value.map((m) => {
        delete m.value;
        return m;
    });
    dialogChangePassword.value = true;
};

const fireChangePassword = async (data) => {
    const updating = data.reduce((aggr, curr) => {
        aggr = { ...aggr, [curr.name]: curr.value };
        return aggr;
    }, {});

    if (updating.new_password !== updating.confirm_new_password) {
        return $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: 'New Password not match with confirmation password!',
        });
    }
    formChangePassword.value = silence(formChangePassword.value, true);
    try {
        await UserApi.changePassword(user.value._id, updating);
        $q.notify({
            color: 'green-5',
            textColor: 'white',
            icon: 'announcement',
            message: 'Saved!',
        });
        dialogChangePassword.value = false;
    } catch (e) {
        $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'error',
            message: e.response.data.statusCode == 409 ? e.response.data.message : 'Something Error With Data!',
        });
    } finally {
        formChangePassword.value = silence(formChangePassword.value, false);
    }
};

onMounted(async () => {
    const warehouses = await LocationApi.getWarehouse({
        params: { select: ['_id', 'name', 'code'] },
    });

    const { data } = await UserApi.getById(user.value._id);
    formFields.value = formFields.value.map((m) => {
        if (m.name === 'warehouse_delegate') m.options = warehouses.data;
        m.value = data[m.name];
        return m;
    });
});
</script>
