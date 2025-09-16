import React from "react";
import StudentRow from "./StudentRow";
import type { StudentType } from "../../api/api";

type Props = {
  students: StudentType[];
  onAskDelete: (s: StudentType) => void;
};

export default function StudentTable({ students, onAskDelete }: Props) {
  return (
    <div className="st-table-wrap">
      <table className="st-table">
        <thead>
          <tr>
            <th className="st-th st-checkbox"><input type="checkbox" /></th>
            <th className="st-th">Tên sinh viên</th>
            <th className="st-th">Email</th>
            <th className="st-th">Địa chỉ</th>
            <th className="st-th">Số điện thoại</th>
            <th className="st-th">Lựa chọn</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <StudentRow key={s.id} student={s} onAskDelete={onAskDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
