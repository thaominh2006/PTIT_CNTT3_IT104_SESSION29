import axios from "axios";

export type StudentType = {
  id: number;
  student_name: string;
  email: string;
  address: string;
  phone: string;
  status?: boolean;
  created_at?: string;
};

export const getAllStudents = async (): Promise<StudentType[]> => {
  try {
    const res = await axios.get<StudentType[]>("http://localhost:8080/student");
    return res.data ?? [];
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export const deleteStudent = async (id: number): Promise<boolean> => {
  try {
    await axios.delete(`${"http://localhost:8080/student"}/${id}`);
    return true;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};
