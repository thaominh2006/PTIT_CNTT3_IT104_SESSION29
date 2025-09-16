import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Students() {
  type StudentType = {
    id: number;
    student_name: string;
    email: string;
    address: string;
    phone: string;
    status: boolean;
    created_at: string;
  };

  const [students, setStudents] = useState<StudentType[]>([]);
  const [studentDetail, setStudentDetail] = useState<StudentType | null>(null);

  const getAllStudent = async () => {
    try {
      const res = await axios.get<StudentType[]>(
        "http://localhost:8080/student"
      );
      console.log("Student list:", res.data);
      setStudents(res.data);
    } catch (error) {
      console.error("Error getAllStudent:", error);
    }
  };

  const getStudentById = async (id: number) => {
    try {
      const res = await axios.get<StudentType>(
        `http://localhost:8080/student/${id}`
      );
      if (res.data) {
        console.log("Student detail:", res.data);
        setStudentDetail(res.data);
      } else {
        console.log("Không tìm thấy bản ghi");
        setStudentDetail(null);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        console.log("Không tìm thấy bản ghi");
      } else {
        console.error("Error getStudentById:", error);
      }
      setStudentDetail(null);
    }
  };

  const createStudent = async (student: {
    student_name: string;
    email: string;
    address: string;
    phone: string;
    status: boolean;
    created_at: string;
  }) => {
    try {
      const res = await axios.post<StudentType>(
        "http://localhost:8080/student",
        student
      );
      console.log("Created student:", res.data);
      getAllStudent();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getAllStudent();
    const newStudent = {
      student_name: "Do Minh",
      email: "minh@gmail.com",
      address: "Ha Noi",
      phone: "0912345678",
      status: true,
      created_at: new Date().toISOString().slice(0, 10),
    };
    createStudent(newStudent);
    getStudentById(1);
  }, []);

  return (
    <div>
      <h2>GetAllStudent</h2>
      <h2>GetStudentById</h2>
    </div>
  );
}
