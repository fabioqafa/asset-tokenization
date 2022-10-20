// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IERC1155PresetMinterPauserSupply {

    event Deployed(address indexed deployer, uint256 timestamp);

    function getDecimals() external view returns(uint256);

    function mint(uint256 id, uint256 amount, bytes memory data) external;

    function mintBatch(uint256[] memory ids, uint256[] memory amounts, bytes memory data) external;

    function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes memory data) external;

    function safeBatchTransferFrom(address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) external;

    function setApprovalForAll(address operator, bool approved) external;

    function pause() external;

    function unpause() external;

    function supportsInterface(bytes4 interfaceId) external returns(bool);

    function grantRole(bytes32 role, address account) external;

    function revokeRole(bytes32 role, address account) external;

    function renounceRole(bytes32 role, address account) external;

    function isWhitelisted(address account) external view returns(bool);

    function addToWhitelist(address account) external;

    function removeFromWhitelist(address account) external;

}