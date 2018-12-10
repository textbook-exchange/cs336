import BootstrapTable from 'react-bootstrap-table-next';

const products = [
    {
        id: 1,
        name: 'TV',
        'price': 1000
    },
    {
        id: 2,
        name: 'Mobile',
        'price': 500
    },
    {
        id: 3,
        name: 'Book',
        'price': 20
    },
    ];

const columns = [{
    dataField: 'id',
    text: 'Product ID'
}, {
    dataField: 'name',
    text: 'Product Name'
}, {
    dataField: 'price',
    text: 'Product Price'
}];

export default () =>
<BootstrapTable keyField='id' data={ products } columns={ columns } />