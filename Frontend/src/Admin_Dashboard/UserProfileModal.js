import React from 'react';

const UserProfileModal = ({ selectedUser, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>User Profile</h2>
        <div>
          <p>Name: {selectedUser.name}</p>
          <p>Email: {selectedUser.email}</p>
          {/* Add more profile details here */}
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
