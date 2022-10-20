// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Whitelist {
    mapping(address => bool) private _whitelist;

    modifier checkWhitelist(address _address) {
        require(_isWhitelisted(_address), string(abi.encodePacked("ERC1155PresetMinterPauser:", _address, "must be whitelisted")));
        _;
    }

    event AddedToWhitelist(address indexed admin, address indexed addedAccount);

    event RemovedFromWhitelist(address indexed admin, address indexed removedAccount);


    function _isWhitelisted(address _account) internal view returns(bool) {
        return _whitelist[_account];
    }
    
    function _addToWhitelist(address _account) internal { 
        _whitelist[_account] = true;

        emit AddedToWhitelist(msg.sender, _account);
    }

    function _removeFromWhitelist(address _account) internal {
        _whitelist[_account] = false;

        emit RemovedFromWhitelist(msg.sender, _account);
    }

}