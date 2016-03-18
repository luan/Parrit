var {
        postProjectAndDo,
        postProjectPairingAndDo,
        getRecommendedPairingAndDo,
        postAddNewPersonAndDo
    } = require('shared/helpers/databaseHelpers.js');

var { loadProjectCreator } = require('project/actions/creators/dataCreators.js');
var { setErrorTypeCreator } = require('project/actions/creators/viewCreators.js');

export function autoSaveThunk(action) {
    return function (dispatch, getState) {
        dispatch(action);
        postProjectAndDo(getState().data.project,
            function successCallback(project) {
                dispatch(loadProjectCreator(project));
            },
            function errorCallback(errorStatus) {
                dispatch(setErrorTypeCreator(errorStatus));
            }
        );
    }
}

export function savePairingThunk() {
    return function (dispatch, getState) {
        postProjectPairingAndDo(getState().data.project.id, function successCallback() {
            alert("Successfully Saved Pairing!");
        });
    }
}

export function getRecommendedPairsThunk() {
    return function(dispatch, getState) {
        getRecommendedPairingAndDo(getState().data.project.id, function successCallback(project) {
            dispatch(loadProjectCreator(project));
        })
    }
}

export function addNewPersonThunk(projectId, name, callback) {
    return function(dispatch, getState) {
        postAddNewPersonAndDo(projectId, name,
            function successCallback(project) {
                callback();
                dispatch(loadProjectCreator(project));
            },
            function errorCallback(errorStatus) {
                dispatch(setErrorTypeCreator(errorStatus));
            }
        )
    }
}

