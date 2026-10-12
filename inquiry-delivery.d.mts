export function deliverInquiry(brand: string, body: unknown): Promise<{ok: boolean; id: string; saved: boolean; emailAccepted: boolean}>;
export function errorResponse(error: unknown): {status: number; body: {ok: boolean; error: string; saved: boolean; id?: string}};
