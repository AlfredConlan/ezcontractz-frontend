import React, { useState, useEffect, useMemo, useRef } from "react";
import { useTable } from "react-table";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { Trash, Pencil } from "react-bootstrap-icons";
import axios from "axios";

const AdminTable = (props) => {
  const [users, setUsers] = useState([]);
  const [searchUsers, setSearchUsers] = useState("");
  const usersRef = useRef();
  // eslint-disable-next-line no-unused-vars
  const [triggerUseEffect, setTriggerUseEffect] = useState(1);

  usersRef.current = users;

  useEffect(() => {
    retrieveUsers();
  }, [triggerUseEffect]);

  const onChangeSearchUsers = (e) => {
    const searchUsers = e.target.value;
    setSearchUsers(searchUsers);
  };

  // Fetching users from database
  const retrieveUsers = () => {
    fetch("https://backend.ezcontractz.com/users")
      .then((resp) => resp.json())
      .then((resp) => {
        setUsers(resp);
      });
  };

  // Search Bar Functionality
  const searchCriteria = users.filter((user) => user.userName.includes(searchUsers));

  const refreshList = () => {
    retrieveUsers();
  };

  const findByTitle = () => {
    users
      .findByTitle(users)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteUsers = (rowIndex) => {
    const userName = usersRef.current[rowIndex].id;
    axios.delete("https://backend.ezcontractz.com/users/delete/" + userName).then((resp) => {
      refreshList();
    });
  };

  const columns = useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },
      {
        Header: "User Name",
        accessor: "userName",
      },
      {
        Header: "email",
        accessor: "email",
      },
      {
        Header: "Location",
        accessor: "location",
      },
      {
        Header: "Role",
        accessor: "role",
      },
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div className="grid">
              <span>
                <Pencil className="far fa-edit action ms-2 xl" />
              </span>
              <span
                onClick={() => {
                  deleteUsers(rowIdx);
                }}
              >
                <Trash className="bi bi-trash ms-2 xxl" fill="red" />
              </span>
            </div>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: searchCriteria ? searchCriteria : users,
  });

  return (
    <div className="container">
      <div className="list row">
        <div className="col-md-8 container">
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Search by title" value={searchUsers} onChange={onChangeSearchUsers} />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary btnOrange" type="button" onClick={findByTitle}>
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-12 list">
          <table className="table table-striped table-bordered" {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminTable;
