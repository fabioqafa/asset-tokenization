import { Assets } from "@prisma/client";
declare class AssetsManagementService {
    getAllAssets: () => Promise<any[]>;
    getTenantsAssets: (tenantId: string) => Promise<Assets[]>;
    totalSupply: (id: number) => Promise<number>;
    exists: (id: number) => Promise<boolean>;
    createAsset: (tokenSymbol: string, address: string, flatnr: number, floor: number, aptnr: number, tenantId: string) => Promise<Assets>;
}
export default AssetsManagementService;
//# sourceMappingURL=AssetsManagementService.d.ts.map