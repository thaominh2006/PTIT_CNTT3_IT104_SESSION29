import React from "react";
import type { StudentType } from "../../api/api";

type Props = {
  open: boolean;
  student: StudentType | null;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteModal({ open, student, onClose, onConfirm }: Props) {
  if (!open || !student) return null;

  return (
    <div className="st-modal-backdrop" role="dialog" aria-modal="true">
      <div className="st-modal">
        <div className="st-modal-head">
          <h4 className="st-modal-title">Xóa nhân viên</h4>
          <button className="st-modal-x" onClick={onClose} aria-label="Đóng">×</button>
        </div>

        <div className="st-modal-body">
          Bạn chắc chắn muốn xóa sinh viên <b>{student.student_name}</b> (ID: {student.id})?
        </div>

        <div className="st-modal-foot">
          <button className="st-btn st-btn-light" onClick={onClose}>Hủy</button>
          <button className="st-btn st-btn-danger" onClick={onConfirm}>Xóa</button>
        </div>
      </div>
    </div>
  );
}
