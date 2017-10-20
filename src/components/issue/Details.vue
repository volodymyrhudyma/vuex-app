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
                            <md-option value="1">Pam Beesly</md-option>
                            <md-option value="2">Angela Martin</md-option>
                            <md-option value="3">Kelly Kapoor</md-option>
                            <md-option value="4">Ryan Howard</md-option>
                            <md-option value="5">Kevin Malone</md-option>
                            <md-option value="6">Creed Bratton</md-option>
                            <md-option value="7">Oscar Nunez</md-option>
                            <md-option value="8">Toby Flenderson</md-option>
                            <md-option value="9">Stanley Hudson</md-option>
                            <md-option value="10">Meredith Palmer</md-option>
                            <md-option value="11">Phyllis Lapin-Vance</md-option>
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
                      <md-button class="md-raised">Edit</md-button>
                 </div>                   
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
            <dropzone id="myVueDropzone" url="https://httpbin.org/post" v-on:vdropzone-success="showSuccess">
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
  import { mapGetters, mapActions } from 'vuex'
  import Dropzone from 'vue2-dropzone/src/index.vue'

    export default {
        props: ['project', 'issue'],
        data() {
          return {
            commentInputShown: false,
            comment: {
              message: ''
            }
          }
        },
        computed: {
            ...mapGetters('issue', ['isIssueAssigneeChanging', 'isCommentSaving']),
          issueStatus() {
            return this.issue.status;
          }
        },
        components: {
          Dropzone
        },
        methods: {
          ...mapActions('issue', ['changeIssueStatus', 'changeIssueAssignee', 'saveComment', 'deleteComment']),
          showSuccess(file) {
            console.log('A file was successfully uploaded')
          },
          changeStatus(status) {
            let payload = {
              id: this.issue.id,
              status: status
            };
            this.changeIssueStatus(payload);
          },
          assigneeChanged(id) {
              this.changeIssueAssignee(id);
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
            }
            this.saveComment(comment);
            this.cancelComment();
            this.hideCommentInput();
          },
        }
    }
</script>