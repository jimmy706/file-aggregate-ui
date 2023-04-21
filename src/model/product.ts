export type Product = {
    saleDate: Date;
    productName: string;
    quantity: number;
    price: number;
}

export type SalesFileData = {
    fileName: string;
    readTime: Date;
    totalSales: number;
    data: Product[];
}