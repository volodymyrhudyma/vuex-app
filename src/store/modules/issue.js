import toastr from 'toastr'

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

const state = {
    issues: null,
    issue: {
        id: 9,
        name: 'Issue 9',
        slug: 'issue-9',
        description: 'Description',
        type: 'task',
        status: 'done',
        projectId: 3,
        reporter: {
            name: 'Andrew Hopkins',
            avatar: 'avatar',
            link: 'link'
        },
        assignee: {
            name: 'Joy Rones',
            avatar: 'avatar',
            link: 'link'
        }
    },
    isIssuesPending: false,
    isIssuePending: false,
    isIssueStatusChanging: false,
    isIssueAssigneeChanging: false,
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
    [FETCH_ISSUES] (state, projectId = null) {    
        let issues = [
            {
                id: 1,
                name: 'Issue 1',
                slug: 'issue-1',
                description: 'Description',
                type: 'task',
                status: 'done',
                projectId: 1,
                reporter: {
                    name: 'Andrew Hopkins',
                    avatar: 'avatar',
                    link: 'link'
                },
                assignee: {
                    name: 'Joy Rones',
                    avatar: 'avatar',
                    link: 'link'
                }
            },
            {
                id: 2,
                name: 'Issue 2',
                slug: 'issue-2',
                description: 'Description',
                type: 'task',
                status: 'done',
                projectId: 1,
                reporter: {
                    name: 'Andrew Hopkins',
                    avatar: 'avatar',
                    link: 'link'
                },
                assignee: {
                    name: 'Joy Rones',
                    avatar: 'avatar',
                    link: 'link'
                }
            },
            {
                id: 3,
                name: 'Issue 3',
                slug: 'issue-3',
                description: 'Description',
                type: 'task',
                status: 'in-progress',
                projectId: 1,
                reporter: {
                    name: 'Andrew Hopkins',
                    avatar: 'avatar',
                    link: 'link'
                },
                assignee: {
                    name: 'Joy Rones',
                    avatar: 'avatar',
                    link: 'link'
                }
            },
            {
                id: 4,
                name: 'Issue 4',
                slug: 'issue-4',
                description: 'Description',
                type: 'task',
                status: 'to-do',
                projectId: 2,
                reporter: {
                    name: 'Andrew Hopkins',
                    avatar: 'avatar',
                    link: 'link'
                },
                assignee: {
                    name: 'Joy Rones',
                    avatar: 'avatar',
                    link: 'link'
                }
            },
            {
                id: 5,
                name: 'Issue 5',
                slug: 'issue-5',
                description: 'Description',
                type: 'task',
                status: 'done',
                projectId: 2,
                reporter: {
                    name: 'Andrew Hopkins',
                    avatar: 'avatar',
                    link: 'link'
                },
                assignee: {
                    name: 'Joy Rones',
                    avatar: 'avatar',
                    link: 'link'
                }
            },
            {
                id: 6,
                name: 'Issue 6',
                slug: 'issue-6',
                description: 'Description',
                type: 'task',
                status: 'done',
                projectId: 2,
                reporter: {
                    name: 'Andrew Hopkins',
                    avatar: 'avatar',
                    link: 'link'
                },
                assignee: {
                    name: 'Joy Rones',
                    avatar: 'avatar',
                    link: 'link'
                }
            },
            {
                id: 7,
                name: 'Issue 7',
                slug: 'issue-7',
                description: 'Description',
                type: 'task',
                status: 'to-do',
                projectId: 3,
                reporter: {
                    name: 'Andrew Hopkins',
                    avatar: 'avatar',
                    link: 'link'
                },
                assignee: {
                    name: 'Joy Rones',
                    avatar: 'avatar',
                    link: 'link'
                }
            },
            {
                id: 8,
                name: 'Issue 8',
                slug: 'issue-8',
                description: 'Description',
                type: 'task',
                status: 'done',
                projectId: 3,
                reporter: {
                    name: 'Andrew Hopkins',
                    avatar: 'avatar',
                    link: 'link'
                },
                assignee: {
                    name: 'Joy Rones',
                    avatar: 'avatar',
                    link: 'link'
                }
            },
            {
                id: 9,
                name: 'Issue 9',
                slug: 'issue-9',
                description: 'Description',
                type: 'task',
                status: 'in-progress',
                projectId: 3,
                reporter: {
                    name: 'Andrew Hopkins',
                    avatar: 'avatar',
                    link: 'link'
                },
                assignee: {
                    name: 'Joy Rones',
                    avatar: 'avatar',
                    link: 'link'
                }
            },
            {
                id: 10,
                name: 'Issue 10',
                slug: 'issue-10',
                description: 'Description',
                type: 'task',
                status: 'in-progress',
                projectId: 4,
                reporter: {
                    name: 'Andrew Hopkins',
                    avatar: 'avatar',
                    link: 'link'
                },
                assignee: {
                    name: 'Joy Rones',
                    avatar: 'avatar',
                    link: 'link'
                }
            },
            {
                id: 11,
                name: 'Issue 11',
                slug: 'issue-11',
                description: 'Description',
                type: 'bug',
                status: 'done',
                projectId: 4,
                reporter: {
                    name: 'Andrew Hopkins',
                    avatar: 'avatar',
                    link: 'link'
                },
                assignee: {
                    name: 'Joy Rones',
                    avatar: 'avatar',
                    link: 'link'
                }
            },
            {
                id: 12,
                name: 'Issue 12',
                slug: 'issue-12',
                description: 'Description',
                type: 'sub-task',
                status: 'to-do',
                projectId: 10,
                reporter: {
                    name: 'Andrew Hopkins',
                    avatar: 'avatar',
                    link: 'link'
                },
                assignee: {
                    name: 'Joy Rones',
                    avatar: 'avatar',
                    link: 'link'
                }
            },
        ];
        if(projectId) {
            issues = issues.filter(issue => {
                return issue.projectId === projectId
            });
        }
        state.issues = issues;
        state.isIssuesPending = false;
    },
    [FETCH_ISSUE] (state, issueId) {    
        state.issue = {
            name: 'Issue 10',
            slug: 'issue-10',
            description: 'Description',
            type: 'task',
            status: 'in-progress',
            projectId: 4,
            reporter: {
                name: 'Andrew Hopkins',
                avatar: 'avatar',
                link: 'link'
            },
            assignee: {
                name: 'Joy Rones',
                avatar: 'avatar',
                link: 'link'
            }
        };
        state.isIssuePending = false;
    },
    [STORE_ISSUE] (state, issue) {
        state.issues.push(issue);
    },
    [DELETE_ISSUE] (state, issueSlug) {
        let issue = state.issues.filter(issue => {
            return issue.slug === issueSlug;
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
};

const actions = {
    fetchIssues: ({ commit }, projectId) => {
        commit(FETCH_START);
        return new Promise(resolve => {
            setTimeout(() => {
                commit(FETCH_ISSUES, projectId);
                resolve();
            }, 1000);
        });
    },
    fetchIssue: ({ commit }, issueId) => {
        commit(FETCH_ISSUE_START);
        return new Promise(resolve => {
            setTimeout(() => {
                commit(FETCH_ISSUE, issueId);
                resolve();
            }, 1000);
        });
    },
    changeIssueStatus: ({ commit }, status) => {
        commit(CHANGE_ISSUE_STATUS_START);
        return new Promise(resolve => {
            setTimeout(() => {
                commit(CHANGE_ISSUE_STATUS, status);
                resolve();
            }, 1000);
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
    storeIssue: ({ commit }, issue) => {
        return new Promise(resolve => {
            setTimeout(() => {
                commit(STORE_ISSUE, issue);
                resolve();
            }, 1000);
        });
    },
    deleteIssue: ({ commit }, issueSlug) => {
        return new Promise(resolve => {
            setTimeout(() => {
                commit(DELETE_ISSUE, issueSlug);
                resolve();
            }, 1000);
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
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};