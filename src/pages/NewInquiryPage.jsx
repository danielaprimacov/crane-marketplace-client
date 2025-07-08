import { useParams } from "react-router-dom";

import AddInquiryForm from "../components/AddInquiryForm";

function NewInquiryPage() {
  const { craneId } = useParams();

  return (
    <div className="mt-20">
      <h1 className="text-2xl uppercase mx-auto mb-5 border-b pb-3 border-b-red-600 max-w-2xl text-center">
        Send Inquiry
      </h1>
      <AddInquiryForm craneId={craneId} />
    </div>
  );
}

export default NewInquiryPage;
