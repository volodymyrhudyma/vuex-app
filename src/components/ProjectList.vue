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
              <md-button class="md-primary" @click="saveProject(newProject)">{{ $t('Create') }}</md-button>
            </md-dialog-actions>
          </md-dialog>

          <md-list class="custom-list md-triple-line" v-if="!isProjectsPending && filteredProjects.length">

              <md-list-item v-for="(project, index) in filteredProjects" :key="project.name">              
                <md-avatar>
                  <img v-bind:src="project.avatar" alt="People">
                </md-avatar>

                <div class="md-list-text-container">
                  <a href="#" class="project-name" @click="onProjectClick(project.slug, $event)">{{project.name}}</a>
                  <span>{{project.description}}</span>
                  <span>Finish: {{project.finishAt.format("MMM Do YY")}}</span>
                  <p>
                    <md-chip class="md-default" v-for="tag in project.tags" :key="tag">
                      {{tag}}
                    </md-chip>
                  </p>
                </div>

                <md-button class="md-icon-button md-list-action" @click="showInfo(project.name)">
                  <md-icon class="md-default info-icon" >info_outline</md-icon>
                </md-button>

                <md-dialog md-open-from="#abs" md-close-to="#abs" :ref="'seeInfo-' + project.name" class="see-info-dialog">
                  <md-dialog-title>{{ $t('Information') }}</md-dialog-title>

                  <md-dialog-content>
                    <div>
                        The top progress bar calculates your perfect progress.
                    </div>
                    <div>
                        <div class="progress-bar">                      
                          <div class="fill-wrapper" :style="{ width: project.progress + '%', background: project.trend === 'up' ? '#7CB342' : project.trend === 'down' ? '#d32f2f' : 'rgba(0, 0, 0, 0.12)' }"></div>
                          <span class="percentage">{{project.progress}}%</span>
                        </div>
                    </div>
                    <div>
                      The bottom progress bar calculates your actual progress.
                    </div>
                    <div>                      
                      <div class="perfect-progress-bar">
                        <div class="fill-wrapper" :style="{ width: project.perfectProgress + '%' }"></div>
                        <span class="percentage">{{project.perfectProgress}}%</span>
                      </div>
                    </div>
                    <div>For the current project, your perfect progress in the current time should be: <span class="value">{{project.perfectProgress}}</span></div>
                    <div>It really is: <span class="value">{{project.progress}}</span></div>
                    <div :class="'tip' + (project.progress >= project.perfectProgress ? ' ok' : ' lack')">
                      {{project.progress === project.perfectProgress ? 
                        'The project is completed, cool!' 
                      : project.progress >= project.perfectProgress ?
                        'Well, you should go on this way and the project will be completed in time!' 
                      :
                        'Consider speeding up your development!'
                      }}
                    </div>
                  </md-dialog-content>

                  <md-dialog-actions>
                    <md-button class="md-primary" @click="hideInfo(project.name)">{{ $t('Got it') }}</md-button>
                  </md-dialog-actions>
                </md-dialog>

                <span>
                    <div class="perfect-progress-bar">
                      <div class="fill-wrapper" :style="{ width: project.perfectProgress + '%' }"></div>
                      <span class="percentage">{{project.perfectProgress}}%</span>
                    </div>
                </span>
                <span>
                    <div class="progress-bar">                      
                      <div class="fill-wrapper" :style="{ width: project.progress + '%', background: project.trend === 'up' ? '#7CB342' : project.trend === 'down' ? '#d32f2f' : 'rgba(0, 0, 0, 0.12)' }"></div>
                      <span class="percentage">{{project.progress}}%</span>
                    </div>
                </span>

                <md-button class="md-icon-button md-list-action" @click="toggleCompleted(project.name)">
                  <md-icon class="md-default" v-if="!project.completed">done</md-icon>
                  <md-icon class="md-primary" v-if="project.completed">done</md-icon>
                </md-button>

                <md-button class="md-icon-button md-list-action" @click="toggleFavorite(project.name)">
                  <md-icon class="md-default" v-if="!project.favorited">star</md-icon>
                  <md-icon class="md-primary" v-if="project.favorited">star</md-icon>
                </md-button>

                <md-button class="md-icon-button md-list-action" @click="deleteProject(project.name)">
                  <md-icon class="md-warn">delete</md-icon>
                </md-button>

                <md-divider class="md-inset"></md-divider>
              </md-list-item>

          </md-list>

          <div class="empty-list" v-if="!isProjectsPending && !filteredProjects.length">
            No projects of the type <span class="filter-name">{{filter}}</span> found
          </div>

        </div>
      </div>
    </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex'
    const { mapGetters, mapActions } = createNamespacedHelpers('project')

    export default {
        data () {
          return {
            filter: 'all',
            query: '',
            newProject: {
              name: '',
              description: '',
              slug: '',
              tags: [],
              completed: false,
              favorited: false,
              progress: 0
            },
          }
        },
        methods: {
            ...mapActions(['fetchProjects', 'storeProject', 'toggleFavorite', 'toggleCompleted', 'deleteProject']),
            saveProject(newProject) {
              this.slugifyNewProject(newProject);
              this.storeProject(newProject);
              this.closeDialog('addProject');
              this.resetNewProjectData();
            },
            slugifyNewProject(newProject) {
                newProject.slug = this.slugify(newProject.name);
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
            onProjectClick(projectSlug, e) {
                if(e) e.preventDefault();
                this.$router.push("/projects/" + projectSlug)
            },
            showInfo(projectName) {
              let ref = 'seeInfo-' + projectName;
              this.$refs[ref][0].open();
            },
            hideInfo(projectName) {
              let ref = 'seeInfo-' + projectName;
              this.$refs[ref][0].close();
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
