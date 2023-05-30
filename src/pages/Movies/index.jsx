
import dayjs from 'dayjs';
import { TextField, InputAdornment, IconButton, Paper, Grid, Alert } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import "tailwindcss/tailwind.css";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Button } from "@mui/joy";
import APIFunction from "../../services/api";
import React, { useMemo, useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import MyToastContainer from '../../components/MyToasterContainer';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useStore } from '../../stores';
import { useEffect, useCallback } from 'react';

const GridExample = ({ title }) => {
  const { userStore } = useStore();
  // search bar
  const [keywords, setKeywords] = useState(userStore.getKeywords());
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(null);
  useEffect(() => {
    document.title = title || 'MovieCrate | Welcome';
  }, [title]);
  const year = useMemo(() => {
    return date ? dayjs(date).year() : null;
  }, [
    date
  ]);
  const handleSearchBtnClick = () => {
    userStore.setKeywords(keywords)
    if (keywords.length === 0 && !year) {
      toast.info('Please enter keywords or select a year');
      return
    }
    gridApiRef.current.setDatasource(dataSource)
  }
  const handleKeyPress = (event) => {

    if (event.key === "Enter") {
      handleSearchBtnClick();
    }
  };
  // ------------
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '600px', width: '100%' }), []);
  const gridApiRef = useRef(null);
  const titleCellRenderer = (params) => {
    const imdbID = params.data?.imdbID;
    return imdbID ? <Link to={`/movies/${imdbID}`}>
      <p className='text-blue-800'>
        {params.value}
      </p>
    </Link> : params.value;
  };


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



  const sortAndFilter = (allOfTheData, sortModel, filterModel) => {
    return sortData(sortModel, filterData(filterModel, allOfTheData));
  };

  const sortData = (sortModel, data) => {
    const sortPresent = sortModel && sortModel.length > 0;
    if (!sortPresent) {
      return data;
    }
    // do an in memory sort of the data, across all the fields
    const resultOfSort = data.slice();
    resultOfSort.sort(function (a, b) {
      for (let k = 0; k < sortModel.length; k++) {
        const sortColModel = sortModel[k];
        const valueA = a[sortColModel.colId];
        const valueB = b[sortColModel.colId];
        // this filter didn't find a difference, move onto the next one
        if (valueA == valueB) {
          continue;
        }
        const sortDirection = sortColModel.sort === 'asc' ? 1 : -1;
        if (valueA > valueB) {
          return sortDirection;
        } else {
          return sortDirection * -1;
        }
      }
      // no filters found a difference
      return 0;
    });
    return resultOfSort;
  };

  const filterData = (filterModel, data) => {
    const filterPresent = filterModel && Object.keys(filterModel).length > 0;
    if (!filterPresent) {
      return data;
    }
    const resultOfFilter = [];
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (filterModel.year) {
        const year = item.year;
        const allowedYear = parseInt(filterModel.year.filter);
        // EQUALS = 1;
        // LESS_THAN = 2;
        // GREATER_THAN = 3;
        if (filterModel.year.type == 'equals') {
          if (year !== allowedYear) {
            continue;
          }
        } else if (filterModel.year.type == 'lessThan') {
          if (year >= allowedYear) {
            continue;
          }
        } else {
          if (year <= allowedYear) {
            continue;
          }
        }
      }
      if (filterModel.imdbRating) {
        const imdbRating = item.imdbRating;
        const allowedRating = parseFloat(filterModel.imdbRating.filter);
        // EQUALS = 1;
        // LESS_THAN = 2;
        // GREATER_THAN = 3;
        if (filterModel.imdbRating.type == 'equals') {
          if (imdbRating !== allowedRating) {
            continue;
          }
        } else if (filterModel.imdbRating.type == 'lessThan') {
          if (imdbRating >= allowedRating) {
            continue;
          }
        } else {
          if (imdbRating <= allowedRating) {
            continue;
          }
        }
      }
      if (filterModel.rottenTomatoesRating) {
        const rottenTomatoesRating = item.rottenTomatoesRating;
        const allowedRating = parseInt(filterModel.rottenTomatoesRating.filter);
        // EQUALS = 1;
        // LESS_THAN = 2;
        // GREATER_THAN = 3;
        if (filterModel.rottenTomatoesRating.type == 'equals') {
          if (rottenTomatoesRating !== allowedRating) {
            continue;
          }
        } else if (filterModel.rottenTomatoesRating.type == 'lessThan') {
          if (rottenTomatoesRating >= allowedRating) {
            continue;
          }
        } else {
          if (rottenTomatoesRating <= allowedRating) {
            continue;
          }
        }
      }
      if (filterModel.metacriticRating) {
        const metacriticRating = item.metacriticRating;
        const allowedRating = parseInt(filterModel.metacriticRating.filter);
        // EQUALS = 1;
        // LESS_THAN = 2;
        // GREATER_THAN = 3;
        if (filterModel.metacriticRating.type == 'equals') {
          if (metacriticRating !== allowedRating) {
            continue;
          }
        } else if (filterModel.metacriticRating.type == 'lessThan') {
          if (metacriticRating >= allowedRating) {
            continue;
          }
        } else {
          if (metacriticRating <= allowedRating) {
            continue;
          }
        }
      }


      resultOfFilter.push(item);
    }
    return resultOfFilter;
  };
  // const [columnDefs, setColumnDefs] = useState([
  //   // this row just shows the row index, doesn't use any data from the row
  //   {
  //     headerName: 'ID',
  //     maxWidth: 100,
  //     valueGetter: 'node.id',
  //     cellRenderer: (props) => {
  //       if (props.value !== undefined) {
  //         return props.value;
  //       } else {
  //         return (
  //           <img src="https://www.ag-grid.com/example-assets/loading.gif" />
  //         );
  //       }
  //     },
  //     // we don't want to sort by the row index, this doesn't make sense as the point
  //     // of the row index is to know the row index in what came back from the server
  //     sortable: false,
  //     suppressMenu: true,
  //   },
  //   { field: 'athlete', suppressMenu: true },
  //   {
  //     field: 'age',
  //     filter: 'agNumberColumnFilter',
  //     filterParams: {
  //       filterOptions: ['equals', 'lessThan', 'greaterThan'],
  //       maxNumConditions: 1,
  //     },
  //   },

  //   {
  //     field: 'year',
  //     filter: 'agSetColumnFilter',
  //     filterParams: { values: ['2000', '2004', '2008', '2012'] },
  //   },
  //   { field: 'date' },
  //   { field: 'sport', suppressMenu: true },
  //   { field: 'gold', suppressMenu: true },
  //   { field: 'silver', suppressMenu: true },
  //   { field: 'bronze', suppressMenu: true },
  //   { field: 'total', suppressMenu: true },
  // ]);

  const [columnDefs, setColumnDefs] = useState([
    { field: 'title', cellRenderer: titleCellRenderer, suppressMenu: true, },
    { field: 'year', suppressMenu: true, filter: 'agNumberColumnFilter', filterParams: { filterOptions: ['equals', 'lessThan', 'greaterThan'], maxNumConditions: 1 } },
    { field: 'imdbRating', suppressMenu: true, filter: 'agNumberColumnFilter', filterParams: { filterOptions: ['equals', 'lessThan', 'greaterThan'], maxNumConditions: 1 } },
    { field: 'rottenTomatoesRating', suppressMenu: true, filter: 'agNumberColumnFilter', filterParams: { filterOptions: ['equals', 'lessThan', 'greaterThan'], maxNumConditions: 1 } },
    { field: 'metacriticRating', suppressMenu: true, filter: 'agNumberColumnFilter', filterParams: { filterOptions: ['equals', 'lessThan', 'greaterThan'], maxNumConditions: 1 } },
    { field: 'classification' },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 150,
      sortable: true,
      resizable: true,
      floatingFilter: true,
    };
  }, []);

  const onGridReady = (params) => {
    gridApiRef.current = params.api;

    if (userStore.getKeywords().length > 0) {
      gridApiRef.current.setDatasource(dataSource)
    }
  };
  const dataSource = useMemo(() => {
    let perPage = 100
    return {
      rowCount: undefined,
      getRows: (params) => {
        console.log('asking for ' + params.startRow + ' to ' + params.endRow);
        setLoading(true)
        const queryParams = buildParams(keywords, year)
        if (!queryParams) {
          setLoading(false)
          params.successCallback([], 0);
        } else {
          APIFunction.search({ ...queryParams, page: (params.startRow) / perPage + 1 }).then((resp) => {
            let data = resp['data']
            console.log(resp['pagination']);
            let total = resp['pagination']['total']
            setLoading(false)
            const dataAfterSortingAndFiltering = sortAndFilter(
              data,
              params.sortModel,
              params.filterModel
            );
            const rowsThisPage = dataAfterSortingAndFiltering
            // const rowsThisPage = data
            // if on or after the last page, work out the last row.
            let lastRow = -1;

            if (dataAfterSortingAndFiltering.length < perPage) {
              lastRow = params.startRow + dataAfterSortingAndFiltering.length
            } else {
              lastRow = total
            }

            // call the success callback
            params.successCallback(rowsThisPage, lastRow);

          })
        }
        // At this point in your code, you would call the server.
      },
    };

  }, [keywords, year])


  return (
    <>

      <Paper className="p-6 rounded-full mb-10" elevation={1}>

        <Grid container spacing={1} justifyContent="center" alignItems="center"  >
          <Grid item xs={12} sm={7}>
            <TextField
              placeholder="Search films"
              fullWidth
              value={keywords}
              onChange={(event) => setKeywords(event.target.value)}
              onKeyDown={handleKeyPress}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
                classes: {
                  root: "rounded-l-lg",
                },
              }}
              InputLabelProps={{
                classes: {
                  root: "text-gray-600 font-bold",
                },
              }}
              className=" rounded-lg z-0"
            />
          </Grid>
          <Grid item xs={12} sm={3}  >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                placeholder="Search films by title"
                views={['year']} maxDate={new dayjs()}
                slotProps={{
                  textField: {
                    placeholder: 'Find movies by year',
                  }
                }
                }

                value={date}
                onChange={(newValue) => { setDate(newValue); }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={2} alignSelf="center" >
            <Button loading={loading} className="h-14" color="primary" onClick={() => { handleSearchBtnClick() }}>
              Search
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <div style={containerStyle}>
        <Alert severity="info" className='mb-5' >Filter and sort results depend on loaded data. Incomplete data may lead to incomplete results. Please load all data before applying filters or sorting.</Alert>
        <div style={gridStyle} className="ag-theme-alpine w-full h-full">
          <AgGridReact
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowSelection={'multiple'}
            rowModelType={'infinite'}
            cacheBlockSize={100}
            cacheOverflowSize={2}
            maxConcurrentDatasourceRequests={2}
            infiniteInitialRowCount={1}
            maxBlocksInCache={2}

            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
        <MyToastContainer />
      </div>
    </>
  )
};

