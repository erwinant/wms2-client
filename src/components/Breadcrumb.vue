<template>
    <q-card flat class="my-card rounded-md bg-blue-grey-1 q-mb-lg">
        <q-card-section class="">
            <div class="row items-center justify-between">
                <div>
                    <div class="text-h5 text-weight-medium q-mb-xs">{{ title }}</div>
                    <q-breadcrumbs>
                        <template v-slot:separator>
                            <q-icon size="1.5em" name="chevron_right" color="primary" />
                        </template>
                        <q-breadcrumbs-el to="/" label="Home" />
                        <q-breadcrumbs-el
                            v-for="(route, i) in $route.matched.filter((f) => f.name)"
                            :key="i"
                            :label="route.name?.replace(/-/g, ' ')"
                            :to="route.path"
                            class="text-capitalize"
                        />
                    </q-breadcrumbs>
                </div>
                <div>
                    <slot name="right"></slot>
                </div>
            </div>
        </q-card-section>
    </q-card>
</template>

<script>
export default {
    name: 'BreadcrumnComponent',
    props: {
        title: {
            type: String,
            default: 'Title Here',
        },
    },
};
</script>
