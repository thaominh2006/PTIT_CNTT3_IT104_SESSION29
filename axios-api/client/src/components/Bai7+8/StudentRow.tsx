import React from "react";
import type { StudentType } from "../../api/api";

type Props = {
  student: StudentType;
  onAskDelete: (s: StudentType) => void;
};

export default function StudentRow({ student, onAskDelete }: Props) {
  return (
    <tr className="st-row">
      <td className="st-cell st-checkbox">
        <input type="checkbox" />
      </td>
      <td className="st-cell">{student.student_name}</td>
      <td className="st-cell">{student.email}</td>
      <td className="st-cell">{student.address}</td>
      <td className="st-cell">{student.phone}</td>
      <td className="st-cell st-actions">
        <button className="st-icon st-edit" title="Sửa" aria-label="Sửa">✏️</button>
        <button
          className="st-icon st-delete"
          title="Xóa"
          aria-label="Xóa"
          onClick={() => onAskDelete(student)}
        >
          🗑️
        </button>
      </td>
    </tr>
  );
}
