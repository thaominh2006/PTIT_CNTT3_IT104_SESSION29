import React, { useEffect, useMemo, useState } from "react";
import { getAllStudents, deleteStudent, type StudentType } from "../../api/api";
import StudentTable from "../../components/Bai7+8/StudentTable";
import Pagination from "../../components/Bai7+8/Pagination";
import DeleteModal from "../../components/Bai7+8/DeleteModal";
import "./style.css";

export default function Student() {
  const [students, setStudents] = useState<StudentType[]>([]);
  const [page, setPage] = useState<number>(3);
  const pageSize = 10;

  // modal state
  const [openDel, setOpenDel] = useState(false);
  const [target, setTarget] = useState<StudentType | null>(null);

  const load = async () => {
    const data = await getAllStudents();
    setStudents(data);
    if (data.length <= pageSize * 2) setPage(1);
  };

  useEffect(() => { load(); }, []);

  const slice = useMemo(() => {
    const start = (page - 1) * pageSize;
    return students.slice(start, start + pageSize);
  }, [students, page]);

  const startDisplay = Math.min((page - 1) * pageSize + 1, students.length || 0);
  const endDisplay = Math.min(page * pageSize, students.length);

  const onAskDelete = (s: StudentType) => {
    setTarget(s);
    setOpenDel(true);
  };

  const onConfirmDelete = async () => {
    if (!target) return;
    const ok = await deleteStudent(target.id);
    setOpenDel(false);
    setTarget(null);
    if (ok) await load();         // render lại dữ liệu mới nhất
  };

  return (
    <div className="st-card">
      <div className="st-card-head">
        <h3 className="st-title">Quản lý <span className="st-bold">sinh viên</span></h3>
        <button className="st-add-btn">＋ Thêm mới sinh viên</button>
      </div>

      <StudentTable students={slice} onAskDelete={onAskDelete} />

      <div className="st-card-foot">
        <span className="st-count">
          Hiển thị {students.length ? `${startDisplay}-${endDisplay}` : 0}/{students.length} bản ghi
        </span>
        <Pagination current={page} total={students.length} pageSize={pageSize} onChange={setPage} />
      </div>

      <DeleteModal
        open={openDel}
        student={target}
        onClose={() => { setOpenDel(false); setTarget(null); }}
        onConfirm={onConfirmDelete}
      />
    </div>
  );
}
