import type { ICellRendererParams } from "ag-grid-community";

const StatusCell = (params: ICellRendererParams<boolean>) => {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold
        ${
          params.value
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }
      `}
    >
      {params.value ? 'Active' : 'Inactive'}
    </span>
  );
};

export default StatusCell;