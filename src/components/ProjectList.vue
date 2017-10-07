<template>
   <div class="flex-wrapper">
      <div class="add-section">
        <md-button class="md-icon-button md-raised md-primary" @click="openDialog('addProject')">
          <md-icon>add</md-icon>
        </md-button>
      </div>
      <div class="list-section">
  
        <div class="phone-viewport filter-panel">
          <md-bottom-bar md-theme="teal">
            <md-bottom-bar-item md-icon="list" @click="setFilter('all')" md-active>{{ $t('All') }}</md-bottom-bar-item>
            <md-bottom-bar-item md-icon="history" @click="setFilter('recents')">{{ $t('Recents') }}</md-bottom-bar-item>
            <md-bottom-bar-item md-icon="star" @click="setFilter('favorites')">{{ $t('Favorites') }}</md-bottom-bar-item>
            <md-bottom-bar-item md-icon="done" @click="setFilter('completed')">{{ $t('Completed') }}</md-bottom-bar-item>
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

          <div class="wrapper-loader" v-if="isProjectsPending">
            <md-spinner :md-size="60" md-indeterminate class="md-primary"></md-spinner>
          </div>

          <md-dialog md-open-from="#fab" md-close-to="#fab" ref="addProject">
            <md-dialog-title>{{ $t('Create new project') }}</md-dialog-title>

            <md-dialog-content>
              <form>
                <md-input-container>
                  <label>{{ $t('Name') }}</label>
                  <md-textarea v-model="newProject.name"></md-textarea>
                </md-input-container>
                <md-input-container>
                  <label>{{ $t('Description') }}</label>
                  <md-textarea v-model="newProject.description"></md-textarea>
                </md-input-container>
                
                <md-select name="tags" id="tags" multiple v-model="newProject.tags">
                  <md-button class="md-icon-button" md-menu-trigger slot="icon">
                    <md-icon>label</md-icon>
                  </md-button>
                  
                  <md-subheader>{{ $t('Hobbies') }}</md-subheader>
                  <md-option value="freestyle">Freestyle</md-option>

                  <md-subheader>{{ $t('Work') }}</md-subheader>
                  <md-option value="javascript_dev">Javascript dev</md-option>
                </md-select>

              </form>
            </md-dialog-content>

            <md-dialog-actions>
              <md-button class="md-primary" @click="closeDialog('addProject')">{{ $t('Cancel') }}</md-button>
              <md-button class="md-primary" @click="storeProject(newProject)">{{ $t('Create') }}</md-button>
            </md-dialog-actions>
          </md-dialog>

          <md-list class="custom-list md-triple-line" v-if="!isProjectsPending">

              <md-list-item v-for="project in filteredProjects" :key="project.name" @click="onProjectClick(project.slug)">

                <md-avatar>
                  <img v-bind:src="project.avatar" alt="People">
                </md-avatar>

                <div class="md-list-text-container">
                  <span>{{project.name}}</span>
                  <span>{{project.description}}</span>
                  <span>
                    <div class="progress-bar">
                      <div class="fill-wrapper" :style="{ width: project.progress + '%' }"></div>
                      <span class="percentage">{{project.progress}}%</span>
                    </div>
                  </span>
                  <p>
                    <md-chip class="md-default" v-for="tag in project.tags" :key="tag">
                      {{tag}}
                    </md-chip>
                  </p>
                </div>

                <md-button class="md-icon-button md-list-action" @click="toggleCompleted(project.name)">
                  <md-icon class="md-default" v-if="!project.completed">done</md-icon>
                  <md-icon class="md-primary" v-if="project.completed">done</md-icon>
                </md-button>

                <md-button class="md-icon-button md-list-action" @click="toggleFavorite(project.name)">
                  <md-icon class="md-default" v-if="!project.favorited">star</md-icon>
                  <md-icon class="md-primary" v-if="project.favorited">star</md-icon>
                </md-button>

                <md-divider class="md-inset"></md-divider>
              </md-list-item>
            </a>

          </md-list>
        </div>
      </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        data () {
          return {
            filter: 'all',
            query: '',
            newProject: {
              name: '',
              description: '',
              tags: [],
              completed: false,
              favorited: false,
              progress: 0
            },
          }
        },
        methods: {
            ...mapActions(['fetchProjects', 'toggleFavorite', 'toggleCompleted']),
            storeProject(newProject) {
              this.$store.dispatch('storeProject', newProject);
              this.closeDialog('addProject');
              this.resetNewProjectData();
            },
            resetNewProjectData() {
              this.newProject = {
                name: '',
                description: '',
                tags: []                
              };
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
            onProjectClick(projectSlug) {
                this.$router.push("/projects/" + projectSlug)
            }
        },
        computed: {
            ...mapGetters(['allProjects', 'isProjectsPending']),
            filteredProjects() {
              let projects = [];

              switch(this.filter) {
                case 'all':
                  projects = this.allProjects;
                  break;
                case 'recents': 
                  projects = this.allProjects;
                  break;
                case 'favorites':
                  projects = this.allProjects.filter(project => project.favorited);
                  break;
                case 'completed':
                  projects = this.allProjects.filter(project => project.completed);
                  break;
              }

              return projects.filter(project => {
                return project.name.toLowerCase().includes(this.query.toLowerCase())
              });
            }
        },
        beforeMount() {
            this.fetchProjects();
        }
    }
</script>
