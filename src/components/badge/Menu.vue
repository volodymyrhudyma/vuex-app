<template>
    <div class="phone-viewport badge-menu">
        <md-list>
            <md-list-item md-expand-multiple v-for="(type, i) in allTypes" :key="i">
                <span>{{type.name}}</span>

                <md-list-expand v-if="type.children">
                    <md-list>
                        <md-list-item class="md-inset" v-for="(child, j) in type.children" :key="j">{{child.name}}</md-list-item>
                    </md-list>
                </md-list-expand>
            </md-list-item>
        </md-list>
    </div>

</template>

<script>
    import { createNamespacedHelpers } from 'vuex'
    const { mapGetters } = createNamespacedHelpers('badge')

    export default {
    	name: 'badge-menu',
        computed: {
            ...mapGetters(['allTypes']),
        },
    }
</script>
