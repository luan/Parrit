import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import ModalStyles from 'shared/misc/OverrideBullshitModalStyles.js';

import PersonList from 'project/components/PersonList.js';
import PairingBoard from 'project/components/PairingBoard.js';
import NameForm from 'shared/components/NameForm.js';

export default class Workspace extends React.Component {
    render() {
        return (
            <div className="workspace">

                <div className="floating-parrits">
                    <h2 className="floating-parrit-title">Floating Parrits</h2>
                    <PersonList people={this.props.people} index={-1} />
                    <div className="floating-parrit-actions">
                        <div className="add-parrit-button" onClick={this.openNewPersonModal.bind(this)}/>
                        <div className="delete-parrit"/>
                    </div>
                </div>

                <div className="dotted-line"/>

                <div className="pairing-boards-container">
                    <h2 className="pairing-boards-title">Pairing Boards</h2>
                    <div className="pairing-boards">
                        {this.props.pairingBoards.map((pairingBoard, idx) => {
                            return <PairingBoard
                                        key={idx}
                                        name={pairingBoard.name}
                                        people={pairingBoard.people}
                                        index={idx}
                                        exempt={pairingBoard.exempt}
                                        deletePairingBoard={this.props.deletePairingBoard}
                                        renamePairingBoard={this.props.renamePairingBoard}
                                    />
                        })}
                    </div>
                    <div className="add-board-button" onClick={this.openNewPairingBoardModal.bind(this)}/>
                </div>

                <Modal contentLabel="New Person Modal" isOpen={this.props.settings.isNewPersonModalOpen} onRequestClose={this.closeNewPersonModal.bind(this)} style={ModalStyles}>
                    <NameForm formTitle="Add Parrit Teammate" confirmFunction={this.createPersonWithName.bind(this)}
                        cancelFunction={this.closeNewPersonModal.bind(this)} errorMessage={this.props.settings.newPersonModalErrorMessage}/>
                </Modal>
                <Modal contentLabel="New Pairing Board Modal" isOpen={this.props.settings.isNewPairingBoardModalOpen} onRequestClose={this.closeNewPairingBoardModal.bind(this)} style={ModalStyles}>
                    <NameForm formTitle="Add Pairing Board" confirmFunction={this.createPairingBoardWithName.bind(this)}
                        cancelFunction={this.closeNewPairingBoardModal.bind(this)} errorMessage={this.props.settings.newPairingBoardModalErrorMessage}/>
                </Modal>

            </div>
        )
    }

    createPersonWithName(name) {
        this.props.createPerson(this.props.projectId, name, this.closeNewPersonModal.bind(this));
    }

    openNewPersonModal () {
        this.props.setNewPersonModalOpen(true);
    }

    closeNewPersonModal () {
        this.props.setNewPersonModalOpen(false);
    }

    createPairingBoardWithName(name) {
        this.props.createPairingBoard(this.props.projectId, name, this.closeNewPairingBoardModal.bind(this));
    }

    openNewPairingBoardModal () {
        this.props.setNewPairingBoardModalOpen(true);
    }

    closeNewPairingBoardModal () {
        this.props.setNewPairingBoardModalOpen(false);
    }
}

Workspace.propTypes = {
    projectId: PropTypes.number.isRequired,
    settings: PropTypes.object.isRequired,
    people: PropTypes.arrayOf(PropTypes.object).isRequired,
    pairingBoards: PropTypes.arrayOf(PropTypes.object).isRequired,
    setNewPersonModalOpen: PropTypes.func.isRequired,
    setNewPairingBoardModalOpen: PropTypes.func.isRequired,
    createPerson: PropTypes.func.isRequired,
    createPairingBoard: PropTypes.func.isRequired,
    deletePairingBoard: PropTypes.func.isRequired,
    renamePairingBoard: PropTypes.func.isRequired
}
