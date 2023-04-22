import { CompatClient, IFrame, IMessage, Stomp } from '@stomp/stompjs';
import { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import SockJS from 'sockjs-client';
import './App.css';
import { SalesFileData } from './model/product';
import { Link } from 'react-router-dom';
import StorageService from './storage/storage-service';

const SOCKET_URL = 'http://localhost:8082/websocket';

export default function IndexPage() {
    let stompClient: CompatClient;
    const [salesFiles, setSalesFiles] = useState<SalesFileData[]>(StorageService.hasSalesData() ? StorageService.getSalesData() : []);
    useEffect(() => {
        establishSocketConnection();


        return () => {
            stompClient.disconnect();
        }
    }, []);

    function establishSocketConnection () {
        const socket = new SockJS(SOCKET_URL)

        stompClient = Stomp.over(() => socket);
        stompClient.activate();
        stompClient.onConnect = onConnected;
        stompClient.onDisconnect = onDisconnected;
        stompClient.debug = (msg) => console.log(msg)
    }

    function onConnected(frame: IFrame) {
        stompClient.send('/app/hello', {}, 'hello');
        stompClient.subscribe('/topics/sales', onSubscribeSaleFile);
    }

    function onSubscribeSaleFile(message: IMessage) {
        salesFiles.push(JSON.parse(message.body));
        const updateSalesFiles = [...salesFiles];
        setSalesFiles(updateSalesFiles);
        StorageService.storeSalesFiles(updateSalesFiles);
    }

    function onDisconnected() {
        console.log('disconnected');
    }

    function renderSalesData() {
        return salesFiles.map((saleData, index) => (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{saleData.readTime.toString()}</td>
                <td>
                    <Link to={`/files/${index}`}>
                        {saleData.fileName}
                    </Link>
                </td>
                <td>{saleData.totalSales}</td>
            </tr>
        ))
    }

    function calculateSumSalesPrice() {
        return salesFiles.reduce((sum, saleData) => sum + saleData.totalSales, 0);
    }

    return (
        <div>
            <div>
                <h1>Sales files</h1>
                <strong>Total sales: {calculateSumSalesPrice()}</strong>
            </div>
            <Table bordered>
                <thead>
                    <tr>
                        <th>
                            #
                        </th>
                        <th>
                            Time
                        </th>
                        <th>
                            File Name
                        </th>
                        <th>
                            Total Sales Price
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {renderSalesData()}
                </tbody>
            </Table>
        </div>
    );
}