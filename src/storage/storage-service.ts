import { SalesFileData } from "../model/product";

const STORAGE_KEY = "sales-files";

function storeSalesFiles(salesFiles: SalesFileData[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(salesFiles));
}

function hasSalesData() {
  return !!localStorage.getItem(STORAGE_KEY);
}

function getSalesData(): SalesFileData[] {
  if (!hasSalesData()) {
    return [];
  }
  const salesData = localStorage.getItem(STORAGE_KEY);
  if (typeof salesData === "string") {
    return JSON.parse(salesData) as SalesFileData[];
  }
  return [];
}


const StorageService = {
    storeSalesFiles,
    hasSalesData,
    getSalesData
}

export default StorageService;