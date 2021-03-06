import axios from 'axios'
import { 
    ISSUE_ALL,
    ISSUE_FIND,
    ISSUE_CHANGE_STATUS,
    ISSUE_CHANGE_ASSIGNEE,
    ISSUE_COMMENT_CREATE,
    ISSUE_COMMENT_DELETE,
    ISSUE_CREATE,
    ISSUE_DELETE,
    ISSUE_EDIT,
    ISSUE_ATTACHMENT_UPLOAD,
} from '../../config/endpoints.js';

const FETCH_ISSUES = "FETCH_ISSUES";
const FETCH_ISSUE = "FETCH_ISSUE";
const FETCH_ISSUE_START = "FETCH_ISSUE_START";
const FETCH_START = "FETCH_START";
const STORE_ISSUE = "STORE_ISSUE";
const DELETE_ISSUE = "DELETE_ISSUE";
const CHANGE_ISSUE_STATUS_START = "CHANGE_ISSUE_STATUS_START";
const CHANGE_ISSUE_STATUS = "CHANGE_ISSUE_STATUS";
const CHANGE_ISSUE_ASSIGNEE_START = "CHANGE_ISSUE_ASSIGNEE_START";
const CHANGE_ISSUE_ASSIGNEE = "CHANGE_ISSUE_ASSIGNEE";
const SAVE_COMMENT_START = "SAVE_COMMENT_START";
const SAVE_COMMENT = "SAVE_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";
const EDIT_ISSUE_START = "EDIT_ISSUE_START";
const EDIT_ISSUE = "EDIT_ISSUE";
const UPDATE_FIELD = "UPDATE_FIELD";

const state = {
    issues: null,
    issue: null,
    isIssuesPending: false,
    isIssuePending: false,
    isIssueStatusChanging: false,
    isIssueAssigneeChanging: false,
    isCommentSaving: false,
    isIssueEditing: false,
};

const mutations = {
    [FETCH_START] (state) {
        state.isIssuesPending = true;
    },
    [FETCH_ISSUE_START] (state) {
        state.isIssuePending = true;
    },
    [CHANGE_ISSUE_STATUS_START] (state) {
        state.isIssueStatusChanging = true;
    },
    [CHANGE_ISSUE_ASSIGNEE_START] (state) {
        state.isIssueAssigneeChanging = true;
    },
    [SAVE_COMMENT_START] (state) {
        state.isCommentSaving = true;
    },
    [FETCH_ISSUES] (state, issues) {
        state.issues = issues;
        state.isIssuesPending = false;
    },
    [FETCH_ISSUE] (state, issue) {        
        state.issue = issue;        
        state.isIssuePending = false;
    },
    [STORE_ISSUE] (state, issue) {
        state.issues.push(issue);
    },
    [DELETE_ISSUE] (state, id) {
        let issue = state.issues.filter(issue => {
            return issue.id === id;
        })[0];
        state.issues.splice(state.issues.indexOf(issue), 1);
        state.issue = null;
    },
    [CHANGE_ISSUE_STATUS] (state, status) {    
        state.issue.status = status;
        state.isIssueStatusChanging = false;
    },
    [CHANGE_ISSUE_ASSIGNEE] (state, assignee) {
        state.issue.assignee = assignee;
        state.isIssueAssigneeChanging = false;
    },
    [SAVE_COMMENT] (state, comment) {
        state.issue.comments.push(comment);
        state.isCommentSaving = false;
    },
    [DELETE_COMMENT] (state, id) {
        let comment = state.issue.comments.filter(comment => {
            return comment.id === id;
        })[0];
        state.issue.comments.splice(state.issue.comments.indexOf(comment), 1);
    },
    [EDIT_ISSUE_START] (state) {
        state.isIssueEditing = true;
    },
    [EDIT_ISSUE] (state, issue) {
        state.issue = issue;
        state.isIssueEditing = false;
    },
    [UPDATE_FIELD] (state, payload) {
        state.issue[payload.name] = payload.value;
    },
};

