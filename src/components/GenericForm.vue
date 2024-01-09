<template>
    <q-card flat>
        <q-form ref="myForm" @submit.prevent="handleFire" @reset="reset">
            <q-card-section>
                <div class="row items-center q-col-gutter-md">
                    <div v-for="(item, i) in intProps" :key="i" class="col-sm-12">
                        <q-input
                            v-if="item.type === 'text'"
                            v-model="item.value"
                            filled
                            dense
                            type="text"
                            :disable="item.disabled"
                            :label="item.label"
                            :placeholder="item.placeholder"
                            class="bg-white rounded-md"
                            :rules="[(val) => !item.mandatory || (val && val.length > 0) || 'Please type something']"
                        />

                        <q-input
                            v-if="item.type === 'tel'"
                            v-model="item.value"
                            filled
                            dense
                            type="number"
                            :disable="item.disabled"
                            :label="item.label"
                            :placeholder="item.placeholder"
                            class="bg-white rounded-md"
                            :rules="[(val) => !item.mandatory || (val && val.length > 0) || 'Please type something']"
                        />

                        <q-input
                            v-if="item.type === 'password'"
                            v-model="item.value"
                            filled
                            dense
                            type="password"
                            :disable="item.disabled"
                            :label="item.label"
                            :placeholder="item.placeholder"
                            class="bg-white rounded-md"
                            :rules="[(val) => !item.mandatory || (val && val.length > 0) || 'Please type something']"
                        />

                        <q-input
                            v-if="item.type === 'email'"
                            v-model="item.value"
                            filled
                            dense
                            type="email"
                            :disable="item.disabled"
                            :label="item.label"
                            :placeholder="item.placeholder"
                            class="bg-white rounded-md"
                            :rules="[
                                (val) => !item.mandatory || (val && val.length > 0) || 'Please type something',
                                (val) => validateEmail(val) || 'Must be a valid email.',
                            ]"
                        />

                        <q-date
                            :disable="item.disabled"
                            v-if="item.type === 'datepicker'"
                            v-model="item.value"
                            filled
                            dense
                            :label="item.label"
                            :placeholder="item.placeholder"
                            class="bg-white rounded-md"
                            :rules="[(val) => !item.mandatory || (val && val.length > 0) || 'Please type something']"
                        />

                        <q-select
                            v-if="item.type === 'select'"
                            class="bg-white rounded-md"
                            :use-chips="true"
                            :multiple="item.multiple || false"
                            v-model="item.value"
                            filled
                            dense
                            :disable="item.disabled"
                            :option-value="item.option_value"
                            :option-label="item.option_label"
                            :options="item.options"
                            :label="item.label"
                            :placeholder="item.placeholder"
                            :rules="[(val) => !item.mandatory || !!val || 'Please select something']"
                        />
                    </div>
                </div>
            </q-card-section>
            <q-separator />
            <q-card-section>
                <div class="row justify-end q-gutter-sm">
                    <q-btn type="reset" color="secondary" label="Reset" />
                    <q-btn type="submit" color="primary" label="Save" :disabled="fields.every((e) => !e.value)" />
                </div>
            </q-card-section>
        </q-form>
    </q-card>
</template>

<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';
const emit = defineEmits(['fire']);
const myForm = ref(null);
const $q = useQuasar();
const props = defineProps({
    fields: {
        type: Array,
        required: true,
        default() {
            return [];
        },
    },
});

let intProps = ref(props.fields);

const handleFire = () => {
    myForm.value.validate().then((success) => {
        if (success) {
            emit('fire', intProps.value);
        } else {
            $q.notify({
                color: 'red-5',
                textColor: 'white',
                icon: 'warning',
                message: 'There is something missing, please check the input form',
            });
        }
    });
};

const reset = () => {
    intProps.value = intProps.value.map((m) => {
        return {
            ...m,
            value: null,
        };
    });
    myForm.value.resetValidation();
};

const validateEmail = (email) => {
    return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);
};
</script>
