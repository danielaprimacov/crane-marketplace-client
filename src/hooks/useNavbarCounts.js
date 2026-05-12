import { useEffect, useState } from "react";

import { ROLES } from "../constants/roles";
import { craneApi } from "../services/craneApi";
import { inquiryApi } from "../services/inquiriApi";
import { messageApi } from "../services/messageApi";

function getArrayCount(value) {
  return Array.isArray(value) ? value.length : 0;
}

export default function useNavbarCounts({ isLoggedIn, user, pathname }) {
  const [myCranesCount, setMyCranesCount] = useState(0);
  const [inquiriesCount, setInquiriesCount] = useState(0);
  const [messagesCount, setMessagesCount] = useState(0);

  useEffect(() => {
    if (!isLoggedIn || !user || user.role === ROLES.ADMIN) {
      setMyCranesCount(0);
      return;
    }

    let ignore = false;

    const fetchMyCranesCount = async () => {
      try {
        const myCranes = await craneApi.getMine();

        if (!ignore) {
          setMyCranesCount(getArrayCount(myCranes));
        }
      } catch (err) {
        console.log("Could not fetch cranes:", err);

        if (!ignore) {
          setMyCranesCount(0);
        }
      }
    };
    fetchMyCranesCount();

    return () => {
      ignore = true;
    };
  }, [isLoggedIn, user?.id, user?._id, user?.role, pathname]);

  useEffect(() => {
    if (!isLoggedIn || !user || user.role !== ROLES.ADMIN) {
      setInquiriesCount(0);
      setMessagesCount(0);
      return;
    }

    let ignore = false;

    const fetchAdminCounts = async () => {
      try {
        const [inquiries, messages] = await Promise.all([
          inquiryApi.getAllAdmin(),
          messageApi.getAllAdmin(),
        ]);

        if (!ignore) {
          setInquiriesCount(getArrayCount(inquiries));
          setMessagesCount(getArrayCount(messages));
        }
      } catch (err) {
        console.log("Could not fetch admin counts:", err);

        if (!ignore) {
          setInquiriesCount(0);
          setMessagesCount(0);
        }
      }
    };
    fetchAdminCounts();

    return () => {
      ignore = true;
    };
  }, [isLoggedIn, user?.id, user?._id, user?.role, pathname]);

  return { myCranesCount, inquiriesCount, messagesCount };
}
