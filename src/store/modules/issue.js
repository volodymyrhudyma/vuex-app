import toastr from 'toastr'
import axios from 'axios'

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
const FETCH_LATEST_ISSUE = "FETCH_LATEST_ISSUE";
const FETCH_LATEST_ISSUE_START = "FETCH_LATEST_ISSUE_START";

const state = {
    issues: null,
    issue: null,
    isIssuesPending: false,
    isIssuePending: false,
    isIssueStatusChanging: false,
    isIssueAssigneeChanging: false,
    isCommentSaving: false,
    isLatestIssueFetching: false
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
    [FETCH_LATEST_ISSUE_START] (state) {
        state.isLatestIssueFetching = true;
    },
    [FETCH_ISSUES] (state, issues) {
        state.issues = issues;
        state.isIssuesPending = false;
    },
    [FETCH_ISSUE] (state, issue) {
        issue.reporter = {
            name: 'Andrew Hopkins',
            avatar: 'avatar',
            link: 'link'
        };
        issue.assignee = {
            name: 'Joy Rones',
            avatar: 'avatar',
            link: 'link'
        };
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
    },
    [CHANGE_ISSUE_STATUS] (state, status) {    
        state.issue.status = status;
        state.isIssueStatusChanging = false;
    },
    [CHANGE_ISSUE_ASSIGNEE] (state, assigneeId) {
        state.issue.assignee = {
            name: 'Changed',
            avatar: 'changed',
            link: 'changed'
        };
        state.isIssueAssigneeChanging = false;
    },
    [SAVE_COMMENT] (state, comment) {
        state.issue.comments.push(comment);
        state.isCommentSaving = false;
    },
    [FETCH_LATEST_ISSUE] (state, issue) {
        issue.reporter = {
            name: 'Andrew Hopkins',
            avatar: 'avatar',
            link: 'link'
        };
        issue.assignee = {
            name: 'Joy Rones',
            avatar: 'avatar',
            link: 'link'
        };
        state.issue = issue;
        state.isLatestIssueFetching = false;
    },
};

const actions = {
    fetchIssues: ({ commit }, projectId) => {
        commit(FETCH_START);
        return axios.get('http://localhost:1337/issue/find')
          .then(function (response) {                
            commit(FETCH_ISSUES, response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    fetchIssue: ({ commit }, id) => {
        commit(FETCH_ISSUE_START);
        return axios.get('http://localhost:1337/issue/find/' + id)
          .then(function (response) {                
            commit(FETCH_ISSUE, response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    changeIssueStatus: ({ commit }, payload) => {
        commit(CHANGE_ISSUE_STATUS_START);
        return axios.post('http://localhost:1337/issue/' + payload.id + '/changeStatus', {status: payload.status})
          .then(function (response) {                
            commit(CHANGE_ISSUE_STATUS, payload.status);
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    changeIssueAssignee: ({ commit }, assigneeId) => {
        commit(CHANGE_ISSUE_ASSIGNEE_START);
        return new Promise(resolve => {
            setTimeout(() => {
                commit(CHANGE_ISSUE_ASSIGNEE, assigneeId);
                resolve();
            }, 1000);
        });
    },
    saveComment: ({ commit }, comment) => {
        commit(SAVE_COMMENT_START);
        return new Promise(resolve => {
            setTimeout(() => {
                commit(SAVE_COMMENT, comment);
                resolve();
            }, 1000);
        });
    },
    storeIssue: ({ commit }, issue) => {
        return axios.post('http://localhost:1337/issue/create', issue)
          .then(function (response) {
            commit(STORE_ISSUE, issue);
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    deleteIssue: ({ commit }, id) => {
        return axios.delete('http://localhost:1337/issue/destroy/' + id)
          .then(function (response) {                
            commit(DELETE_ISSUE, id);
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    fetchLatestIssue: ({ commit }) => {
        return axios.get('http://localhost:1337/issue/latest')
          .then(function (response) {                
            commit(FETCH_LATEST_ISSUE, response.data.issue);
          })
          .catch(function (error) {
            console.log(error);
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
                case 'bugs':
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
    isLatestIssueFetching: state => {
        return state.isLatestIssueFetching
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};