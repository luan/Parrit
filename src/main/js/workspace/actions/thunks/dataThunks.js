var { postWorkspaceAndDo, postWorkspacePairingAndDo } = require('shared/helpers/databaseHelpers.js');
var { loadWorkspaceCreator } = require('workspace/actions/creators/dataCreators.js');

export function autoSaveThunk(action) {
    return function (dispatch, getState) {
        dispatch(action);
        postWorkspaceAndDo(getState().data.workspace, function(workspace) {
            dispatch(loadWorkspaceCreator(workspace));
        });
    }
}

export function savePairingThunk() {
    return function (dispatch, getState) {
        postWorkspacePairingAndDo(getState().data.workspace, function() {
            alert("Successfully Saved Pairing!");
        });
    }
}