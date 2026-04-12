import { useEffect, useState } from "react";
import axios from "axios";

export default function useNavbarCounts({
  apiUrl,
  isLoggedIn,
  user,
  pathname,
}) {
  const [myCranesCount, setMyCranesCount] = useState(0);
  const [inquiriesCount, setInquiriesCount] = useState(0);
  const [messagesCount, setMessagesCount] = useState(0);

  useEffect(() => {
    if (!isLoggedIn || !user?._id) {
      setMyCranesCount(0);
      return;
    }

    if (user.role === "admin") return;

    const fetchMyCranesCount = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const { data: allCranes } = await axios.get(`${apiUrl}/cranes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const mine = allCranes.filter((c) => c.owner === user._id);
        setMyCranesCount(mine.length);
      } catch (err) {
        console.log("Could not fetch cranes:", err);
      }
    };
    fetchMyCranesCount();
  }, [apiUrl, isLoggedIn, user?._id, user?.role, pathname]);

  useEffect(() => {
    if (!isLoggedIn || user?.role !== "admin") {
      setInquiriesCount(0);
      setMessagesCount(0);
      return;
    }

    const fetchAdminCounts = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const [inquiriesRes, messagesRes] = await Promise.all([
          axios.get(`${apiUrl}/inquiries`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${apiUrl}/messages`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setInquiriesCount(inquiriesRes.data.length);
        setMessagesCount(messagesRes.data.length);
      } catch (err) {
        console.log("Could not fetch admin counts:", err);
      }
    };
    fetchAdminCounts();
  }, [apiUrl, isLoggedIn, user?.role, pathname]);

  return { myCranesCount, inquiriesCount, messagesCount };
}
