// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Pausable.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "./Whitelist.sol";
import "./IERC1155PresetMinterPauserSupply.sol";

/**
 * @dev {ERC1155} token, including:
 *  - a minter role that allows for token minting (creation)
 *  - a pauser role that allows to stop all token transfers
 *
 * This contract uses {AccessControl} to lock permissioned functions using the
 * different roles
 *
 * The account that deploys the contract will be granted the minter and pauser
 * roles, as well as the default admin role, which will let it grant both minter
 * and pauser roles to other accounts.
 */
contract ERC1155PresetMinterPauserSupply is IERC1155PresetMinterPauserSupply ,Context, AccessControlEnumerable, ERC1155Pausable, ERC1155Supply, Whitelist{
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    uint256 private decimals;
    string public name;

    /**
     * @dev Grants `DEFAULT_ADMIN_ROLE`, `MINTER_ROLE`, and `PAUSER_ROLE` to the account that
     * deploys the contract and whitelists it.
     */
    constructor(string memory uri, uint256 _decimals) ERC1155(uri) {
        require(_decimals <= 5, "Maximum of 5 decimals");
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());

        _setupRole(MINTER_ROLE, _msgSender());
        _setupRole(PAUSER_ROLE, _msgSender());

        _addToWhitelist(_msgSender());
        name = "GroundZero";
        decimals = _decimals;

        emit Deployed(_msgSender(), block.timestamp);
    }

    /**
     * @dev Returns the number of decimals of the smart contract.
     */
    function getDecimals() public view virtual override returns(uint256) {
        return decimals;
    } 

    /**
     * @dev Creates `amount` new tokens for `to`, of token type `id`.
     *
     * See {ERC1155-_mint}.
     *
     * Requirements:
     *
     * - the caller must first be whitelisted.
     * - the caller must have the `MINTER_ROLE`.
     * - maximum supply of each token must not exceed 100 or 100 * 10 ** decimals
     */
    function mint(
        uint256 id,
        uint256 amount, //amount should be input of real amount * 10 ** decimals
        bytes memory data
    ) public virtual override checkWhitelist(_msgSender()) {
        require(hasRole(MINTER_ROLE, _msgSender()), "ERC1155PresetMinterPauser: must have minter role to mint");
        
        require(amount + totalSupply(id) <= 100 * 10 ** decimals, "Maximum supply of 100 tokens is reached");

        _mint(_msgSender(), id, amount, data);
    }

    /**
     * @dev Batched variant of {mint}.
     *
     * Requirements:
     *
     * - the caller must first be whitelisted.
     */

    function mintBatch(
        uint256[] memory ids,
        uint256[] memory amounts, //amounts should be input of real amounts[] * 10 ** decimals
        bytes memory data
    ) public virtual override checkWhitelist(_msgSender()) {
        require(hasRole(MINTER_ROLE, _msgSender()), "ERC1155PresetMinterPauser: must have minter role to mint");

        for (uint256 i = 0; i < ids.length; i++) {
            
            for (uint256 j = i + 1; j < ids.length; j++) {
                require(ids[i] != ids[j], "Ids must not be repeatable");
            }

            require(amounts[i] + totalSupply(ids[i]) <= 100 * 10 ** decimals, "At least one property exceeded max supply of 100 tokens, transaction reverted");
        }

        _mintBatch(_msgSender(), ids, amounts, data);
    }

    /**
     * @dev Transfers `amount` tokens of token type `id` from `from` to `to`.
     *
     * Emits a {TransferSingle} event.
     *
     * Requirements:
     *
     * - `from` and `to` must be whitelisted.
     * - `to` cannot be the zero address.
     * - If the caller is not `from`, it must have been approved to spend ``from``'s tokens via {setApprovalForAll}.
     * - `from` must have a balance of tokens of type `id` of at least `amount`.
     * - If `to` refers to a smart contract, it must implement {IERC1155Receiver-onERC1155Received} and return the
     * acceptance magic value.
     *
     */
    function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes memory data) public virtual override(ERC1155, IERC1155PresetMinterPauserSupply) {
        require((_isWhitelisted(from) && _isWhitelisted(to)), "Sender or receiver is not whitelisted");
        
        super.safeTransferFrom(from, to, id, amount, data);
    }

    /**
     * @dev xref:ROOT:erc1155.adoc#batch-operations[Batched] version of {safeTransferFrom}.
     *
     * Emits a {TransferBatch} event.
     *
     * Requirements:
     *
     * - `from` and `to` must be whitelisted.
     * - `ids` and `amounts` must have the same length.
     * - If `to` refers to a smart contract, it must implement {IERC1155Receiver-onERC1155BatchReceived} and return the
     * acceptance magic value.
     */
    function safeBatchTransferFrom(address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) public virtual override(ERC1155, IERC1155PresetMinterPauserSupply) {
        require((_isWhitelisted(from) && _isWhitelisted(to)), "Sender or receiver is not whitelisted");

        super.safeBatchTransferFrom(from, to, ids, amounts, data);
    }

    /**
     * @dev Grants or revokes permission to `operator` to transfer the caller's tokens, according to `approved`,
     *
     * Emits an {ApprovalForAll} event.
     *
     * Requirements:
     *
     * - `operator` must be whitelisted.
     * - `operator` cannot be the caller.
     */
    function setApprovalForAll(address operator, bool approved) public virtual override(ERC1155, IERC1155PresetMinterPauserSupply) {
        require(_isWhitelisted(operator), string(abi.encodePacked("Operator: ", Strings.toHexString(operator), " is not whitelisted")));
        
        super.setApprovalForAll(operator, approved);
    }

    /**
     * @dev Pauses all token transfers.
     *
     * See {ERC1155Pausable} and {Pausable-_pause}.
     *
     * Requirements:
     *
     * - the caller must first be whitelisted.
     * - the caller must have the `PAUSER_ROLE`.
     */
    function pause() public virtual override checkWhitelist(_msgSender()) { 
        require(hasRole(PAUSER_ROLE, _msgSender()), "ERC1155PresetMinterPauser: must have pauser role to pause");
        _pause();
    }

    /**
     * @dev Unpauses all token transfers.
     *
     * See {ERC1155Pausable} and {Pausable-_unpause}.
     *
     * Requirements:
     *
     * - the caller must first be whitelisted.
     * - the caller must have the `PAUSER_ROLE`.
     */
    function unpause() public virtual override checkWhitelist(_msgSender()) {
        require(hasRole(PAUSER_ROLE, _msgSender()), "ERC1155PresetMinterPauser: must have pauser role to unpause");
        _unpause();
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(AccessControlEnumerable, ERC1155, IERC1155PresetMinterPauserSupply)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override(ERC1155Pausable, ERC1155Supply) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    /**
     * @dev Grants `role` to `account`
     *
     * If `account` had not been already granted `role`, emits a {RoleGranted}
     * event.
     *
     * Requirements:
     *
     *  - the `account` must be whitelisted.
     *  - the caller must have `role`'s admin role.
     *
     * May emit a {RoleGranted} event.
     */
    function grantRole(bytes32 role, address account) public virtual override(IAccessControl, IERC1155PresetMinterPauserSupply) checkWhitelist(account) {
        super.grantRole(role, account);
    }

    /**
     * @dev Revokes `role` from `account`
     *
     * If `account` had been granted `role`, emits a {RoleRevoked} event.
     *
     * Requirements:
     *
     * - the caller must have ``role``'s admin role.
     *
     * May emit a {RoleRevoked} event.
     */
    function revokeRole(bytes32 role, address account) public virtual override(IAccessControl, IERC1155PresetMinterPauserSupply) {
        super.revokeRole(role, account);
    }

    /**
     * @dev Revokes `role` from the calling account
     *
     * Roles are often managed via {grantRole} and {revokeRole}: this function's
     * purpose is to provide a mechanism for accounts to lose their privileges
     * if they are compromised (such as when a trusted device is misplaced).
     *
     * If the calling account had been revoked `role`, emits a {RoleRevoked}
     * event.
     *
     * Requirements:
     *
     * - the caller must be `account`.
     *
     * May emit a {RoleRevoked} event.
     */
    function renounceRole(bytes32 role, address account) public virtual override(IAccessControl, IERC1155PresetMinterPauserSupply) {
        super.renounceRole(role, account);
    }

    /**
     * @dev Returns if `account` is whitelisted or not.
     *
     */
    function isWhitelisted(address account) public view virtual override returns(bool){
       return _isWhitelisted(account);
    }

    /**
     * @dev Whitelists `account`.
     *
     * Requirements:
     *
     * - the caller must have DEFAULT_ADMIN_ROLE role.
     *
     * Emits a {AddedToWhitelist} event.
     */
    function addToWhitelist(address account) public virtual override {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "ERC1155PresetMinterPauser: must have admin role to add addresses to whitelist");

        _addToWhitelist(account);
    }

    /**
     * @dev Removes `account` from whitelist.
     *
     * Requirements:
     *
     * - the caller must have DEFAULT_ADMIN_ROLE role.
     *
     * Emits a {RemovedFromWhitelist} event.
     */
    function removeFromWhitelist(address account) public virtual override {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "ERC1155PresetMinterPauser: must have admin role to remove addresses to whitelist");

        _removeFromWhitelist(account);
    }
}