import { NavigationExtras, Router } from '@angular/router';

export function getSeverity(inventoryStatus: string | undefined): string {
    switch (inventoryStatus) {
        case 'IN STOCK':
            return 'success';

        case 'LOW STOCK':
            return 'warning';

        case 'OUT OF STOCK':
            return 'danger';

        default:
            return '';
    }
};

export function handleNavigate(router: Router, route: string, queryParams?: any): void {
    router.navigate([route], queryParams);
}