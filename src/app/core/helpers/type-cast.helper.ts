export class TypeCastHelper {
    getAsString(data: any): string {
        return data !== undefined && data !== null && !Number.isNaN(data) ? String(data) : '';
    }

    getAsNumber(data: any, defaultValue?: number): number {
        const result = Number(data);

        return data === null || Number.isNaN(result) ? defaultValue ?? NaN : result;
    }

    getAsBoolean(data: any): boolean {
        const stringExceptions = ['false', '0', 'null'];

        if (typeof data === 'string' && stringExceptions.includes(data)) {
            return false;
        }

        return Boolean(data);
    }

    getAsNull(data: any): any {
        return data !== undefined && !Number.isNaN(data) ? data : null;
    }

    getAsTypedArray<T>(data: any[], cb: (item: any) => T, showError = true): T[] {
        if (!Array.isArray(data)) {
            if (showError) {
                console.error(
                    'getAsTypedArray: Given data must be an array (now it is ' +
                        typeof data +
                        '). Incorrect data will be defined as array of data (data => [data]).'
                );
            }

            data = [data];
        }

        return data.map(cb);
    }
}
