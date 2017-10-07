import toastr from 'toastr'

const FETCH_ISSUES = "FETCH_ISSUES";
const FETCH_START = "FETCH_START";

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
                type: 'bug'
            },
            {
                name: 'Issue 2',
                slug: 'issue-2',
                description: 'Description',
                type: 'sub-task'
            },
            {
                name: 'Issue 3',
                slug: 'issue-3',
                description: 'Description',
                type: 'task'
            },
        ];
        state.isIssuesPending = false;
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