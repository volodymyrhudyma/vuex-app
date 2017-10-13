import toastr from 'toastr'

const FETCH_ISSUES = "FETCH_ISSUES";
const FETCH_START = "FETCH_START";
const STORE_ISSUE = "STORE_ISSUE";
const DELETE_ISSUE = "DELETE_ISSUE";

const state = {
    issues: null,
    isIssuesPending: false,
};

const mutations = {
    [FETCH_START] (state) {
        state.isIssuesPending = true;
    },
    [FETCH_ISSUES] (state, projectId = null) {    
        let issues = [
            {
                name: 'Issue 1',
                slug: 'issue-1',
                description: 'Description',
                type: 'task',
                status: 'done',
                projectId: 1
            },
            {
                name: 'Issue 2',
                slug: 'issue-2',
                description: 'Description',
                type: 'task',
                status: 'done',
                projectId: 1
            },
            {
                name: 'Issue 3',
                slug: 'issue-3',
                description: 'Description',
                type: 'task',
                status: 'in-progress',
                projectId: 1
            },
            {
                name: 'Issue 4',
                slug: 'issue-4',
                description: 'Description',
                type: 'task',
                status: 'to-do',
                projectId: 2
            },
            {
                name: 'Issue 5',
                slug: 'issue-5',
                description: 'Description',
                type: 'task',
                status: 'done',
                projectId: 2
            },
            {
                name: 'Issue 6',
                slug: 'issue-6',
                description: 'Description',
                type: 'task',
                status: 'done',
                projectId: 2
            },
            {
                name: 'Issue 7',
                slug: 'issue-7',
                description: 'Description',
                type: 'task',
                status: 'to-do',
                projectId: 3
            },{
                name: 'Issue 8',
                slug: 'issue-8',
                description: 'Description',
                type: 'task',
                status: 'done',
                projectId: 3
            },
            {
                name: 'Issue 9',
                slug: 'issue-9',
                description: 'Description',
                type: 'task',
                status: 'in-progress',
                projectId: 3
            },
            {
                name: 'Issue 10',
                slug: 'issue-10',
                description: 'Description',
                type: 'task',
                status: 'in-progress',
                projectId: 4
            },
            {
                name: 'Issue 11',
                slug: 'issue-11',
                description: 'Description',
                type: 'bug',
                status: 'done',
                projectId: 4
            },
            {
                name: 'Issue 12',
                slug: 'issue-12',
                description: 'Description',
                type: 'sub-task',
                status: 'to-do',
                projectId: 10
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
    [STORE_ISSUE] (state, issue) {
        state.issues.push(issue);
    },
    [DELETE_ISSUE] (state, issueSlug) {
        let issue = state.issues.filter(issue => {
            return issue.slug === issueSlug;
        })[0];
        state.issues.splice(state.issues.indexOf(issue), 1);
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
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};