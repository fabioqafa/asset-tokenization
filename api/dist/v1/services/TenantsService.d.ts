import { Tenants } from '@prisma/client';
declare class TenantsService {
    getAllTenants: () => Promise<Tenants[]>;
    getTenant: (name: string) => Promise<Tenants | null>;
    createNewTenant: (name: string) => Promise<Tenants>;
}
export default TenantsService;
//# sourceMappingURL=TenantsService.d.ts.map