

// const pagination = {
//     total: 12184,
//     lastPage: 122,
//     prevPage: null,
//     nextPage: 2,
//     perPage: 100,
//     currentPage: 1,
//     from: 0,
//     to: 100,
// };

// const [rowData, setRowData] = useState([
//     {
//         'id': 1,
//         title: 'Kate & Leopold',
//         year: 2001,
//         imdbID: 'tt0035423',
//         imdbRating: '6.4',
//         rottenTomatoesRating: '52',
//         metacriticRating: '44',
//         classification: 'PG-13',
//     },
//     {
//         'id': 2,

//         title: 'The Other Side of the Wind',
//         year: 2018,
//         imdbID: 'tt0069049',
//         imdbRating: '6.7',
//         rottenTomatoesRating: '83',
//         metacriticRating: '78',
//         classification: 'R',
//     },

//     {
//         'id': 3,
//         title: 'A Tale of Springtime',
//         year: 1990,
//         imdbID: 'tt0097106',
//         imdbRating: '7.1',
//         rottenTomatoesRating: '86',
//         metacriticRating: null,
//         classification: 'PG',
//     },
// ]);
// const [columnDefs, setColumnDefs] = useState([

//     { field: 'title', resizable: true },
//     { field: 'year', resizable: true },
//     { field: 'imdbID', resizable: true },
//     { field: 'imdbRating', resizable: true },
//     { field: 'rottenTomatoesRating', resizable: true },
//     { field: 'metacriticRating', resizable: true },
//     { field: 'classification', resizable: true },

// ]);


import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import APIFunction from '../../services/api';
import PropTypes from 'prop-types';

const GridExample = () => {
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '600px', width: '100%' }), []);
    const keywords = '1'
    const year = null
    const [columnDefs, setColumnDefs] = useState([

        { field: 'title' },
        { field: 'year' },
        { field: 'imdbID' },
        { field: 'imdbRating' },
        { field: 'rottenTomatoesRating' },
        { field: 'metacriticRating' },
        { field: 'classification' },

    ]);
    const defaultColDef = useMemo(() => {
        return {
            editable: true,
            enableRowGroup: true,
            enablePivot: true,
            enableValue: true,
            sortable: true,
            resizable: true,
            filter: true,
            flex: 1,
            minWidth: 100,
        };
    }, []);
    const [totalRow, setTotalRow] = useState(0)
    const [perPage, setPerPage] = useState(100)
    const buildParams = (keywords, year) => {
        let tKeywords = keywords.trim();
        let params = null
        if (tKeywords.length > 0 && year) {
            params = { title: tKeywords, year }
        } else if (year) {
            params = { year }
        } else if (keywords.length > 0) {
            params = { title: tKeywords }
        }
        return params
    }
    useEffect(() => {

        const params = buildParams(keywords, year)
        if (!params) {
            return
        }

        APIFunction.search({ ...params, page: 1 }).then((resp) => {
            const { total, perPage } = resp['pagination']
            setTotalRow(total)
            setPerPage(perPage)
        })


    }, [keywords, year])

    const dataSource = {
        rowCount: undefined,
        getRows: (params) => {
            console.log('asking for ' + params.startRow + ' to ' + params.endRow);
            const queryParams = buildParams(keywords, year)
            if (!queryParams) {
                params.successCallback([], 0);
            } else {
                APIFunction.search({ ...queryParams, page: (params.startRow) / perPage + 1 }).then((resp) => {
                    let data = resp['data']
                    const rowsThisPage = data
                    // if on or after the last page, work out the last row.
                    let lastRow = -1;
                    if (data.length <= params.endRow) {
                        lastRow = totalRow;
                    }
                    // call the success callback
                    params.successCallback(rowsThisPage, lastRow);

                })
            }


            // At this point in your code, you would call the server.


        },
    };
    return (
        <div style={containerStyle}>
            <div style={gridStyle} className="ag-theme-alpine w-full h-full">
                <AgGridReact
                    columnDefs={columnDefs}
                    suppressRowClickSelection={true}

                    rowModelType={'infinite'}
                    rowSelection={'multiple'}
                    pivotPanelShow={'always'}
                    pagination={true}

                    rowBuffer={0}
                    datasource={dataSource}

                    cacheBlockSize={100}
                    cacheOverflowSize={2}
                    maxConcurrentDatasourceRequests={1}
                    infiniteInitialRowCount={1000}
                    maxBlocksInCache={10}
                // onGridReady={onGridReady}
                ></AgGridReact>
            </div>
        </div>
    );
};
GridExample.propTypes = {
    keywords: PropTypes.string,
};

export default GridExample;