export default GridExample;



// {
//   "title": "The Other Side of the Wind",
//   "year": 2018,
//   "imdbID": "tt0069049",
//   "imdbRating": "6.7",
//   "rottenTomatoesRating": "83",
//   "metacriticRating": "78",
//   "classification": "R"
//   },
//   {
//   "title": "A Tale of Springtime",
//   "year": 1990,
//   "imdbID": "tt0097106",
//   "imdbRating": "7.1",
//   "rottenTomatoesRating": "86",
//   "metacriticRating": null,
//   "classification": "PG"
//   },
//   …
//   ],
//   "pagination": {
//   "total": 12184,
//   "lastPage": 122,
//   "prevPage": null,
//   "nextPage": 2,
//   "perPage": 100,
//   "currentPage": 1,
//   "from": 0,
//   "to": 100
//   }

// const Movies = ({ title }) => {
//   const { userStore } = useStore();
//   // search bar
//   const [keywords, setKeywords] = useState(userStore.getKeywords());
//   const [loading, setLoading] = useState(false);
//   const [date, setDate] = useState(null);
//   useEffect(() => {
//     document.title = title || 'MovieCrate | Welcome';
//   }, [title]);
//   const year = useMemo(() => {
//     return date ? dayjs(date).year() : null;
//   }, [
//     date
//   ]);
//   const handleSearchBtnClick = () => {
//     userStore.setKeywords(keywords)
//     if (keywords.length === 0 && !year) {
//       toast.info('Please enter keywords or select a year');
//       return
//     }


