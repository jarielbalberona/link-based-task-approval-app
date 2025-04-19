import { useState, useEffect } from "react";
import axios from "@/api/axios-instance";

export default function useCsrf() {
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get("/csrf-token");
        const token = response.data.data;
        setCsrfToken(token);
        localStorage.setItem('_csrfToken', token);
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
      }
    };
    fetchCsrfToken();
  }, []);

  return csrfToken;
}
