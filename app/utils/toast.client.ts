import toast from "react-hot-toast";

const toastBaseOptions = {
  style: {
    background: "#2D2D2D",
    color: "#fff",
    border: "1px solid #30363d",
    maxWidth: "250px",
  },
};

export default {
  show: (message: string, icon: string) =>
    toast(message, { ...toastBaseOptions, icon }),
  error: (message: string) => toast.error(message, toastBaseOptions),
  success: (message: string) => toast.success(message, toastBaseOptions),
};
