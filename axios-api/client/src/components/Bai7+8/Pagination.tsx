import React from "react";

type Props = {
  current: number;
  total: number;
  pageSize: number;
  onChange: (page: number) => void;
};

export default function Pagination({ current, total, pageSize, onChange }: Props) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const nums = Array.from({ length: pages }, (_, i) => i + 1);

  return (
    <div className="st-pagination">
      <button
        className="st-page-btn"
        onClick={() => onChange(Math.max(1, current - 1))}
        disabled={current === 1}
      >
        Trước
      </button>

      {nums.map((n) => (
        <button
          key={n}
          className={`st-page-num ${n === current ? "active" : ""}`}
          onClick={() => onChange(n)}
        >
          {n}
        </button>
      ))}

      <button
        className="st-page-btn"
        onClick={() => onChange(Math.min(pages, current + 1))}
        disabled={current === pages}
      >
        Sau
      </button>
    </div>
  );
}
