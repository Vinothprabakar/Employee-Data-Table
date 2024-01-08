import React, { useState, useEffect } from "react";

const EmployeePagination = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );

        if (!response.ok) {
          throw new Error(
            "Failed to retrieve employee data: Server returned an error"
          );
        }

        const data = await response.json();
        setEmployees(data);
        setLoading(false);
        setError(null);
      } catch (error) {
        alert("fetchDataFailed");
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = employees.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < Math.ceil(employees.length / itemsPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <div>Error: {error}</div>}
      {!loading && !error && (
        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={prevPage}>Previous</button>
          <button
            onClick={nextPage}
            disabled={
              currentPage === Math.ceil(employees.length / itemsPerPage)
            }
          >
            Next
          </button>
          <p>Page {currentPage}</p>
        </div>
      )}
    </div>
  );
};

export default EmployeePagination;
