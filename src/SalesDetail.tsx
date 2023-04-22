import { useState, useEffect } from 'react';
import { SalesFileData } from './model/product';
import StorageService from './storage/storage-service';
import { useParams, Link } from 'react-router-dom';
import { Table } from 'reactstrap';

export default function SalesDetail() {
    const [salesData, setSalesData] = useState<SalesFileData | null>(null);
    const { fileId } = useParams();

    useEffect(() => {
        extractFilesData();
    }, [])

    function extractFilesData() {
        const storageSalesData = StorageService.getSalesData();
        if (!fileId) {
            return;
        }
        const fileData = storageSalesData.at(parseInt(fileId));
        if (fileData) {
            setSalesData(fileData);
        }
    }

    function renderSalesProducts() {
        if (!salesData) {
            return null;
        }
        return salesData.data.map((prod, index) => (
            <tr key={index}>
                <td>
                    {index + 1}
                </td>
                <td>
                    {prod.productName}
                </td>
                <td>
                    {prod.saleDate.toString()}
                </td>
                <td>
                    {prod.quantity}
                </td>
                <td>
                    {prod.price}
                </td>
            </tr>
        ))
    }

    return (
        <div>
            <Link to={'/'}>
                Back
            </Link>
            <h1>
                {salesData?.fileName}
            </h1>
            <Table>
                <thead>
                    <tr>
                        <th>
                            #
                        </th>
                        <th>
                            Product name
                        </th>
                        <th>
                            Sale at
                        </th>
                        <th>
                            Quantity
                        </th>
                        <th>
                            Price per each
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {renderSalesProducts()}
                </tbody>
            </Table>
        </div>
    )
}