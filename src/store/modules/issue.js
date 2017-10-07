import toastr from 'toastr'

const FETCH_ISSUES = "FETCH_ISSUES";
const FETCH_START = "FETCH_START";
const STORE_ISSUE = "STORE_ISSUE";

const state = {
    issues: null,
    isIssuesPending: false,
};

const mutations = {
    [FETCH_START] (state) {
        state.isIssuesPending = true;
    },
    [FETCH_ISSUES] (state, issues) {
        state.issues = [
            {
                name: 'Issue 1',
                slug: 'issue-1',
                description: 'Description',
                type: 'task'
            },
            {
                name: 'Issue 2',
                slug: 'issue-2',
                description: 'Description',
                type: 'task'
            },
            {
                name: 'Issue 3',
                slug: 'issue-3',
                description: 'Description',
                type: 'task'
            },
            {
                name: 'Issue 4',
                slug: 'issue-4',
                description: 'Description',
                type: 'task'
            },
            {
                name: 'Issue 5',
                slug: 'issue-5',
                description: 'Description',
                type: 'task'
            },
            {
                name: 'Issue 6',
                slug: 'issue-6',
                description: 'Description',
                type: 'task'
            },
            {
                name: 'Issue 7',
                slug: 'issue-7',
                description: 'Description',
                type: 'task'
            },{
                name: 'Issue 8',
                slug: 'issue-8',
                description: 'Description',
                type: 'task'
            },
            {
                name: 'Issue 9',
                slug: 'issue-9',
                description: 'Description',
                type: 'task'
            },
            {
                name: 'Issue 10',
                slug: 'issue-10',
                description: 'Description',
                type: 'task'
            },
            {
                name: 'Issue 11',
                slug: 'issue-11',
                description: 'Description',
                type: 'task'
            },
            {
                name: 'Issue 12',
                slug: 'issue-12',
                description: 'Description',
                type: 'task'
            },

        ];
        state.issues = [];
        state.isIssuesPending = false;
    },
    [STORE_ISSUE] (state, issue) {
        state.issues.push(issue);
    },
};

const actions = {
    fetchIssues: ({ commit }, issues) => {
        commit(FETCH_START);
        return new Promise(resolve => {
            setTimeout(() => {
                commit(FETCH_ISSUES);
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
};

const getters = {
    allIssues: state => {
        return state.issues
    },
    isIssuesPending: state => {
        return state.isIssuesPending
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};