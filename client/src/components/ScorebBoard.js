import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
//import members from "../data/MOCK_DATA.json";
//import {orderBy} from "lodash/orderBy";
//import TableSortLabel from '@material-ui/core/TableSortLabel';


function ScoreBoard({users}){
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  //const [columnToSort, setColumnToSort]= React.useState("")
  //const [sortDirection, setSortDirection]= React.useState("desc");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const rows = createData(users);
  console.log(rows)
  return (
      <div className="scoreBoardWrapper"> 
        
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table" >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                > <div onClick={()=>console.log("haha")}>
                  {column.label}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {((column.id === 'picture') ? true : false) && (
                          <img className="tablePicture" src={row.img} alt='Karakter.png' onClick={()=> console.log(JSON.stringify(row))}/>
                        )}
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 60]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
    </div>
  );
}


const columns = [
    { id:'picture', label:'Picture' , minWidth: 50},
  { id: 'name', label: 'Name', minWidth: 100 },
  {id: 'races', label: 'Races', minWidth: 100},
  
  {
    id: 'rating',
    label: 'Rating',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
];

function createData(users){
    const rows=[];
    users.map((val, key) => {
        rows.push(val)

    })
    return ( 
        rows
    );
}


const useStyles = makeStyles({

  root: {
    width: '90%',
  },
  container: {
    maxHeight: 440,
  },
});



// Function for sorting feature
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
// function getComparator(order, orderBy) {
//   return order === "desc"
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }
// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map(el => el[0]);
// }
// const headCells = [
//   {
//     id: "name",
//     label: "name"
//   },
//   { id: "age", numeric: true, label: "age" }
// ];
// function EnhancedTableHead(props) {
//   const {
//     classes,
//     onSelectAllClick,
//     order,
//     orderBy,
//     numSelected,
//     rowCount,
//     onRequestSort
//   } = props;
//   const createSortHandler = property => event => {
//     onRequestSort(event, property);
//   };
// }


export default ScoreBoard;

