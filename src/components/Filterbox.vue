<template>
    <q-list class="rounded-borders bg-blue-grey-1 q-mb-lg rounded-md">
        <q-card flat class="bg-blue-grey-1">
            <q-card-section>
                <div class="text-uppercase text-weight-bold q-mb-md">Search</div>
                <div class="row items-center justify-between">
                    <div class="col row items-center q-col-gutter-sm">
                        <div
                            v-for="(item, i) in form"
                            :key="i"
                            :class="[
                                { 'col-2': ['text', 'date', 'select'].includes(item.type) },
                                { 'col-4': ['daterange'].includes(item.type) },
                            ]"
                        >
                            <q-input
                                v-if="item.type === 'text'"
                                v-model="item.value"
                                outlined
                                dense
                                type="text"
                                :label="item.label"
                                :placeholder="item.placeholder"
                                class="bg-white rounded-md"
                            />

                            <q-select
                                v-if="item.type === 'select'"
                                v-model="item.value"
                                :options="item.options"
                                :label="item.label"
                                outlined
                                class="bg-white rounded-md"
                            />

                            <div v-if="item.type === 'daterange'" class="row items-center q-gutter-sm">
                                <div class="col">
                                    <q-input
                                        v-model="item.valueFrom"
                                        dense
                                        outlined
                                        type="text"
                                        :label="`${item.label} From Date`"
                                        class="bg-white rounded-md"
                                    >
                                        <template v-slot:append>
                                            <q-icon
                                                v-if="item.valueFrom"
                                                name="close"
                                                @click="item.valueFrom = ''"
                                                class="cursor-pointer"
                                            />
                                            <q-icon name="date_range" class="cursor-pointer">
                                                <q-popup-proxy
                                                    :ref="`${item.name}max`"
                                                    transition-show="scale"
                                                    transition-hide="scale"
                                                >
                                                    <q-date
                                                        v-model="item.valueFrom"
                                                        :mask="item.withTime ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD'"
                                                    >
                                                        <div class="row items-center justify-end">
                                                            <q-btn v-close-popup label="Close" color="primary" flat />
                                                        </div>
                                                    </q-date>
                                                </q-popup-proxy>
                                            </q-icon>
                                            <q-icon v-if="item.withTime" name="schedule" class="cursor-pointer">
                                                <q-popup-proxy
                                                    transition-show="scale"
                                                    transition-hide="scale"
                                                    :ref="`${item.name}Tmin`"
                                                >
                                                    <q-time v-model="item.valueFrom" mask="YYYY-MM-DD HH:mm" format24h>
                                                        <div class="row items-center justify-end">
                                                            <q-btn v-close-popup label="Close" color="primary" flat />
                                                        </div>
                                                    </q-time>
                                                </q-popup-proxy>
                                            </q-icon>
                                        </template>
                                    </q-input>
                                </div>
                                <div class="col">
                                    <q-input
                                        v-model="item.valueTo"
                                        class="bg-white rounded-md"
                                        dense
                                        outlined
                                        type="text"
                                        :label="`${item.label} To Date`"
                                    >
                                        <template v-slot:append>
                                            <q-icon
                                                v-if="item.valueTo"
                                                name="close"
                                                @click="item.valueTo = ''"
                                                class="cursor-pointer"
                                            />
                                            <q-icon name="date_range" class="cursor-pointer">
                                                <q-popup-proxy
                                                    :ref="`${item.name}max`"
                                                    transition-show="scale"
                                                    transition-hide="scale"
                                                >
                                                    <q-date
                                                        :mask="item.withTime ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD'"
                                                        v-model="item.valueTo"
                                                        @input="() => $refs[`${item.name}max`][0].hide()"
                                                    >
                                                        <div class="row items-center justify-end">
                                                            <q-btn v-close-popup label="Close" color="primary" flat />
                                                        </div>
                                                    </q-date>
                                                </q-popup-proxy>
                                            </q-icon>
                                            <q-icon v-if="item.withTime" name="schedule" class="cursor-pointer">
                                                <q-popup-proxy
                                                    transition-show="scale"
                                                    transition-hide="scale"
                                                    :ref="`${item.name}Tmax`"
                                                >
                                                    <q-time
                                                        v-model="item.valueTo"
                                                        mask="YYYY-MM-DD HH:mm"
                                                        @input="() => $refs[`${item.name}Tmax`][0].hide()"
                                                        format24h
                                                    >
                                                        <div class="row items-center justify-end">
                                                            <q-btn v-close-popup label="Close" color="primary" flat />
                                                        </div>
                                                    </q-time>
                                                </q-popup-proxy>
                                            </q-icon>
                                        </template>
                                    </q-input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="form.length === 1 || simple" class="row justify-end q-gutter-sm">
                        <q-btn color="secondary" label="Reset" @click="clear" />
                        <q-btn color="primary" label="Search" :disabled="form.every((e) => !e.value)" @click="fire" />
                    </div>
                </div>
            </q-card-section>
            <!-- <q-separator /> -->
            <q-card-section v-if="form.length > 1 || !!simple">
                <div class="row justify-end q-gutter-sm">
                    <q-btn color="secondary" label="Reset" @click="clear" />
                    <q-btn color="primary" label="Search" :disabled="form.every((e) => !e.value)" @click="fire" />
                </div>
            </q-card-section>
        </q-card>
    </q-list>
</template>

<script>
import { defineComponent, ref, reactive, watch } from 'vue';
export default defineComponent({
    name: 'FilterBox',
    props: {
        fields: {
            type: Array,
            required: true,
            default() {
                return [];
            },
        },
        simple: Boolean,
    },
    emits: ['find'],
    setup(props, { emit }) {
        const form = reactive(props.fields);
        const dateProxy = ref(null);

        watch(
            () => props.fields,
            (newValue, oldValue) => {
                const makeOver = newValue.map((m) => {
                    return m;
                });
                form.value = [...makeOver];
            },
            { deep: true },
        );

        function clear() {
            form.value = form.value?.map((m) => {
                delete m.value;
                return m;
            });
            emit('find', {});
        }

        function fire() {
            const filter = form.value
                ?.filter((f) => f.value)
                ?.reduce((aggr, curr) => {
                    if (curr.type === 'text') {
                        if (['eq', 'equal'].includes(curr.operator)) {
                            aggr = { ...aggr, [curr.name]: curr.value };
                        } else if (['ne', 'notequal'].includes(curr.operator)) {
                            aggr = { ...aggr, [curr.name]: { $ne: curr.value } };
                        } else if (curr.operator === 'or') {
                            const splitName = curr.name.split('.');
                            const or = [];
                            splitName.forEach((e) => {
                                or.push({ [e]: { $regex: `${curr.value}`, $options: 'i' } });
                            });
                            aggr = { ...aggr, $or: or };
                        } else {
                            aggr = {
                                ...aggr,
                                [curr.name]: { $regex: `${curr.value}`, $options: 'i' },
                            };
                        }
                    }
                    if (curr.type === 'number') {
                        aggr = { ...aggr, [curr.name]: +curr.value };
                    }
                    if (curr.type === 'dropdown') {
                        aggr = {
                            ...aggr,
                            [curr.name]: curr.value,
                        };
                    }
                    if (curr.type === 'multidropdown') {
                        aggr = {
                            ...aggr,
                            [curr.name]: { $in: curr.value },
                        };
                    }
                    // add more configuration types of input here
                    return aggr;
                }, {});

            emit('find', filter);
        }

        return {
            form,
            fire,
            clear,
            dateProxy,
        };
    },
});
</script>
