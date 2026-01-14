import { AgGridReact } from 'ag-grid-react';
import { useEffect, useMemo, useState } from 'react';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { EMPLOYEE_DATA } from '../data/employee';
import type { EmployeeType } from '../types/Employee';
import type { ColDef, ValueFormatterParams } from 'ag-grid-community';
import SkillsCell from './SkillsCell';
import StatusCell from './StatusCell';

export default function EmployeeDashboard() {
  const [searchText, setSearchText] = useState('');
  const [rowData, setRowData] = useState<EmployeeType[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setRowData(EMPLOYEE_DATA);
      setLoading(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  const [showExtra, setShowExtra] = useState(false);
  const columnDefs: ColDef<EmployeeType>[] = useMemo(
    () => [
      {
        headerName: 'Employee Info',
        children: [
          { field: 'firstName', filter: true, width: 100 },
          { field: 'lastName', filter: true, width: 100 },
          { field: 'email', filter: true },
        ],
      },
      {
        headerName: 'Work Details',
        children: [
          { field: 'department', filter: true, width: 150 },
          { field: 'position' },
          {
            field: 'manager',
            width: 130,
            cellRenderer: (params: ValueFormatterParams<string | null>) =>
              params.value || (
                <span className="text-xs text-white bg-rose-500 rounded-lg px-4 py-0.5">
                  N/A
                </span>
              ),
          },
        ],
      },
      {
        headerName: 'Performance',
        children: [
          { field: 'performanceRating', sortable: true, width: 150 },
          { field: 'projectsCompleted', sortable: true, width: 100 },
          {
            field: 'isActive',
            headerName: 'Status',
            cellRenderer: StatusCell,
            width: 100,
          },
        ],
      },
      {
        headerName: 'Compensation',
        children: [
          {
            field: 'salary',
            width: 100,
            valueFormatter: (p: ValueFormatterParams<number>) =>
              p.value ? `$${p.value}` : '',
          },
          { field: 'location', width: 130 },
        ],
      },
      {
        headerName: 'Additional Info',
        children: [
          {
            field: 'hireDate',
            headerName: 'Hire Date',
            hide: !showExtra,
            valueFormatter: (p: ValueFormatterParams<string>) =>
              p.value ? formatDate(p.value) : '',
            width: 130,
          },
          {
            field: 'age',
            hide: !showExtra,
            width: 90,
          },
          {
            field: 'skills',
            hide: !showExtra,
            width: 400,
            cellRenderer: SkillsCell,
          },
        ],
      },
    ],
    [showExtra]
  );

  // ----------------------- handling pagination mobile UI ------------------
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 p-2 md:p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm p-6">
        {/* Header */}
        <div className="md:flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Employee Management Dashboard
            </h2>
            <p className="text-sm text-gray-500 pb-4">
              Manage employees, performance & compensation
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <input
              type="text"
              placeholder="Search employees..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="border rounded-lg px-4 py-2 text-sm md:w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={() => setShowExtra((prev) => !prev)}
              className="border px-4 py-2 rounded-lg text-sm bg-gray-100 hover:bg-gray-200"
            >
              {showExtra ? 'Hide Extra Columns' : 'Show Extra Columns'}
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="ag-theme-quartz h-105 w-full rounded-lg overflow-hidden">
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            pagination
            paginationPageSize={5}
            // paginationPageSizeSelector={[5, 10, 20, 50, 100]}
            paginationPageSizeSelector={isMobile ? false : [5, 10, 20, 50, 100]}
            quickFilterText={searchText}
            loadingOverlayComponentParams={{ loadingMessage: 'Loading...' }}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
};
