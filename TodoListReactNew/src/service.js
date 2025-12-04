import axios from "axios";

axios.defaults.baseURL = "http://localhost:5244";

// הוספת ה־JWT לכל בקשה
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // הדפסה ברורה יותר של השגיאה
    if (error.response) {
      // השגיאה נשלחה מהשרת
      console.error("API ERROR response data:", error.response.data);
      console.error("API ERROR status:", error.response.status);
    } else if (error.request) {
      // הבקשה נשלחה אבל לא התקבלה תגובה
      console.error("API ERROR request:", error.request);
    } else {
      // שגיאה אחרת
      console.error("API ERROR message:", error.message);
    }

    // טיפול ב־401
    if (error.response && error.response.status === 401) {
      console.log("401 detected → redirecting to login");
      window.location.href = "/login.html";
    }

    return Promise.reject(error);
  }
);


// טיפול בשגיאות והפניה ללוגין
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API ERROR:", error);

    if (error.response && error.response.status === 401) {
      console.log("401 detected → redirecting to login");
      window.location.href = "/login.html";
    }

    return Promise.reject(error);
  }
);

export default {
  getTasks: async () => {
    const result = await axios.get("/todos");
    return result.data;
  },

  addTask: async (name) => {
    const newItem = { name, isComplete: false };
    const result = await axios.post("/todos", newItem);
    return result.data;
  },

  setCompleted: async (id, isComplete) => {
    const updated = { id, name: "", isComplete };
    const result = await axios.put(`/todos/${id}`, updated);
    return result.data;
  },

  deleteTask: async (id) => {
    await axios.delete(`/todos/${id}`);
  }
};
