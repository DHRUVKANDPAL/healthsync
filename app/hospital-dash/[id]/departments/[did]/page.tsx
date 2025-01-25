import { useParams } from "next/navigation";

export default function DepartmentDetails() {
  const { did } = useParams();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Department Details</h1>
      <p>Showing details for department ID: {did}</p>
      {/* Add doctors list, search feature, etc. */}
    </div>
  );
}
