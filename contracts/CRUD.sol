// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract CRUD {
    struct User {
        uint256 id;
        string name;
    }

    User[] public users;
    uint256 public nextId = 0;

    function create(string memory _name) public {
        users.push(User(nextId, _name));
        nextId++;
    }

    function read(uint256 _id) public view returns (uint256, string memory) {
        uint256 i = find(_id);
        return (users[i].id, users[i].name);
    }

    function update(uint256 _id, string memory _name) public {
        uint256 i = find(_id);
        users[i].name = _name;
    }

    function deleteId(uint256 _id) public {
        delete users[_id];
    }

    function find(uint256 _id) internal view returns (uint256) {
        for (uint256 i = 0; i < users.length; i++) {
            if (users[i].id == _id) {
                return i;
            }
        }
    }
}
