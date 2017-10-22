<template>
  <div class="general-info">
    <div class="heading">
        Open issues
    </div>
    <div class="issue">
        <div v-if="issue">
          <div class="head">
              <div class="avatar">
                  A
              </div>
              <div class="info">
                  <div class="breadcrumb">
                      {{project.name}} / {{issue.id}}
                  </div>
                  <div class="title">
                      {{issue.name}}
                  </div>
              </div>
              <div class="workers">
                  <div class="assignee">
                      <span class="title">
                          Assignee:
                      </span>
                      <span class="name">
                          {{issue.assignee.name}}
                      </span>
                      <div class="wrapper-loader" v-if="isIssueAssigneeChanging">
                          <md-spinner :md-size="25" md-indeterminate class="md-primary"></md-spinner>
                      </div>
                      <span class="change">
                          <md-select name="assignee" id="assignee" v-on:change="assigneeChanged" v-if="!isIssueAssigneeChanging">
                            <md-button class="md-icon-button" md-menu-trigger slot="icon">
                              <md-icon>mode_edit</md-icon>
                            </md-button>
                            <md-option value="59e9e5dc2e05d6742497361d">Name2</md-option>
                          </md-select>
                      </span>
                  </div>
                  <div class="reporter">
                      <span class="title">
                          Reporter:
                      </span>
                      <span class="name">
                          {{issue.reporter.name}}
                      </span>
                  </div>
              </div>
         </div>
         <div class="manager">
              <div class="actions">
                  <div class="item">
                      <md-button class="md-raised" @click="openDialog('editIssue')">Edit</md-button>
                 </div>


                <md-dialog md-open-from="#fab" md-close-to="#fab" ref="editIssue" class="edit-issue-dialog">
                   <md-dialog-title>{{ $t('Edit issue') }}</md-dialog-title>

                   <md-dialog-content>
                       <form>
                           <md-input-container>
                               <label>{{ $t('Name') }}</label>
                               <md-textarea v-model="name"></md-textarea>
                           </md-input-container>
                           <md-input-container>
                               <label>{{ $t('Description') }}</label>
                               <md-textarea v-model="description"></md-textarea>
                           </md-input-container>
                           <md-input-container>
                            <label for="type">Type</label>
                            <md-select name="type" id="type" v-model="type">
                              <md-option value="task">Task</md-option>
                              <md-option value="sub-task">Sub task</md-option>
                              <md-option value="bug">Bug</md-option>
                            </md-select>
                          </md-input-container>
                          <md-input-container>
                            <label for="type">Status</label>
                            <md-select name="type" id="type" v-model="status">
                              <md-option value="to-do">To do</md-option>
                              <md-option value="in-progress">In progress</md-option>
                              <md-option value="done">Done</md-option>
                            </md-select>
                          </md-input-container>
                           <md-input-container>
                            <label for="priority">Priority</label>
                            <md-select name="priority" id="priority" v-model="priority">
                              <md-option value="low">Low</md-option>
                              <md-option value="medium">Medium</md-option>
                              <md-option value="high">High</md-option>
                            </md-select>
                          </md-input-container>
                       </form>
                   </md-dialog-content>

                   <md-dialog-actions>
                       <md-button class="md-primary" @click="closeDialog('editIssue')">{{ $t('Cancel') }}</md-button>
                       <md-button class="md-primary" @click="editIssue(issue)">{{ $t('Create') }}</md-button>
                   </md-dialog-actions>
               </md-dialog>


              </div>
              <div class="status">
                  <div class="item">
                      <md-button :class="'md-raised to-do ' + [issueStatus === 'to-do' ? 'active' : '']" @click="changeStatus('to-do')">To Do</md-button>
                 </div>
                 <div class="item">
                     <md-button :class="'md-raised in-progress ' + [issueStatus === 'in-progress' ? 'active' : '']" @click="changeStatus('in-progress')">In Progress</md-button>
                 </div>
                 <div class="item">
                     <md-button :class="'md-raised done ' + [issueStatus === 'done' ? 'active' : '']" @click="changeStatus('done')">Done</md-button>
                 </div>
              </div>
         </div>
         <div class="details">
          <div class="section">
            Details
          </div>
           <div class="type">
             <span>Type</span>
             <span>{{issue.type}}</span>
           </div>
           <div class="status">
             <span>Status</span>
             <span>{{issueStatus}}</span>
           </div>
           <div class="priority">
             <span>Priority</span>
             <span>{{issue.priority}}</span>
           </div>
         </div>
         <div class="description">
           <div class="section">
             Description
           </div>
           <div class="value">
             {{issue.description}}
           </div>
         </div>
         <div class="attachments">
           <div class="section">
             Attachments
           </div>
           <div class="value">
            <dropzone id="myVueDropzone" :url="'http://localhost:1337/issue/' + issue.id + '/attachments/create'" v-on:vdropzone-success="showSuccess">
                <input type="hidden" name="token" value="xxx">
            </dropzone>
           </div>
         </div>
         <div class="activity">
           <div class="section">
             Comments
           </div>
           <div class="comments-container">
             <div class="comments">


              <div class="phone-viewport" v-if="issue.comments.length">
                <md-list class="custom-list md-triple-line md-dense">

                  <md-list-item v-for="comment in issue.comments">
                    <md-avatar>
                      <img src="https://placeimg.com/40/40/people/1" alt="People">
                    </md-avatar>

                    <div class="md-list-text-container">
                      <span>{{comment.author}}</span>
                      <p>{{comment.message}}</p>
                    </div>

                    <md-button class="md-icon-button md-list-action" @click="deleteComment(comment.id)">
                      <md-icon class="md-primary">delete</md-icon>
                    </md-button>

                    <md-divider class="md-inset"></md-divider>
                  </md-list-item>

                </md-list>
              </div>

              <div class="empty" v-if="!issue.comments.length">
                  There are no comments yet on this issue.
              </div>

               
             </div>
             <div class="add-comment" v-if="!commentInputShown">
                <md-button class="md-icon-button md-raised" @click="showCommentInput">
                  <md-icon>add</md-icon>
                </md-button>
             </div>
             <div class="comment-input" v-if="commentInputShown">
              <form novalidate @submit.stop.prevent="submit">
                 <md-input-container>
                  <md-icon>speaker_notes</md-icon>
                  <label>Notes</label>
                  <md-textarea v-model="comment.message"></md-textarea>
                </md-input-container>
                <md-button class="md-raised md-primary" @click="addComment()">Add</md-button>
                <md-button @click="cancelComment">Cancel</md-button>
              </form>
             </div>
           </div>
         </div>
       </div>
       <div class="empty" v-if="!issue">
           You haven't opened any issue yet.
       </div>
     </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapState } from 'vuex'
  import Dropzone from 'vue2-dropzone/src/index.vue'
  import vSelect from 'vue-select'

    export default {
        props: ['project'],
        data() {
          return {
            commentInputShown: false,
            comment: {
              message: ''
            },
            teamMembers: [
              {
                label: 'Andrew Hopkins',
                value: '59ea1be562b2200503c36bd0'
              },
              {
                label: 'Rafal Makes',
                value: '59ea1be562b2200503c36bd0'
              },
            ],
          }
        },
        computed: {
            ...mapGetters('issue', ['isIssueAssigneeChanging', 'isCommentSaving', 'issue']),
          issueStatus() {
            return this.issue.status;
          },
          name: {
            get () {
              return this.$store.state.issue.issue.name;
            },
            set (value) {
              this.$store.commit('issue/UPDATE_FIELD', {name: 'name', value: value});
            }
          },
          description: {
            get () {
              return this.$store.state.issue.issue.description;
            },
            set (value) {
              this.$store.commit('issue/UPDATE_FIELD', {name: 'description', value: value});
            }
          },
          type: {
            get () {
              return this.$store.state.issue.issue.type;
            },
            set (value) {
              this.$store.commit('issue/UPDATE_FIELD', {name: 'type', value: value});
            }
          },
          status: {
            get () {
              return this.$store.state.issue.issue.status;
            },
            set (value) {
              this.$store.commit('issue/UPDATE_`FIELD', {name: 'status', value: value});
            }
          },
          priority: {
            get () {
              return this.$store.state.issue.issue.priority;
            },
            set (value) {
              this.$store.commit('issue/UPDATE_FIELD', {name: 'priority', value: value});
            }
          },
        },
        components: {
          Dropzone,
          vSelect
        },
        methods: {          
          ...mapActions('issue', ['changeIssueStatus', 'changeIssueAssignee', 'saveComment', 'deleteComment', 'editIssue', 'uploadAttachment']),
          showSuccess(file) {
            console.log('success');
          },
          changeStatus(status) {
            let payload = {
              id: this.issue.id,
              status: status
            };
            this.changeIssueStatus(payload);
          },
          assigneeChanged(assignee) {
            let payload = {
              id: this.issue.id,
              assignee: assignee
            };
            this.changeIssueAssignee(payload);            
          },
          showCommentInput() {
            this.commentInputShown = true;
          },
          hideCommentInput() {
            this.commentInputShown = false;
          },
          cancelComment() {
            this.comment = {
              message: ''
            };
          },
          addComment() {
            let comment = {
              author: 'Volodymyr Hudyma',
              message: this.comment.message,
              id: this.issue.id,
              type: 'issue'
            };
            this.saveComment(comment);
            this.cancelComment();
            this.hideCommentInput();
          },
          openDialog(ref) {
              this.$refs[ref].open();
          },
          closeDialog(ref) {
              this.$refs[ref].close();
          },
        }
    }
</script>