const actions = {
    fetchIssues: ({ dispatch, commit }, projectId) => {
        commit(FETCH_START);
        return axios.get(ISSUE_ALL + '?projectId=' + projectId)
          .then(function (response) {                
            commit(FETCH_ISSUES, response.data);
          })
          .catch(function (error) {
            dispatch('handleError', error, {root: true});
          });
    },
    fetchIssue: ({ dispatch, commit }, id) => {
        commit(FETCH_ISSUE_START);
        return axios.get(ISSUE_FIND + '/' + id)
          .then(function (response) {                
            commit(FETCH_ISSUE, response.data);
          })
          .catch(function (error) {
            dispatch('handleError', error, {root: true});
          });
    },
    changeIssueStatus: ({ dispatch, commit }, payload) => {
        commit(CHANGE_ISSUE_STATUS_START);
        return axios.post(ISSUE_CHANGE_STATUS + '/' + payload.id + '/changeStatus', {status: payload.status})
          .then(function (response) {                
            commit(CHANGE_ISSUE_STATUS, payload.status);
          })
          .catch(function (error) {
            dispatch('handleError', error, {root: true});
          });
    },
    changeIssueAssignee: ({ dispatch, commit }, payload) => {
        commit(CHANGE_ISSUE_ASSIGNEE_START);
        return axios.post(ISSUE_CHANGE_ASSIGNEE + '/' + payload.id + '/changeAssignee', {assignee: payload.assignee})
          .then(function (response) {                
            commit(CHANGE_ISSUE_ASSIGNEE, response.data.assignee);
          })
          .catch(function (error) {
            dispatch('handleError', error, {root: true});
          });
    },
    saveComment: ({ dispatch, commit }, comment) => {
        commit(SAVE_COMMENT_START);        
        return axios.post(ISSUE_COMMENT_DELETE + '/' + comment.id + '/comments/create', comment)
          .then(function (response) {
            commit(SAVE_COMMENT, response.data);
          })
          .catch(function (error) {
            dispatch('handleError', error, {root: true});
          });
    },
    deleteComment: ({ dispatch, commit }, id) => {
        return axios.post(ISSUE_COMMENT_DELETE + '/' + id)
          .then(function (response) {
            commit(DELETE_COMMENT, id);
          })
          .catch(function (error) {
            dispatch('handleError', error, {root: true});
          });
    },
    storeIssue: ({ dispatch, commit }, issue) => {
        return axios.post(ISSUE_CREATE, issue)
          .then(function (response) {
            issue.id = response.data.id;
            commit(STORE_ISSUE, issue);
          })
          .catch(function (error) {
            dispatch('handleError', error, {root: true});
          });
    },
    deleteIssue: ({ dispatch, commit }, id) => {
        return axios.delete(ISSUE_DELETE + '/' + id)
          .then(function (response) {                
            commit(DELETE_ISSUE, id);
          })
          .catch(function (error) {
            dispatch('handleError', error, {root: true});
          });
    },
    editIssue: ({ dispatch, commit }, issue) => {
        commit(EDIT_ISSUE_START);
        return axios.post(ISSUE_EDIT + '/' + issue.id, issue)
          .then(function (response) {                
            commit(EDIT_ISSUE, response.data);
          })
          .catch(function (error) {
            dispatch('handleError', error, {root: true});
          });
    },
    uploadAttachment: ({ dispatch, commit }, payload) => {
        console.log(payload);
        return axios.post(ISSUE_ATTACHMENT_UPLOAD + '/' + payload.id + '/attachments/create', payload)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                dispatch('handleError', error, {root: true});
            });
    },
};

const getters = {
    allIssues: state => {
        return state.issues
    },
    isIssuesPending: state => {
        return state.isIssuesPending
    },
    issueStats: state => {
        let tasks = 0,
            subTasks = 0,
            bugs = 0;
        state.issues.map(issue => {
            switch(issue.type) {
                case 'task':
                    tasks++;
                    break;
                case 'sub-task':
                    subTasks++;
                    break;
                case 'bug':
                    bugs++;
                    break;
                default:
                    break;
            }
        });
        return [tasks, subTasks, bugs];
    },
    issueLabels: state => {
        return ['Tasks', 'Sub-tasks', 'Bugs'];
    },
    issue: state => {
        return state.issue;
    },
    isIssuePending: state => {
        return state.isIssuePending
    },
    isIssueAssigneeChanging: state => {
        return state.isIssueAssigneeChanging
    },
    isCommentSaving: state => {
        return state.isCommentSaving
    },
    isIssueEditing: state => {
        return state.isIssueEditing
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};