//     gridApiRef.current.setDatasource(dataSource)
//     // todo add loading and handle error

//   }
//   const handleKeyPress = (event) => {

//     if (event.key === "Enter") {
//       handleSearchBtnClick();
//     }
//   };
//   // ------------
//   const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
//   const gridStyle = useMemo(() => ({ height: '600px', width: '100%' }), []);
//   const gridApiRef = useRef(null);
//   const titleCellRenderer = (params) => {
//     const imdbID = params.data?.imdbID;
//     return imdbID ? <Link to={`/movies/${imdbID}`}>
//       <p className='text-blue-800'>
//         {params.value}
//       </p>
//     </Link> : params.value;
//   };
//   const [columnDefs, setColumnDefs] = useState([

//     { field: 'title', cellRenderer: titleCellRenderer },
//     { field: 'year' },
//     { field: 'imdbID' },
//     { field: 'imdbRating' },
//     { field: 'rottenTomatoesRating' },
//     { field: 'metacriticRating' },
//     { field: 'classification' },

//   ]);

//   const buildParams = (keywords, year) => {
//     let tKeywords = keywords.trim();
//     let params = null
//     if (tKeywords.length > 0 && year) {
//       params = { title: tKeywords, year }
//     } else if (year) {
//       params = { year }
//     } else if (keywords.length > 0) {
//       params = { title: tKeywords }
//     }
//     return params
//   }

