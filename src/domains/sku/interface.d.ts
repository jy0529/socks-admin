export interface ISku {
    id: string;
    image_urls: string[];
    material: string; // json
    supplier_id: string;
    cost_price: number;
    suggested_price: number;
    tags: string[]
    created_at: string;
}

export type SkuUpsertType = "create" | "edit"