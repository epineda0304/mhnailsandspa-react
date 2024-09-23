import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // "/services/Deal": "http://localhost:8000",
      // "/services/Facial": "http://localhost:8000",
      // "/services/Nails": "http://localhost:8000",
      // "/services/Pedicure": "http://localhost:8000",
      // "/services/Wax": "http://localhost:8000",
    },
  },
  plugins: [react()],
});
