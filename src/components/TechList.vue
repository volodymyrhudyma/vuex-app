<template>
   <div class="flex-wrapper">
       <div class="add-section">

           <md-button class="md-icon-button md-raised md-primary" @click="openDialog('addTechnology')">
               <md-icon>add</md-icon>
           </md-button>
       </div>
       <div class="list-section">

           <div class="phone-viewport filter-panel">
               <md-bottom-bar md-theme="teal">
                   <md-bottom-bar-item md-icon="list" md-active @click="setFilter('all')">{{ $t('All') }}</md-bottom-bar-item>
                   <md-bottom-bar-item md-icon="star" @click="setFilter('favorites')">{{ $t('Favorites') }}</md-bottom-bar-item>
               </md-bottom-bar>

               <div class="search">
                   <form novalidate @submit.stop.prevent="submit">
                       <md-input-container>
                           <label>{{ $t('Search by name') }}</label>
                           <md-input v-model="query"></md-input>
                       </md-input-container>
                   </form>
               </div>

           </div>

           <div class="phone-viewport list">

               <div class="wrapper-loader" v-if="isTechnologiesPending">
                   <md-spinner :md-size="60" md-indeterminate class="md-primary"></md-spinner>
               </div>

               <md-dialog md-open-from="#fab" md-close-to="#fab" ref="addTechnology">
                   <md-dialog-title>{{ $t('Create new technology') }}</md-dialog-title>

                   <md-dialog-content>
                       <form>
                           <md-input-container>
                               <label>{{ $t('Name') }}</label>
                               <md-textarea v-model="newTechnology.name"></md-textarea>
                           </md-input-container>
                       </form>
                   </md-dialog-content>

                   <md-dialog-actions>
                       <md-button class="md-primary" @click="closeDialog('addTechnology')">{{ $t('Cancel') }}</md-button>
                       <md-button class="md-primary" @click="storeTechnology(newTechnology)">{{ $t('Create') }}</md-button>
                   </md-dialog-actions>
               </md-dialog>

               <md-list class="custom-list md-triple-line" v-if="!isTechnologiesPending && filteredTechnologies.length">
                   <md-list-item v-for="(technology, key) in filteredTechnologies" :key="technology.name">

                       <md-avatar class="avatar">
                           {{++key}}
                       </md-avatar>

                       <div class="md-list-text-container">
                           <span>{{technology.name}}</span>
                           <span>Used in: {{technology.usageCount}} project(s)</span>
                       </div>

                       <md-button class="md-icon-button md-list-action" @click="toggleFavorite(technology.name)">
                        <md-icon class="md-default" v-if="!technology.favorited">star</md-icon>
                        <md-icon class="md-primary" v-if="technology.favorited">star</md-icon>
                      </md-button>

                      <md-button class="md-icon-button md-list-action" @click="deleteTechnology(technology.slug)">
                          <md-icon class="md-warn">delete</md-icon>
                        </md-button>

                       <md-divider class="md-inset"></md-divider>
                   </md-list-item>
               </md-list>

               <div class="empty-list" v-if="!isTechnologiesPending && !filteredTechnologies.length">
                   No technologies of the type <span class="filter-name">{{filter}}</span> found
               </div>

           </div>
       </div>
    </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex'
    const { mapGetters, mapActions } = createNamespacedHelpers('technology')

    export default {
        data () {
            return {
                filter: 'all',
                query: '',
                newTechnology: {
                    name: '',
                    slug: '',
                    favorited: false
                },
            }
        },
        computed: {
            ...mapGetters(['allTechnologies', 'isTechnologiesPending']),
            filteredTechnologies() {
                let technologies = [];

                switch(this.filter) {
                    case 'all':
                        technologies = this.allTechnologies;
                        break;
                    case 'favorites':
                        technologies = this.allTechnologies.filter(technology => technology.favorited);
                        break;
                    default:
                        break;
                }

                return technologies.filter(technology => {
                    return technology.name.toLowerCase().includes(this.query.toLowerCase())
                });
            },
        },
        methods: {
            ...mapActions(['fetchTechnologies', 'toggleFavorite', 'deleteTechnology']),
            storeTechnology(newTechnology) {
                this.slugifyNewTechnology(newTechnology);
                this.$store.dispatch('storeTechnology', newTechnology);
                this.closeDialog('addTechnology');
                this.resetNewTechnologyData();
            },
            slugifyNewTechnology(newTechnology) {
                newTechnology.slug = this.slugify(newTechnology.name);
            },
            slugify(string) {
                return string
                    .toString()
                    .trim()
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^\w\-]+/g, "")
                    .replace(/\-\-+/g, "-")
                    .replace(/^-+/, "")
                    .replace(/-+$/, "");
            },
            resetNewTechnologyData() {
                this.newTechnology = {
                    name: '',
                    slug: '',
                    favorited: false
                }
            },
            openDialog(ref) {
                this.$refs[ref].open();
            },
            closeDialog(ref) {
                this.$refs[ref].close();
            },
            setFilter(filter) {
                this.filter = filter;
            },
        },
        beforeMount() {
            this.fetchTechnologies();
        }
    }
</script>
