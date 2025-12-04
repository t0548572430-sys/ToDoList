import axios from "axios";
import cors from "cors";
app.use(cors()); 
// החליפי כאן בכתובת הציבורית של ה-backend שלך
axios.defaults.baseURL = "https://todoapi-g2lv.onrender.com";

// הוספת ה־JWT לכל בקשה
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
});

// טיפול בשגיאות והפניה ללוגין
axios.interceptors.response.use(
  (response) => response,
  (error) => {
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
  },

  register: async (username, password) => {
    try {
      const response = await axios.post("/register", { username, password });
      return response.data;
    } catch (error) {
      console.error("Register error:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  login: async (username, password) => {
    try {
      const response = await axios.post("/login", { username, password });
      const token = response.data.token;
      localStorage.setItem("token", token);
      return response.data;
    } catch (error) {
      console.error("Login error:", error.response ? error.response.data : error.message);
      throw error;
    }
  }
};