//   const onGridReady = (params) => {
//     gridApiRef.current = params.api;

//     if (userStore.getKeywords().length > 0) {
//       gridApiRef.current.setDatasource(dataSource)
//     }
//   };
//   const dataSource = useMemo(() => {
//     let perPage = 100
//     return {
//       rowCount: undefined,
//       getRows: (params) => {
//         console.log('asking for ' + params.startRow + ' to ' + params.endRow);
//         setLoading(true)
//         const queryParams = buildParams(keywords, year)
//         console.log(queryParams);
//         if (!queryParams) {
//           setLoading(false)
//           params.successCallback([], 0);
//         } else {
//           APIFunction.search({ ...queryParams, page: (params.startRow) / perPage + 1 }).then((resp) => {
//             let data = resp['data']
//             let total = resp['pagination']['total']
//             setLoading(false)
//             const rowsThisPage = data
//             // if on or after the last page, work out the last row.
//             let lastRow = -1;
//             if (data.length <= params.endRow) {
//               lastRow = total;
//             }
//             // call the success callback
//             params.successCallback(rowsThisPage, lastRow);

//           })
//         }
//         // At this point in your code, you would call the server.
//       },
//     };

//   }, [keywords, year])

//   return (
//     <>
//       <Paper className="p-6 rounded-full mb-10" elevation={1}>
//         <Grid container spacing={1} justifyContent="center" alignItems="center"  >
//           <Grid item xs={12} sm={7}>
//             <TextField
//               placeholder="Search films"
//               fullWidth
//               value={keywords}
//               onChange={(event) => setKeywords(event.target.value)}
//               onKeyDown={handleKeyPress}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <IconButton>
//                       <SearchIcon />
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//                 classes: {
//                   root: "rounded-l-lg",
//                 },
//               }}
//               InputLabelProps={{
//                 classes: {
//                   root: "text-gray-600 font-bold",
//                 },
//               }}
//               className=" rounded-lg z-0"
//             />
//           </Grid>
//           <Grid item xs={12} sm={3}  >
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <DatePicker
//                 placeholder="Search films by title"
//                 views={['year']} maxDate={new dayjs()}
//                 slotProps={{
//                   textField: {
//                     placeholder: 'Find movies by year',
//                   }
//                 }
//                 }

//                 value={date}
//                 onChange={(newValue) => { setDate(newValue); }}
//               />
//             </LocalizationProvider>
//           </Grid>
//           <Grid item xs={12} sm={2} alignSelf="center" >
//             <Button loading={loading} className="h-14" color="primary" onClick={() => { handleSearchBtnClick() }}>
//               Search
//             </Button>
//           </Grid>
//         </Grid>
//       </Paper>
//       <div style={containerStyle}>
//         <div style={gridStyle} className="ag-theme-alpine w-full h-full">
//           <AgGridReact
//             columnDefs={columnDefs}
//             suppressRowClickSelection={true}

//             rowModelType={'infinite'}
//             rowSelection={'multiple'}
//             pivotPanelShow={'always'}
//             pagination={true}

//             rowBuffer={0}

//             cacheBlockSize={100}
//             cacheOverflowSize={2}
//             maxConcurrentDatasourceRequests={1}
//             infiniteInitialRowCount={1000}
//             maxBlocksInCache={10}
//             onGridReady={onGridReady}
//           ></AgGridReact>
//         </div>
//         <MyToastContainer />
//       </div>
//     </>
//   )
// }