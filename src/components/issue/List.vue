<template>
   <div class="flex-wrapper">
       <div class="add-section" v-if="!hideAddBtn">

           <md-button class="md-icon-button md-raised md-primary" @click="openDialog('addIssue')">
               <md-icon>add</md-icon>
           </md-button>
       </div>
       <div class="list-section">

           <div class="phone-viewport filter-panel">
               <md-bottom-bar md-theme="teal">
                   <md-bottom-bar-item md-icon="list" md-active @click="setFilter('all')">{{ $t('All') }}</md-bottom-bar-item>
                   <md-bottom-bar-item md-icon="donut_small" @click="setFilter('sub-tasks')">{{ $t('Sub-tasks') }}</md-bottom-bar-item>
                   <md-bottom-bar-item md-icon="build" @click="setFilter('tasks')">{{ $t('Tasks') }}</md-bottom-bar-item>
                   <md-bottom-bar-item md-icon="bug_report" @click="setFilter('bugs')">{{ $t('Bugs') }}</md-bottom-bar-item>
               </md-bottom-bar>

                <div class="status">
                  <md-input-container>
                    <label for="filter">Filter</label>
                    <md-select name="filter" id="filter" v-model="filter">
                      <md-option value="to-do">To Do</md-option>
                      <md-option value="in-progress">In Progress</md-option>
                      <md-option value="done">Done</md-option>
                    </md-select>
                  </md-input-container>
                </div>

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

               <div class="wrapper-loader" v-if="isIssuesPending">
                   <md-spinner :md-size="60" md-indeterminate class="md-primary"></md-spinner>
               </div>

               <md-dialog md-open-from="#fab" md-close-to="#fab" ref="addIssue">
                   <md-dialog-title>{{ $t('Create new issue') }}</md-dialog-title>

                   <md-dialog-content>
                       <form>
                           <md-input-container>
                               <label>{{ $t('Name') }}</label>
                               <md-textarea v-model="newIssue.name"></md-textarea>
                           </md-input-container>
                           <md-input-container>
                               <label>{{ $t('Description') }}</label>
                               <md-textarea v-model="newIssue.description"></md-textarea>
                           </md-input-container>
                           <md-input-container>
                               <label>{{ $t('Type') }}</label>
                               <md-textarea v-model="newIssue.type"></md-textarea>
                           </md-input-container>
                           <md-input-container>
                               <label>{{ $t('Status') }}</label>
                               <md-textarea v-model="newIssue.status"></md-textarea>
                           </md-input-container>
                           <md-input-container>
                               <label>{{ $t('Project id') }}</label>
                               <md-textarea v-model="newIssue.projectId"></md-textarea>
                           </md-input-container>
                           <md-input-container>
                               <label>{{ $t('Priority') }}</label>
                               <md-textarea v-model="newIssue.priority"></md-textarea>
                           </md-input-container>
                       </form>
                   </md-dialog-content>

                   <md-dialog-actions>
                       <md-button class="md-primary" @click="closeDialog('addIssue')">{{ $t('Cancel') }}</md-button>
                       <md-button class="md-primary" @click="saveIssue(newIssue)">{{ $t('Create') }}</md-button>
                   </md-dialog-actions>
               </md-dialog>

               <md-list class="custom-list md-triple-line" v-if="!isIssuesPending && filteredIssues.length">
                   <md-list-item v-for="(issue, key) in filteredIssues" :key="issue.name" @click="onIssueClick(issue.id)">

                       <md-avatar class="avatar">
                           {{++key}}
                       </md-avatar>

                       <div class="md-list-text-container">
                           <span>{{issue.name}}</span>
                           <span>{{issue.description}}</span>
                       </div>

                       <md-button class="md-icon-button md-list-action" @click="deleteIssue(issue.id)">
                          <md-icon class="md-warn">delete</md-icon>
                        </md-button>

                       <md-divider class="md-inset"></md-divider>
                   </md-list-item>
               </md-list>

               <div class="empty-list" v-if="!isIssuesPending && !filteredIssues.length">
                   No issues of the type <span class="filter-name">{{filter}}</span> found
               </div>

           </div>
       </div>
    </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex'
    const { mapGetters, mapActions } = createNamespacedHelpers('issue')

    export default {
        props: ['hideAddBtn'],
        data () {
            return {
                filter: 'all',
                query: '',
                newIssue: {
                    name: '',
                    slug: '',
                    description: '',
                    type: '',
                    status: 'to-do',
                    projectId: '',
                    priority: '',
                    comments: []
                },
            }
        },
        computed: {
            ...mapGetters(['allIssues', 'isIssuesPending']),
            filteredIssues() {
                console.log('filtered')
                let issues = [];

                switch(this.filter) {
                    case 'all':
                        issues = this.allIssues;
                        break;
                    case 'sub-tasks':
                        issues = this.allIssues.filter(issue => issue.type === 'sub-task');
                        break;
                    case 'tasks':
                        issues = this.allIssues.filter(issue => issue.type === 'task');
                        break;
                    case 'bugs':
                        issues = this.allIssues.filter(issue => issue.type === 'bug');
                        break;
                    case 'to-do':
                        issues = this.allIssues.filter(issue => issue.status === 'to-do');
                        break;
                    case 'in-progress':
                        issues = this.allIssues.filter(issue => issue.status === 'in-progress');
                        break;
                    case 'done':
                        issues = this.allIssues.filter(issue => issue.status === 'done');
                        break;
                    default:
                        break;
                }

                return issues.filter(issue => {
                    return issue.name.toLowerCase().includes(this.query.toLowerCase())
                });
            },
        },
        methods: {
            ...mapActions(['fetchIssues', 'fetchIssue', 'storeIssue', 'deleteIssue']),
            saveIssue(newIssue) {
                this.slugifyNewIssue(newIssue);
                this.storeIssue(newIssue);
                this.closeDialog('addIssue');
                this.resetNewIssueData();
            },
            slugifyNewIssue(newIssue) {
                newIssue.slug = this.slugify(newIssue.name);
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
            resetNewIssueData() {
                this.newIssue = {
                    name: '',
                    description: '',
                    slug: '',
                    type: ''
                }
            },
            onIssueClick(id) {
                this.fetchIssue(id);
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
            let projectId = this.$route.params.id;
            this.fetchIssues(projectId);
        }
    }
</script>