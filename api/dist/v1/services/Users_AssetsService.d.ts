declare class Users_Assets {
    getAssetOwners: (tokenId: number) => Promise<any>;
    getOwnersAsset: (username: string) => Promise<any>;
    addShareholders: (userId: string, assetId: string) => Promise<any>;
    removeShareholder: (userId: string, assetId: string) => Promise<any>;
}
export default Users_Assets;
//# sourceMappingURL=Users_AssetsService.d.ts.map